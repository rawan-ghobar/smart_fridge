import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../../services/api';
import COLORS from '../../../theme/colors';
import typography from '../../../theme/typography';
const CustomizedMealInfoScreen = ({ route, navigation }) => {
  const { mealType } = route.params;
  const [usercalories, setUserCalories] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const handleContinue = async () => {
    if (!usercalories) {
      Alert.alert('Calories', 'Please enter a calorie target.');
      return;
    }

    try {
      setLoading(true);
      const fridgeId = await AsyncStorage.getItem('fridgeId');
      if (!fridgeId) {
        Alert.alert('Error', 'Fridge ID not found. Please reconnect.');
        return;
      }

      const res = await api.post('/meal/generatewithcal', {
        fridgeId: Number(fridgeId),
        mealType,
        usercalories: Number(usercalories),
        userNotes: notes.trim(),
      });

      const meal =
        res.data?.data && typeof res.data.data === 'object'
          ? res.data.data
          : res.data;
      if (meal && meal.meal_name) {
        navigation.navigate('CustomizedMealInfo', {
          mealData: {
            name: meal.meal_name,
            usercalories: meal.total_calories,
            ingredients: meal.ingredients
              .split('\n')
              .map((line) => line.replace(/^- /, '').trim())
              .filter(Boolean),
            steps: meal.instructions
              .split('\n')
              .map((step) => step.trim())
              .filter(Boolean),
          },
        });
      } else {
        Alert.alert('Failed', 'Could not generate meal. Please try again.');
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
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
