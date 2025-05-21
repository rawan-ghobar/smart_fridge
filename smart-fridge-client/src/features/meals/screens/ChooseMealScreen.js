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
import api from '../../../services/api';
import COLORS from '../../../theme/colors';
import typography from '../../../theme/typography';
const ChooseMealScreen = ({ navigation }) => {
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
      const fridgeId = await AsyncStorage.getItem('fridgeId');
      if (!fridgeId) {
        Alert.alert('Error', 'Fridge ID not found. Please reconnect.');
        return;
      }

      const response = await api.post('/meal/generate', {
        fridgeId: parseInt(fridgeId),
        mealType: selectedMeal,
      });

      const { data } = response.data;
      if (data) {
        navigation.navigate('MealInfo', {
          mealData: {
            name: data.meal_name,
            calories: data.total_calories,
            ingredients: data.ingredients
              .split('\n')
              .map((line) => line.replace(/^- /, '').trim()),
            steps: data.instructions
              .split('\n')
              .map((step) => step.trim()),
          },
        });
      } else {
        const errorMessage = data?.original?.message || 'Could not generate meal. Please try again.';
        Alert.alert('Failed', errorMessage);
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      Alert.alert('Error', 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={24} color={COLORS.primary} />
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.questionText}>Which meal do you want me to generate?</Text>

        <Image
          source={require('../../../../assets/thinkingfridge.png')}
          style={styles.fridgeImage}
          resizeMode="contain"
        />
        <View style={styles.optionsContainer}>
          {mealOptions.map((meal) => (
            <TouchableOpacity
              key={meal}
              style={[
                styles.optionButton,
                selectedMeal === meal && styles.optionButtonSelected,
              ]}
              onPress={() => handleMealSelect(meal)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedMeal === meal && styles.optionTextSelected,
                ]}
              >
                {meal}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
