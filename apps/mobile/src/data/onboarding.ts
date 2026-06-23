export interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  image: any;
  accentColor: string;
}

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Silchar\'s Finest Cafe & Dining',
    description: 'Experience Silchar\'s premium culinary offerings from AROMA, Cozy Cup, and Biryani Shop, scoped perfectly to your location.',
    image: require('@/assets/images/coffee_onboarding.png'),
    accentColor: '#1d4626', // Hunter Green
  },
  {
    id: '2',
    title: 'Seamless Table Bookings',
    description: 'Skip the line and book your tables instantly at any of our outlets. Customize your dining experience beforehand.',
    image: require('@/assets/images/table_booking_onboarding.png'),
    accentColor: '#feae32', // Amber/Saffron
  },
  {
    id: '3',
    title: 'Loyalty Rewards & Wallet',
    description: 'Earn points on every order, climb membership tiers, and top-up your secure customer wallet for quick checkouts.',
    image: require('@/assets/images/rewards_onboarding.png'),
    accentColor: '#1d4626', // Hunter Green
  },
];
