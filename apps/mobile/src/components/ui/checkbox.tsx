import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { SymbolView } from 'expo-symbols';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
}

export default function Checkbox({ checked, onChange, children }: CheckboxProps) {
  return (
    <Pressable
      onPress={() => onChange(!checked)}
      style={styles.container}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
    >
      <View 
        className={`border ${
          checked ? 'bg-primary border-primary' : 'bg-surface-container-lowest border-outline-variant'
        }`}
        style={styles.checkboxBox}
      >
        {checked && (
          <SymbolView
            name="checkmark"
            size={14}
            tintColor="#ffffff"
          />
        )}
      </View>
      <View style={styles.labelContainer}>
        {children}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginVertical: 12,
  },
  checkboxBox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2, // slightly lower to align with first line of text
  },
  labelContainer: {
    flex: 1,
  },
});
