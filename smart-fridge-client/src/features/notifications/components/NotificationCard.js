import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import COLORS from '../../../theme/colors';
const NotificationCard = ({ message, created_at }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.date}>{new Date(created_at).toLocaleString()}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  message: {
    color: COLORS.primary,
    fontSize: 16,
  },
