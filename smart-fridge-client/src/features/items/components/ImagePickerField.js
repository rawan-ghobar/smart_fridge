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
