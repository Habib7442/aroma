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
import { useOutletStore } from '@/store/useOutletStore';

export default function VerifyScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const { 
    phone, 
    tempProfile, 
    clearTempProfile,
    isLoading, 
    setLoading, 
    setError 
  } = useAuthStore();

  const selectedOutlet = useOutletStore((state) => state.selectedOutlet);
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');

  const handleVerify = async () => {
    if (!code.trim()) {
      setCodeError('Verification code is required');
      return;
    } else if (!/^\d{6}$/.test(code.trim())) {
      setCodeError('Verification code must be exactly 6 digits');
      return;
    }
    setCodeError('');

    setLoading(true);
    setError(null);
    const fullPhoneNumber = `+91${phone}`;

    try {
      // Verify OTP via Supabase Auth
      const { data: { session }, error: verifyError } = await supabase.auth.verifyOtp({
        phone: fullPhoneNumber,
        token: code.trim(),
        type: 'sms',
      });

      if (verifyError) {
        throw verifyError;
      }

      if (!session) {
        throw new Error('Unable to establish user session. Please try again.');
      }

      // If user came from the Signup flow, save their profile metadata
      if (tempProfile) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: session.user.id,
            full_name: tempProfile.fullName,
            // email: tempProfile.email, (if database supports email or handle metadata)
            updated_at: new Date().toISOString(),
          });

        if (profileError) {
          console.warn('Profile sync failed:', profileError.message);
          // Don't block the user if only the profile metadata sync failed, let them login
        }
        
        clearTempProfile();
      }

      // Successful Auth redirect logic
      if (selectedOutlet) {
        router.replace('/(tabs)' as any);
      } else {
        router.replace('/outlets' as any);
      }
    } catch (err: any) {
      setError(err.message || 'Verification failed.');
      Alert.alert('Verification Error', err.message || 'Invalid or expired OTP code.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    const fullPhoneNumber = `+91${phone}`;
    try {
      const { error: resendError } = await supabase.auth.signInWithOtp({
        phone: fullPhoneNumber,
      });
      if (resendError) {
        throw resendError;
      }
      Alert.alert('Code Sent', 'A new 6-digit verification code has been sent via SMS.');
    } catch (err: any) {
      Alert.alert('Resend Failed', err.message || 'Unable to resend code at this time.');
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
            Verify Phone
          </Text>
          <Text className="font-body text-base text-on-surface/60 mt-1">
            Enter the 6-digit code sent to +91 {phone || 'your number'}.
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Input
            label="Verification code"
            placeholder="000000"
            keyboardType="number-pad"
            value={code}
            onChangeText={setCode}
            error={codeError}
            maxLength={6}
            style={styles.codeInput}
          />

          {/* Submit Action */}
          <View style={styles.submitContainer}>
            <Button
              title="Verify and Login"
              onPress={handleVerify}
              loading={isLoading}
            />
          </View>

          {/* Resend Actions */}
          <View style={styles.footer}>
            <Text className="font-body text-sm text-on-surface/60">
              Didn't receive code?{' '}
              <Text 
                onPress={handleResend}
                className="font-body text-sm font-bold text-primary"
              >
                Resend code
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
  codeInput: {
    letterSpacing: 8,
    textAlign: 'center',
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
