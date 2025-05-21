import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../../theme/colors';
import typography from '../../../theme/typography';
const MealInfoScreen = ({ route, navigation }) => {
  const { mealData } = route.params;
  const { name, calories, ingredients, steps } = mealData;
return (
  <SafeAreaView style={styles.safeArea}>
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back-outline" size={24} color={COLORS.primary} />
    </TouchableOpacity>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>{name}</Text>

      <Image
        source={require('../../../../assets/fridgeeating.png')}
        style={styles.mealImage}
        resizeMode="cover"
      />

      <Text style={styles.caloriesText}>Total Calories: {calories}</Text>
