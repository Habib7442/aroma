# AROMA Mobile App - Project Overview

## Overview

AROMA is a premium multi-outlet cafe and restaurant mobile application built for three specific outlets in Silchar, Assam, India: AROMA (Main Outlet), Cozy Cup (Cafe & Bakery), and Biryani Shop (Specialty Biryani). Selecting an outlet dynamically scopes the menu, active orders, and table bookings to that location. It delivers a fluid dining, ordering, and rewards experience.

## Goals

1. Provide an app-driven ordering flow (takeaway, delivery, dine-in) for Silchar cafe outlets.
2. Establish a unified customer wallet with secure top-up and transaction history.
3. Build a loyalty points system with tier rules and point redemption.
4. Support referral rewards with anti-abuse logic and deep linking.
5. Create a table booking system with reservation status updates.

## Core User Flow

1. User downloads app and goes through Onboarding slides.
2. User authenticates via phone number + OTP (Supabase Auth).
3. User selects one of the 3 outlets (AROMA, Cozy Cup, Biryani Shop).
4. User lands on Home Screen displaying scoped menu, banners, and wallet balances.
5. User selects a dish, customizes it, and adds it to the cart.
6. User completes checkout using Wallet or Razorpay.
7. User tracks order status in real-time (Supabase Realtime).

## Features

### Authentication & Outlets
- Phone OTP login (Supabase Auth)
- Multi-outlet selection & switching

### Menu & Customization
- Scoped categories and dish browsing
- Interactive ingredient customization (veg/non-veg indicator)

### Ordering & Real-time Tracking
- Order types: Takeaway, Dine-in, Delivery
- Live status updates via Supabase Realtime

### Wallet & Loyalty
- Ledger-backed wallet top-up and payments
- Tiered points progression (Saffron/Amber indicators)
- Referral reward system (code + deep linking)

## Scope

### In Scope
- Customer mobile app (iOS and Android using Expo React Native).
- Dynamic menu fetching and cart state.
- Order ledger, table reservations, and points balance integration.
- Razorpay payment SDK integration.

### Out of Scope
- Restaurant admin dashboard (managed under apps/admin Next.js).
- Supabase SQL schema migrations and edge function server scripts (managed separately).
- Third-party courier maps integration (simple status-based tracking is used).

## Success Criteria

1. Authenticated users can successfully choose an outlet and load its menu from Supabase.
2. Placing an order updates the wallet and points database tables.
3. Real-time order status triggers app notifications and updates the order tracking screen.
