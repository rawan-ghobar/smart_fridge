import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import COLORS from '../../../theme/colors';
const ItemCard = ({ item, onLongPress }) => {
  return (
    <TouchableOpacity onLongPress={onLongPress} style={styles.itemCard}>
      <View>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDate}>
          Quantity: {item.quantity} {item.unit}
        </Text>
      </View>
      <Image
        source={item.image ? { uri: item.image } : require('../../../../assets/placeholder.png')}
        style={styles.itemImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  itemName: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  itemDate: {
    color: COLORS.placeholder,
    marginTop: 4,
    fontSize: 12,
  },
