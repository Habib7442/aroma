# AROMA — Monorepo Setup Spec

> Canonical setup/scaffolding guide for the AROMA Cafe & Restaurant project.
> **Audience:** an AI coding agent. Execute steps **in order**. Commands are exact.
> **Scope:** repo structure, tooling, configs, dependency installation, run/build.
> **Out of scope (separate doc):** Supabase tables, RLS, Edge Functions, business logic.

---

## 0. Critical rules (read before doing anything)

1. **Do NOT add manual Metro monorepo config.** Expo SDK 52+ auto-detects monorepos and configures Metro (`watchFolders`, `resolver.nodeModulesPaths`, etc.) automatically. Per official Expo docs, these must be **omitted**. `metro.config.js` exists **only** to wrap NativeWind.
   Ref: https://docs.expo.dev/guides/monorepos/
2. **Package manager = npm.** Use npm workspaces. Node's default hoisting works for native-module autolinking (Razorpay, Reanimated, Sentry) to resolve reliably.
3. **This app uses native modules (Razorpay)** → it runs in a **Dev Client / custom dev build**, **NOT Expo Go**.
4. **Keep both apps on the same React major.** Modern Expo SDK and Next.js both target React 19 — let the generators pick versions, then verify with `npm ls react`. Do **not** hand-pin React.
5. After any change to `metro.config.js` / `babel.config.js` / `tailwind.config.js`, run `npx expo start --clear` once.

---

## 1. Final folder structure

```
aroma/
├── apps/
│   ├── mobile/                  # Expo (React Native) — customer app
│   │   ├── app/                 # Expo Router (file-based routes)
│   │   │   ├── (auth)/          # onboarding, phone-OTP
│   │   │   ├── (tabs)/          # home, menu, orders, wallet, profile
│   │   │   ├── _layout.tsx      # root layout (imports global.css)
│   │   │   └── +not-found.tsx
│   │   ├── components/          # reusable UI
│   │   ├── lib/                 # supabase client, query client, utils
│   │   ├── store/               # zustand stores (cart, ui, session)
│   │   ├── hooks/               # react-query hooks, custom hooks
│   │   ├── assets/
│   │   ├── global.css           # tailwind directives (NativeWind)
│   │   ├── nativewind-env.d.ts
│   │   ├── tailwind.config.js
│   │   ├── babel.config.js
│   │   ├── metro.config.js      # NativeWind wrapper ONLY
│   │   ├── app.config.ts        # Expo config (scheme, plugins)
│   │   ├── eas.json
│   │   ├── .env                 # EXPO_PUBLIC_* vars
│   │   ├── tsconfig.json
│   │   └── package.json
│   └── admin/                   # Next.js — restaurant dashboard
│       ├── app/                 # Next.js App Router
│       ├── components/
│       ├── lib/                 # supabase server/client helpers
│       ├── tailwind.config.ts
│       ├── .env.local
│       ├── tsconfig.json
│       └── package.json
├── packages/
│   ├── shared/                  # Zod schemas, constants, shared TS (source of truth)
│   │   ├── src/
│   │   │   ├── schemas/         # zod schemas (orders, booking, wallet, etc.)
│   │   │   ├── constants/       # enums, points rules, order statuses
│   │   │   └── index.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   ├── types/                   # Supabase-generated DB types
│   │   ├── src/database.types.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   └── config/                  # shared tsconfig / theme tokens / eslint
│       ├── tsconfig.base.json
│       ├── tailwind-theme.js     # Hunter Green palette (shared)
│       └── package.json
├── supabase/                    # backend (initialized here; schema = separate doc)
│   ├── migrations/
│   └── functions/
├── .npmrc
├── .gitignore
├── package.json                 # root (private, devtools, workspaces, turbo scripts)
├── turbo.json
└── tsconfig.json                # root references base
```

**Workspace package names (scoped):** `@aroma/shared`, `@aroma/types`, `@aroma/config`. Reference them in app `package.json` as `"@aroma/shared": "*"`.

---

## 2. Prerequisites

| Tool | Version | Notes |
|------|---------|-------|
| Node.js | >= 20 LTS | |
| npm | >= 10 | shipped with Node |
| Git | any | |
| Expo account | — | for EAS builds (`npx expo login`) |
| EAS CLI | latest | `npm i -g eas-cli` |
| Supabase CLI | latest | installed as root devDep below |
| Android Studio + JDK 17 | — | for Android dev builds |
| Xcode (macOS) | — | for iOS dev builds |
| Watchman (macOS) | — | recommended |

---

## 3. Step-by-step setup

### Step 1 — Root workspace

```bash
mkdir aroma && cd aroma
git init
npm init -y          # creates root package.json
```

Create the root config files (contents in §4): `turbo.json`, `tsconfig.json`, `.gitignore`. Set root `package.json` `"private": true` and configure workspaces.

