import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Pressable, 
  StyleSheet, 
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SymbolView } from 'expo-symbols';

import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import { useAuthStore } from '@/store/useAuthStore';
import { supabase } from '@/lib/supabase';

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const { 
    setPhone, 
    clearTempProfile,
    isLoading, 
    setLoading, 
    setError 
  } = useAuthStore();

  const [phoneInput, setPhoneInput] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleLogin = async () => {
    if (!phoneInput.trim()) {
      setPhoneError('Phone number is required');
      return;
    } else if (!/^\d{10}$/.test(phoneInput.trim())) {
      setPhoneError('Please enter a valid 10-digit phone number');
      return;
    }
    setPhoneError('');

    setLoading(true);
    setError(null);
    const fullPhoneNumber = `+91${phoneInput.trim()}`;

    try {
      // Supabase OTP for existing profile
      const { error: loginError } = await supabase.auth.signInWithOtp({
        phone: fullPhoneNumber,
        options: {
          shouldCreateUser: false, // login only
        }
      });

      if (loginError) {
        throw loginError;
      }

      setPhone(phoneInput.trim());
      clearTempProfile(); // No registration metadata needed since they already exist

      router.push('/(auth)/verify' as any);
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign in.');
      Alert.alert('Sign In Error', err.message || 'Ensure your phone number is registered.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.flexContainer}
    >
      <ScrollView 
        style={styles.flexContainer}
        className="bg-background"
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Bar */}
        <View style={styles.header}>
          <Pressable 
            onPress={() => router.back()} 
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
          >
            <SymbolView name="chevron.left" size={24} tintColor="#1d4626" />
          </Pressable>
          <Text className="font-display text-lg font-bold text-primary ml-4">
            AROMA
          </Text>
        </View>

        {/* Title */}
        <View style={styles.titleSection}>
          <Text className="font-display text-3xl font-bold text-on-surface">
            Welcome back
          </Text>
          <Text className="font-body text-base text-on-surface/60 mt-1">
            Enter your phone number to sign in to your account.
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Input
            label="Phone"
            prefix="+91"
            placeholder="98765 43210"
            keyboardType="phone-pad"
            value={phoneInput}
            onChangeText={setPhoneInput}
            error={phoneError}
            maxLength={10}
          />

          {/* Submit Action */}
          <View style={styles.submitContainer}>
            <Button
              title="Send OTP code"
              onPress={handleLogin}
              loading={isLoading}
            />
          </View>

          {/* Switch to Signup */}
          <View style={styles.footer}>
            <Text className="font-body text-sm text-on-surface/60">
              Don't have an account?{' '}
              <Text 
                onPress={() => router.push('/(auth)/signup' as any)}
                className="font-body text-sm font-bold text-primary"
              >
                Sign up
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    marginBottom: 24,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  titleSection: {
    marginBottom: 24,
  },
  form: {
    marginTop: 8,
  },
  submitContainer: {
    marginTop: 24,
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
});
