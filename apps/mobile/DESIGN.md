---
name: Aroma Culinary System
colors:
  surface: '#f1fcf5'
  surface-dim: '#d1ddd6'
  surface-bright: '#f1fcf5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#ebf6f0'
  surface-container: '#e5f1ea'
  surface-container-high: '#dfebe4'
  surface-container-highest: '#dae5df'
  on-surface: '#141e1a'
  on-surface-variant: '#424941'
  inverse-surface: '#28332e'
  inverse-on-surface: '#e8f3ed'
  outline: '#727970'
  outline-variant: '#c1c9be'
  surface-tint: '#3e6844'
  primary: '#1d4626'
  on-primary: '#ffffff'
  primary-container: '#355e3b'
  on-primary-container: '#a8d6a9'
  inverse-primary: '#a4d2a6'
  secondary: '#835400'
  on-secondary: '#ffffff'
  secondary-container: '#feae32'
  on-secondary-container: '#6c4500'
  tertiary: '#26442c'
  on-tertiary: '#ffffff'
  tertiary-container: '#3d5c42'
  on-tertiary-container: '#b0d3b2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#bfeec1'
  primary-fixed-dim: '#a4d2a6'
  on-primary-fixed: '#002109'
  on-primary-fixed-variant: '#274f2e'
  secondary-fixed: '#ffddb5'
  secondary-fixed-dim: '#ffb956'
  on-secondary-fixed: '#2a1800'
  on-secondary-fixed-variant: '#643f00'
  tertiary-fixed: '#c8ecca'
  tertiary-fixed-dim: '#adcfaf'
  on-tertiary-fixed: '#03210c'
  on-tertiary-fixed-variant: '#2f4d35'
  background: '#f1fcf5'
  on-background: '#141e1a'
  surface-variant: '#dae5df'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.1px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  numeric-display:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 24px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  margin-mobile: 20px
  gutter-mobile: 16px
---

## Brand & Style

The design system is crafted for a premium mobile dining experience that balances warmth with modern efficiency. It targets a sophisticated audience that values both the artisanal quality of a local cafe and the streamlined convenience of high-end digital ordering.

The aesthetic follows a **Modern / Material 3** hybrid approach. It utilizes a rich, organic color palette to evoke an "appetizing" emotional response while maintaining a "trustworthy" and "premium" feel through generous whitespace and clean, functional layouts. The interface should feel "breathable," avoiding clutter to let food photography take center stage. High-quality imagery should be paired with soft shadows and refined transitions to create a tactile, high-end hospitality atmosphere.

## Colors

The palette is rooted in nature and culinary tradition.
- **Primary (Hunter Green):** Used for key actions, brand signals, and active navigation states. It represents freshness and stability.
- **Secondary (Saffron/Amber):** A high-visibility accent reserved for high-value interactions like loyalty rewards, special offers, and ratings.
- **Surface & Background:** A warm off-white background prevents the "sterile" feel of pure white, while pure white is used strictly for elevated cards and sheets to create clear container boundaries.
- **Muted & Dividers:** Subtle greys and stone tones ensure that secondary information does not compete with the primary content.

## Typography

This design system uses a dual-font strategy to balance character with legibility. 

**Plus Jakarta Sans** (substituted for Poppins for a more modern, premium geometric feel) is used for all headings, titles, and numeric values (prices/ratings). It provides a confident, rounded personality that feels welcoming.

**Inter** is the workhorse for body text and functional labels. It ensures maximum readability at small sizes, crucial for menu descriptions and nutritional information.

- **Weight Usage:** Use Bold (700) for primary headlines to create a strong hierarchy. Use Medium (500) or Semi-Bold (600) for labels and interactive elements.
- **Price Styling:** Always use the numeric-display style for prices to ensure they are prominent and easy to scan.

## Layout & Spacing

This is a mobile-first design system utilizing a **Fluid Grid** model centered on a 4px baseline.

- **Margins:** A standard 20px side margin is used for all main content to provide a "premium" airy feel.
- **Vertical Rhythm:** Use 24px (lg) or 32px (xl) spacing between major sections. Use 8px (xs) or 12px (sm) for internal element spacing within cards.
- **Content Safe Areas:** Respect bottom navigation heights (56px-80px) and top app bar heights (56px) to ensure no content is obscured.
- **Safe Area Insets:** All full-bleed elements (like food banners) should respect the device's top notch/dynamic island.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Ambient Shadows**.

- **Level 0 (Background):** The warm off-white (#F7F6F2) acts as the canvas.
- **Level 1 (Cards):** Pure white (#FFFFFF) containers with a soft, diffused shadow (0px 4px 12px, 5% opacity of Neutral).
- **Level 2 (Active Elements):** Primary buttons and active chips utilize color to "pop" from the surface.
- **Sheets & Overlays:** Bottom sheets use a 10% black backdrop tint to focus the user’s attention. They feature a 28px top-corner radius to emphasize their "temporary" and "tactile" nature.
- **Dividers:** Use sparingly. Prefer whitespace to separate content, using #E9E7E1 only when distinct logical separation is required (e.g., between list items in the Cart).

## Shapes

The shape language is "Soft-Organic." 

- **Cards:** Use a 16px radius (`rounded-lg`) to appear friendly and approachable. 
- **Interactive Elements:** Buttons and quantity steppers are **Pill-shaped** (100px or at least 14px) to signal touchability and distinguish them from content containers.
- **Bottom Sheets:** A dramatic 28px top radius creates a premium, modern "sheet" feel that is characteristic of high-end mobile apps.
- **Images:** All food and category images should follow the 16px card radius or be fully circular for profile/category thumbnails.

## Components

### Buttons
- **Primary:** Pill-shaped, Hunter Green background, White text. High emphasis.
- **Secondary:** Pill-shaped, Hunter Green outline (1.5px), transparent background. Medium emphasis.
- **Tertiary:** Saffron/Amber background for specific "Reward" or "Offer" actions only.

### Navigation
- **Top App Bar:** Clean white background. Left-aligned title or logo. Right-side icons for Search and a Cart Badge (with Saffron notification dot).
- **Bottom Navigation:** 5 tabs (Home, Menu, Bookings, Rewards, Profile). Active state uses Primary Green for the icon and a small dot indicator below.

### Inputs & Selectors
- **Search Bar:** 16px rounded (matches cards), light tint (#E9F0EA) background, no border.
- **Quantity Steppers:** Rounded-pill container with a "-" and "+" icon and the number centered.
- **Chips:** Used for categories. Selected: Mint/Sage background with Green text. Unselected: Transparent with a light border.

### Feedback & Indicators
- **Ratings:** Saffron/Amber stars.
- **Loyalty Progress:** Saffron/Amber progress bars on a Sage background.
- **Empty States:** Use muted typography and simple line icons to guide the user back to the Menu.