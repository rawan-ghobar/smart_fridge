import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import COLORS from '../../../theme/colors';

const ShoppingListScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.text}>Shopping List Screen</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: '600',
  },
});

export default ShoppingListScreen;
