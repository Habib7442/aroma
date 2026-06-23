# Architecture Context

## Stack

| Layer | Technology | Role |
| --- | --- | --- |
| Framework | Expo (React Native) + TypeScript | Cross-platform client runner (SDK 56) |
| Routing | Expo Router | File-based navigation and deep linking |
| Styling | Tailwind CSS v4 + NativeWind v5 | CSS-first styling framework |
| State | Zustand | UI & Client state (cart, current outlet) |
| Caching | TanStack React Query v5 | Server state caching (menu, orders, profile) |
| Backend | Supabase (PostgreSQL + Auth + Storage) | Authentication, file storage, database, Realtime |
| Payments | Razorpay SDK | Payment gateway integrations |
| Monitoring | Sentry | Error reporting and tracing |

## System Boundaries

- `src/app/` — Expo router screens and layouts.
- `src/components/` — Shared reusable UI components.
- `src/constants/` — Styling theme tokens, images, and config.
- `src/store/` — Zustand stores (cart, session, selected outlet).
- `src/hooks/` — React Query hooks (useMenu, useOrders, useWallet).
- `src/lib/` — API wrappers, Supabase client initialization, notification setup.

## Storage Model

- **Supabase Database (PostgreSQL)**: Source of truth for menu, orders, transactions ledger, profile info, and bookings.
- **AsyncStorage**: Local client persistence for selected outlet, cart items, and local auth sessions.
- **Supabase Storage**: CDN and storage bucket for dish food images and promo banners.

## Auth and Access Model

- **Phone OTP**: Handled via Supabase Auth with custom SMS hook configured on the server.
- **Ledger Invariance**: Client cannot directly mutate wallet or point balances. Mutations are done via server-side Postgres ledger logic and RLS rules.
- **RLS (Row Level Security)**: Protects user profiles, orders, and wallet transaction tables so users can only access their own data.

## Invariants

1. **No direct balance writes**: The app never writes a wallet balance or points total directly. All modifications are request operations verified by Postgres ledger/Edge Functions.
2. **React Query for server state**: Do not duplicate server data (menu, order status, points) into Zustand. React Query remains the single source of truth for remote data.
3. **No manual Metro monorepo configs**: Expo SDK 52+ handles monorepo path resolution automatically. `metro.config.js` must only wrap NativeWind.
4. **No secret keys in client**: Only public keys (`EXPO_PUBLIC_*`) live client-side. Secret keys must reside strictly in Supabase Edge Functions.
