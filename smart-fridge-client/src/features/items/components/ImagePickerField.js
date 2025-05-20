import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import COLORS from '../../../theme/colors';
const ImagePickerField = ({ label = 'Image (optional)', imageUri, onPick }) => {
return (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
