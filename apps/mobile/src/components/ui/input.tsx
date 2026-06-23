import React from 'react';
import { View, Text, TextInput, TextInputProps, StyleSheet } from 'react-native';

interface InputProps extends TextInputProps {
  label: string;
  optional?: boolean;
  prefix?: string;
  error?: string;
}

export default function Input({
  label,
  optional = false,
  prefix,
  error,
  style,
  ...props
}: InputProps) {
  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text className="font-body text-sm font-semibold text-on-surface/70">
          {label}
        </Text>
        {optional && (
          <Text className="font-body text-xs italic text-on-surface/40">
            Optional
          </Text>
        )}
      </View>
      
      <View 
        className={`bg-surface-container-lowest border ${
          error ? 'border-error' : 'border-outline-variant/30'
        }`}
        style={styles.inputWrapper}
      >
        {prefix && (
          <View style={styles.prefixContainer}>
            <Text className="font-body text-base font-medium text-on-surface/80">
              {prefix}
            </Text>
            <View style={styles.divider} />
          </View>
        )}
        
        <TextInput
          placeholderTextColor="#c1c9be"
          style={[styles.textInput, style]}
          className="font-body text-base text-on-surface"
          autoCapitalize="none"
          {...props}
        />
      </View>
      
      {error && (
        <Text className="font-body text-xs text-error mt-1 ml-1">
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderRadius: 16, // 16px matches cards
    paddingHorizontal: 16,
  },
  prefixContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 4,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#c1c9be', // border-outline-variant
    marginLeft: 12,
  },
  textInput: {
    flex: 1,
    height: '100%',
    padding: 0, // resets native padding
  },
});
