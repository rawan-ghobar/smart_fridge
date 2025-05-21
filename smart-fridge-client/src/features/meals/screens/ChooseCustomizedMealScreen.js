import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../../theme/colors';
import typography from '../../../theme/typography';
const ChooseCustomizedMealScreen = ({ navigation }) => {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const mealOptions = ['Breakfast', 'Lunch', 'Dinner'];
  const handleMealSelect = (meal) => {
    setSelectedMeal(meal);
  };
  const handleContinue = async () => {
    if (!selectedMeal) {
      Alert.alert('Select Meal', 'Please select a meal type first');
      return;
    }

    try {
      setLoading(true);
      await AsyncStorage.setItem('selectedMealType', selectedMeal);
      navigation.navigate('MealCustomize', { mealType: selectedMeal });
    } catch (error) {
      Alert.alert('Error', 'Could not save your meal choice. Please try again.');
    } finally {
      setLoading(false);
    }
  };
