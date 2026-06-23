import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SymbolView } from 'expo-symbols';

import { useOutletStore, OutletType } from '@/store/useOutletStore';
import { supabase } from '@/lib/supabase';

interface OutletItem {
  id: OutletType;
  name: string;
  tagline: string;
  location: string;
  timings: string;
  iconName: string;
  accentColor: string;
}

const OUTLETS: OutletItem[] = [
  {
    id: 'AROMA',
    name: 'AROMA (Main Outlet)',
    tagline: 'Silchar\'s premium multi-cuisine fine dining & craft coffee.',
    location: 'Club Road, Silchar',
    timings: '11:00 AM - 10:30 PM',
    iconName: 'storefront.fill',
    accentColor: '#1d4626', // Hunter Green
  },
  {
    id: 'COZY_CUP',
    name: 'Cozy Cup (Café & Bakery)',
    tagline: 'Freshly baked goods, artisan coffees, and cozy vibes.',
    location: 'Link Road, Silchar',
    timings: '08:00 AM - 09:30 PM',
    iconName: 'cup.and.saucer.fill',
    accentColor: '#feae32', // Saffron/Amber
  },
  {
    id: 'BIRYANI_SHOP',
    name: 'Biryani Shop',
    tagline: 'Traditional dum-cooked Kolkata & Mughlai biryanis.',
    location: 'Goldighi Mall, Silchar',
    timings: '12:00 PM - 10:00 PM',
    iconName: 'flame.fill',
    accentColor: '#835400', // Saffron Dark / Accent
  },
];

export default function OutletsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { setOutlet } = useOutletStore();

  const [userName, setUserName] = useState<string>('Guest');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', user.id)
            .single();

          if (!error && data?.full_name) {
            // Take first name for friendly greeting
            const firstName = data.full_name.split(' ')[0];
            setUserName(firstName);
          }
        }
      } catch (error) {
        console.warn('Failed to load user profile for greeting', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, []);

  const handleSelectOutlet = (outletId: OutletType) => {
    setOutlet(outletId);
    router.replace('/(tabs)' as any);
  };

  const handleLogout = async () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await supabase.auth.signOut();
          setOutlet(null);
          router.replace('/(auth)/signup' as any);
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]} className="bg-background">
      {/* Header bar */}
      <View style={styles.header}>
        <View>
          <Text className="font-body text-sm font-semibold text-on-surface/50">
            Welcome back,
          </Text>
          {loading ? (
            <ActivityIndicator size="small" color="#1d4626" style={styles.loader} />
          ) : (
            <Text className="font-display text-2xl font-bold text-on-surface">
              {userName} 👋
            </Text>
          )}
        </View>

        <Pressable 
          onPress={handleLogout}
          style={({ pressed }) => [styles.logoutButton, pressed && styles.pressed]}
        >
          <SymbolView name="power" size={20} tintColor="#ba1a1a" />
        </Pressable>
      </View>

      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleSection}>
          <Text className="font-display text-xl font-bold text-on-surface">
            Select an Outlet
          </Text>
          <Text className="font-body text-sm text-on-surface/60 mt-1">
            Choose an outlet to explore menus and place table reservations.
          </Text>
        </View>

        {/* Outlet Cards */}
        {OUTLETS.map((outlet) => (
          <Pressable
            key={outlet.id}
            onPress={() => handleSelectOutlet(outlet.id)}
            style={({ pressed }) => [
              styles.outletCard,
              pressed && styles.cardPressed,
            ]}
            className="bg-surface-container-lowest shadow-sm border border-outline-variant/30"
          >
            <View style={styles.cardHeader}>
              <View style={[styles.iconBox, { backgroundColor: outlet.accentColor + '12' }]}>
                <SymbolView name={outlet.iconName as any} size={28} tintColor={outlet.accentColor} />
              </View>
              <View style={styles.cardHeaderInfo}>
                <Text 
                  className="font-display text-lg font-bold text-on-surface"
                  style={{ color: outlet.id === 'AROMA' ? '#1d4626' : '#141e1a' }}
                >
                  {outlet.name}
                </Text>
                <View style={styles.taglineWrapper}>
                  <Text className="font-body text-xs text-on-surface/60 mt-1 leading-4">
                    {outlet.tagline}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.cardFooter}>
              {/* Location */}
              <View style={styles.metaRow}>
                <SymbolView name="mappin.and.ellipse" size={14} tintColor="#727970" />
                <Text className="font-body text-xs text-on-surface/75 ml-1.5 font-medium">
                  {outlet.location}
                </Text>
              </View>

              {/* Timings */}
              <View style={styles.metaRow}>
                <SymbolView name="clock" size={14} tintColor="#727970" />
                <Text className="font-body text-xs text-on-surface/75 ml-1.5 font-medium">
                  {outlet.timings}
                </Text>
              </View>
            </View>

            {/* Select Action */}
            <View style={styles.selectIndicator}>
              <Text 
                className="font-body text-sm font-semibold mr-1"
                style={{ color: outlet.accentColor }}
              >
                Enter
              </Text>
              <SymbolView name="chevron.right" size={16} tintColor={outlet.accentColor} />
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  loader: {
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  titleSection: {
    marginBottom: 20,
  },
  outletCard: {
    borderRadius: 16, // 16px corner radius for cards
    padding: 18,
    marginBottom: 16,
    position: 'relative',
  },
  cardPressed: {
    opacity: 0.95,
    transform: [{ scale: 0.99 }],
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardHeaderInfo: {
    flex: 1,
    marginLeft: 16,
    paddingRight: 40, // leave space for the absolute position enter arrow
  },
  taglineWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  divider: {
    height: 1,
    backgroundColor: '#dae5df', // border-outline-variant
    marginVertical: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectIndicator: {
    position: 'absolute',
    top: 18,
    right: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
