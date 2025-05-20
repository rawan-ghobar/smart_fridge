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