Install root dev tooling:

```bash
npm install -D turbo typescript prettier @types/node supabase
```

### Step 2 — Mobile app (Expo + Expo Router + TS)

The default `create-expo-app` template ships with Expo Router, TypeScript, and a tabs layout.

```bash
mkdir apps
cd apps
npx create-expo-app@latest mobile     # choose the default template
cd ..
```

### Step 3 — Admin app (Next.js)

```bash
cd apps
npx create-next-app@latest admin --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
cd ..
```

### Step 4 — Shared packages

Create `packages/shared`, `packages/types`, `packages/config` with the `package.json` + `tsconfig.json` files from §4. Each is a minimal TS package exporting from `src/index.ts`.

### Step 5 — Link the workspace

```bash
npm install
```

Verify a single React major across the repo:

```bash
npm ls react
```

### Step 6 — Configure the mobile app

Install runtime dependencies (use `expo install` so native versions match the SDK):

```bash
cd apps/mobile

# Supabase + RN auth persistence
npx expo install @supabase/supabase-js @react-native-async-storage/async-storage react-native-url-polyfill expo-secure-store

# State + server cache
npm install zustand @tanstack/react-query

# Forms + validation (zod comes from @aroma/shared)
npm install react-hook-form @hookform/resolvers
npm install @aroma/shared@* @aroma/types@*

# Styling (NativeWind v4)
npm install nativewind tailwindcss
npx expo install react-native-reanimated react-native-gesture-handler

# Native UX
npx expo install expo-notifications expo-device expo-image expo-dev-client

# Payments (native module → dev build required)
npm install react-native-razorpay

# Monitoring
npm install @sentry/react-native

# Localization (optional)
npx expo install expo-localization
npm install i18next react-i18next

cd ../..
```

Then add these files (contents in §4): `metro.config.js`, `babel.config.js`, `tailwind.config.js`, `global.css`, `nativewind-env.d.ts`, `app.config.ts`, `eas.json`, `lib/supabase.ts`, `.env`. Import `global.css` at the **top of `app/_layout.tsx`**.

### Step 7 — Configure the admin app

```bash
cd apps/admin
npm install @supabase/supabase-js @supabase/ssr @tanstack/react-query @tanstack/react-table react-hook-form @hookform/resolvers
npm install @aroma/shared@* @aroma/types@*
npx shadcn@latest init        # set base color to a neutral; brand color added via theme
cd ../..
```

### Step 8 — Initialize Supabase (folder only)

```bash
npx supabase init        # creates supabase/ with config.toml
```

> Tables, RLS, and Edge Functions are defined in the **separate backend doc**. This step only scaffolds the folder.

### Step 9 — EAS / dev client

```bash
cd apps/mobile
npx expo login
eas build:configure          # generates/links eas.json (then replace with §4 version)
# Build a dev client (cloud):
eas build --profile development --platform android
# OR run a local dev build:
npx expo run:android          # requires Android Studio
cd ../..
```

Install the resulting **dev build** on device/emulator. Use it instead of Expo Go for all development (native modules require it).

---

## 4. Config file contents

### root `package.json`
```json
{
  "name": "aroma",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "type-check": "turbo run type-check",
    "mobile": "npm run start --workspace=mobile",
    "admin": "npm run dev --workspace=admin"
  },
  "devDependencies": {
    "turbo": "latest",
    "typescript": "latest",
    "prettier": "latest",
    "@types/node": "latest",
    "supabase": "latest"
  }
}
```

### `turbo.json` (Turbo 2.x — uses `tasks`)
```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "dev": { "cache": false, "persistent": true },
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "lint": {},
    "type-check": { "dependsOn": ["^build"] }
  }
}
```

### `apps/mobile/metro.config.js`  (NativeWind wrapper ONLY — no monorepo config)
```js
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

// Expo SDK 52+ auto-configures monorepo resolution. Do not add watchFolders.
const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });
```

### `apps/mobile/babel.config.js`
```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
  };
};
```

### `apps/mobile/global.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### `apps/mobile/nativewind-env.d.ts`
```ts
/// <reference types="nativewind/types" />
```

### `apps/mobile/tailwind.config.js`
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    '../../packages/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        hunter: {
          DEFAULT: '#355E3B',
          50:  '#f0f5f1',
          100: '#dbe7dd',
          200: '#b8cfbd',
          300: '#8cb095',
          400: '#5e8a69',
          500: '#3f6a4a',
          600: '#355E3B',
          700: '#2a4a30',
          800: '#233c28',
          900: '#1d3122',
        },
      },
    },
  },
  plugins: [],
};
```

### `apps/mobile/app.config.ts`
```ts
import { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'AROMA',
  slug: 'aroma',
  scheme: 'aroma',                 // deep links (referrals): aroma://
  version: '1.0.0',
  orientation: 'portrait',
  userInterfaceStyle: 'automatic',
  ios: { supportsTablet: false, bundleIdentifier: 'com.aroma.app' },
  android: { package: 'com.aroma.app' },
  experiments: { typedRoutes: true },
  plugins: [
    'expo-router',
    'expo-secure-store',
    'expo-notifications',
    '@sentry/react-native/expo',
  ],
  extra: { eas: { projectId: '<set-after-eas-configure>' } },
};

