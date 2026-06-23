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
import Checkbox from '@/components/ui/checkbox';
import PromoCard from '@/components/ui/promo-card';
import { useAuthStore } from '@/store/useAuthStore';
import { supabase } from '@/lib/supabase';

export default function SignupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const { 
    phone, 
    setPhone, 
    setTempProfile, 
    isLoading, 
    setLoading, 
    error, 
    setError 
  } = useAuthStore();

  const [fullName, setFullName] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [email, setEmail] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    if (!phoneInput.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phoneInput.trim())) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Please enter a valid email address';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignup = async () => {
    if (!validate()) return;
    if (!agreed) {
      Alert.alert('Consent Required', 'Please agree to the Terms and Conditions to continue.');
      return;
    }

    setLoading(true);
    setError(null);
    const fullPhoneNumber = `+91${phoneInput.trim()}`;

    try {
      // Trigger Supabase Phone OTP
      const { error: signUpError } = await supabase.auth.signInWithOtp({
        phone: fullPhoneNumber,
        options: {
          shouldCreateUser: true,
        }
      });

      if (signUpError) {
        throw signUpError;
      }

      // Save phone and intermediate details to Zustand
      setPhone(phoneInput.trim());
      setTempProfile({
        fullName: fullName.trim(),
        email: email.trim() || undefined,
        referralCode: referralCode.trim() || undefined,
      });

      // Move to verification screen
      router.push('/(auth)/verify' as any);
    } catch (err: any) {
      setError(err.message || 'An error occurred during signup.');
      Alert.alert('Signup Error', err.message || 'Unable to register at this time.');
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
            Create account
          </Text>
          <Text className="font-body text-base text-on-surface/60 mt-1">
            Join Aroma and start your premium dining journey.
          </Text>
        </View>

        {/* Welcome promo badge */}
        <PromoCard />

        {/* Fields */}
        <View style={styles.form}>
          <Input
            label="Full name"
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
            error={fieldErrors.fullName}
          />

          <Input
            label="Phone"
            prefix="+91"
            placeholder="98765 43210"
            keyboardType="phone-pad"
            value={phoneInput}
            onChangeText={setPhoneInput}
            error={fieldErrors.phone}
            maxLength={10}
          />

          <Input
            label="Email"
            placeholder="email@example.com"
            keyboardType="email-address"
            optional
            value={email}
            onChangeText={setEmail}
            error={fieldErrors.email}
          />

          <Input
            label="Have a referral code?"
            placeholder="Enter code"
            optional
            value={referralCode}
            onChangeText={setReferralCode}
          />

          {/* Terms & Conditions Checkbox */}
          <Checkbox checked={agreed} onChange={setAgreed}>
            <Text className="font-body text-sm text-on-surface/70 leading-5">
              I agree to the <Text className="underline text-primary font-semibold">Terms and Conditions</Text> and <Text className="underline text-primary font-semibold">Privacy Policy</Text>.
            </Text>
          </Checkbox>

          {/* Submit Action */}
          <View style={styles.submitContainer}>
            <Button
              title="Create account"
              onPress={handleSignup}
              loading={isLoading}
            />
          </View>

          {/* Footer switch to Login */}
          <View style={styles.footer}>
            <Text className="font-body text-sm text-on-surface/60">
              Already have an account?{' '}
              <Text 
                onPress={() => router.push('/(auth)/login' as any)}
                className="font-body text-sm font-bold text-primary"
              >
                Login
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
    paddingHorizontal: 20, // margin-mobile: 20px
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
    marginBottom: 8,
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
