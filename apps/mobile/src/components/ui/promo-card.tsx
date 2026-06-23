import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SymbolView } from 'expo-symbols';

export default function PromoCard() {
  return (
    <View 
      style={styles.container}
      className="bg-secondary-container/10 border border-secondary-container/30"
    >
      <View style={styles.badge} className="bg-secondary-container">
        <SymbolView
          name="star.fill"
          size={16}
          tintColor="#6c4500"
        />
      </View>
      <View style={styles.textContainer}>
        <Text className="font-body text-xs font-semibold text-secondary">
          Special Welcome
        </Text>
        <Text className="font-display text-sm font-bold text-on-secondary-container mt-0.5">
          Get 200 Aroma Points on signup
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    width: '100%',
    marginVertical: 16,
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
});
