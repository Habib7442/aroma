# UI Context

## Theme

The visual system follows a Modern / Material 3 hybrid design model. It uses an appetizing nature-rooted green palette balanced by saffron accent markers, rounded elements, and touch-first layout targets.

## Colors

All UI elements must utilize these Tailwind CSS v4 custom color classes defined in `src/global.css`:

| Role | Tailwind Class | Color Hex | Description |
| --- | --- | --- | --- |
| Primary (Hunter Green) | `bg-primary` / `text-primary` | `#1d4626` | Main branding, primary buttons |
| Primary Container | `bg-primary-container` | `#355e3b` | Scoped brand header sheets |
| On Primary Container | `text-on-primary-container` | `#a8d6a9` | Mint text on green sheets |
| Accent (Saffron/Amber) | `bg-secondary` / `text-secondary` | `#835400` | Star ratings, points, rewards |
| Accent Container | `bg-secondary-container` | `#feae32` | Highlights, warnings, offers |
| Background | `bg-background` | `#f1fcf5` | Page canvas background |
| Surface (Cards) | `bg-surface-container-lowest` | `#ffffff` | Pure white containers/elevated cards |
| Surface container | `bg-surface-container` | `#e5f1ea` | Muted background sheets |
| On Surface | `text-on-surface` | `#141e1a` | Dark text for readability |
| Outline | `border-outline` | `#727970` | Subtle lines/dividers |

## Typography

- **Plus Jakarta Sans** (`font-display`): Used for headings, titles, prices, and star numbers.
- **Inter** (`font-body`): Used for descriptions, inputs, lists, and body copy.

## Border Radius

- **Small elements (chips, tags)**: `rounded-sm` (4px)
- **Cards, panels, dish cards**: `rounded-lg` (16px)
- **Buttons / Steppers**: `rounded-full` (pill shape)
- **Bottom Sheets**: `rounded-2xl` (28px top radius)

## Component Library

- Tailwind styling using NativeWind v5.
- Component structure uses standard React Native core components (`View`, `Text`, `Image`) styled using Tailwind utility classes.

## Layout Patterns

- **Side Margin**: Standard 20px padding on the sides for page views.
- **Safe Area Insets**: Respect device notches and top app bars (56px) and bottom bars (56px-80px).
- **Tonal Layering**: Elevate cards using pure white (`#ffffff`) surfaces on top of the warm off-white (`#f1fcf5`) background.
