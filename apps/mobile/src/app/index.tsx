import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useOutletStore } from '@/store/useOutletStore';
import { useOnboardingStore } from '@/store/useOnboardingStore';

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const selectedOutlet = useOutletStore((state) => state.selectedOutlet);
  const hasCompletedOnboarding = useOnboardingStore((state) => state.hasCompletedOnboarding);

  useEffect(() => {
    let mounted = true;

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      
      if (session) {
        if (selectedOutlet) {
          router.replace('/(tabs)' as any);
        } else {
          router.replace('/outlets' as any);
        }
      } else {
        if (hasCompletedOnboarding) {
          router.replace('/(auth)/signup' as any);
        } else {
          router.replace('/(auth)/onboarding' as any);
        }
      }
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;

      if (session) {
        if (selectedOutlet) {
          router.replace('/(tabs)' as any);
        } else {
          router.replace('/outlets' as any);
        }
      } else {
        if (hasCompletedOnboarding) {
          router.replace('/(auth)/signup' as any);
        } else {
          router.replace('/(auth)/onboarding' as any);
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [selectedOutlet, hasCompletedOnboarding]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1d4626" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1fcf5', // bg-background
  },
});