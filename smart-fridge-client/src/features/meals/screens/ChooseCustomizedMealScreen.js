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
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          {loading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.continueButtonText}>Continue</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