export default config;
```

### `apps/mobile/eas.json`
```json
{
  "cli": { "version": ">= 5.0.0", "appVersionSource": "remote" },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": { "buildType": "apk" }
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": { "production": {} }
}
```

### `apps/mobile/lib/supabase.ts`  (client only — no schema)
```ts
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const url = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, anonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
```

### `apps/mobile/.env`  (names only — fill values)
```ini
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
EXPO_PUBLIC_RAZORPAY_KEY_ID=
```

### `apps/admin/.env.local`  (names only — fill values)
```ini
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

### `packages/shared/package.json`
```json
{
  "name": "@aroma/shared",
  "version": "0.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "dependencies": { "zod": "latest" }
}
```

### `packages/types/package.json`
```json
{
  "name": "@aroma/types",
  "version": "0.0.0",
  "private": true,
  "main": "./src/database.types.ts",
  "types": "./src/database.types.ts"
}
```

### `packages/config/package.json`
```json
{
  "name": "@aroma/config",
  "version": "0.0.0",
  "private": true,
  "main": "./tailwind-theme.js"
}
```

### root `tsconfig.json`
```json
{
  "compilerOptions": {
    "strict": true,
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "@aroma/shared": ["packages/shared/src"],
      "@aroma/types": ["packages/types/src/database.types.ts"]
    }
  }
}
```

---

## 5. Tech stack reference

| Layer | Package(s) | App |
|------|------------|-----|
| Framework | `expo`, `expo-router`, `react-native` | mobile |
| Framework | `next`, `react`, `react-dom` | admin |
| Navigation | `expo-router` (file-based) | mobile |
| Client state | `zustand` | both |
| Server cache | `@tanstack/react-query` | both |
| Data tables | `@tanstack/react-table` | admin |
| Backend client | `@supabase/supabase-js`, `@supabase/ssr` (admin) | both |
| Auth persistence | `@react-native-async-storage/async-storage`, `expo-secure-store`, `react-native-url-polyfill` | mobile |
| Forms | `react-hook-form`, `@hookform/resolvers` | both |
| Validation | `zod` (via `@aroma/shared`) | both + Edge Fns |
| Styling | `nativewind` + `tailwindcss` | mobile |
| Styling | `tailwindcss` + `shadcn/ui` | admin |
| Animation | `react-native-reanimated`, `react-native-gesture-handler` | mobile |
| Payments | `react-native-razorpay` (native) | mobile |
| Notifications | `expo-notifications`, `expo-device` | mobile |
| Images | `expo-image` | mobile |
| Deep links | `expo-linking` (built-in) | mobile |
| Monitoring | `@sentry/react-native` | mobile |
| i18n (optional) | `expo-localization`, `i18next`, `react-i18next` | mobile |
| Monorepo | `npm` workspaces + `turbo` | repo |
| Dev build | `expo-dev-client` + `eas-cli` | mobile |
| Backend CLI | `supabase` | repo |

---

## 6. Run commands

```bash
# Mobile (Metro dev server → open in the Dev Client build, NOT Expo Go)
npm run start --workspace=mobile
# or with cache clear after config changes:
cd apps/mobile && npx expo start --clear

# Admin (Next.js)
npm run dev --workspace=admin

# Everything via turbo
npm run dev
```

---

## 7. Verification checklist

- [ ] `npm install` completes with no peer/resolution errors.
- [ ] `npm ls react` shows a **single** React major across mobile + admin.
- [ ] `apps/mobile/metro.config.js` contains **no** `watchFolders` / `nodeModulesPaths`.
- [ ] Importing `@aroma/shared` inside `apps/mobile` and `apps/admin` resolves.
- [ ] `global.css` is imported at the top of `app/_layout.tsx`; a `className="text-hunter"` test renders.
- [ ] `npx expo-doctor` passes.
- [ ] Dev client build installs and boots (not Expo Go).
- [ ] `npm run dev --workspace=admin` serves the Next.js admin.

---

## 8. Reference links (official)

- Expo monorepos: https://docs.expo.dev/guides/monorepos/
- Expo Router install: https://docs.expo.dev/router/installation/
- Expo Dev Client: https://docs.expo.dev/develop/development-builds/introduction/
- EAS Build: https://docs.expo.dev/build/setup/
- NativeWind: https://www.nativewind.dev/getting-started/installation
- Turborepo: https://turbo.build/repo/docs
- Supabase + Expo: https://supabase.com/docs/guides/auth/quickstarts/react-native
```
