import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { SymbolView } from 'expo-symbols';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  disabled?: boolean;
  rightIcon?: React.ReactNode;
  hideChevron?: boolean;
  style?: any;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  rightIcon,
  hideChevron = false,
  style,
}: ButtonProps) {
  const isPrimary = variant === 'primary';
  
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        isPrimary ? styles.primaryBg : styles.secondaryBg,
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? '#ffffff' : '#1d4626'} />
      ) : (
        <View style={[styles.contentContainer, hideChevron && styles.contentCentered]}>
          {/* Invisible spacer to center the text */}
          {!hideChevron && <View style={styles.spacer} />}
          
          <Text
            className={`font-body text-base font-semibold ${
              isPrimary ? 'text-white' : 'text-primary'
            }`}
          >
            {title}
          </Text>
          
          {/* Right aligned icon or chevron */}
          {!hideChevron && (
            <View style={styles.iconContainer}>
              {rightIcon || (
                <SymbolView
                  name="chevron.right"
                  size={18}
                  tintColor={isPrimary ? '#ffffff' : '#1d4626'}
                />
              )}
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 56,
    borderRadius: 16, // rounded rectangle matching card radius
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  primaryBg: {
    backgroundColor: '#1d4626', // bg-primary
  },
  secondaryBg: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#1d4626', // border-primary
  },
  disabled: {
    opacity: 0.5,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  contentCentered: {
    justifyContent: 'center',
  },
  spacer: {
    width: 24,
  },
  iconContainer: {
    width: 24,
    alignItems: 'flex-end',
  },
});
