# Code Standards

## General

- Keep files small, focused, and single-purpose.
- Prefer simple, declarative code over complex or nested logic.
- Avoid inline styles where possible; use Tailwind CSS utility classes.
- Ensure proper loading, error, and empty states are built into every screen.

## TypeScript

- Strict mode is enabled and must be followed. Avoid using `any`.
- Use generated Supabase types from `@aroma/types` (`database.types.ts`) for all data coming from the database.
- Use Zod schemas and models shared from `@aroma/shared` for validation.
- Annotate function parameters and return types explicitly where inference is unclear.

## React Native & Expo

- Use `TouchableOpacity` or `Pressable` for buttons rather than standard `Button`.
- Gate routes using session states provided by the Supabase Auth listener.
- Clean up all event listeners and Realtime subscriptions on component unmount.
- Follow the **Style Exception Rules** for components that do not support NativeWind classes (e.g. `SafeAreaView`, `ScrollView`, `KeyboardAvoidingView`).

## Styling (Tailwind / NativeWind)

- Use Tailwind colors and variables defined under `@theme` in `src/global.css` (e.g. `bg-primary`, `text-secondary`, `rounded-lg`).
- Never hardcode color hex values in code files.
- Ensure layouts are responsive across standard mobile screen dimensions (e.g., standard phone sizes).

## File Organization

- `src/app/` — Navigation routes.
- `src/components/` — General UI components.
- `src/constants/` — Static assets reference, theme maps, base config.
- `src/store/` — Client state stores (Zustand).
- `src/hooks/` — Server data hooks (React Query).
- `src/lib/` — API wrappers, SDK configuration helpers.
