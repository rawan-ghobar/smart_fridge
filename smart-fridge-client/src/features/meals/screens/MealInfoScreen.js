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
