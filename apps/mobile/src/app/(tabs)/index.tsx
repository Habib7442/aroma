import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container} className="bg-background">
      <Text className="font-display text-2xl font-bold text-primary">
        AROMA Cafe
      </Text>
      <Text className="font-body text-base text-on-surface/60 mt-2">
        Welcome to your premium dining journey!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
