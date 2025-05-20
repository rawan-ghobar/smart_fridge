import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import COLORS from '../../../theme/colors';
const ImagePickerField = ({ label = 'Image (optional)', imageUri, onPick }) => {
return (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
<TouchableOpacity onPress={onPick} style={styles.imageBox}>
  {imageUri ? (
    <Image source={{ uri: imageUri }} style={styles.image} />
  ) : (
    <Text style={styles.placeholder}>Pick an image</Text>
  )}
</TouchableOpacity>
  </View>
);
const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    marginBottom: 6,
    fontSize: 16,
    color: COLORS.primary,
  },
  imageBox: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
