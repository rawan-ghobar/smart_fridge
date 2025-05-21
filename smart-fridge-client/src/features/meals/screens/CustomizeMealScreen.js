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

const CustomizeMealScreen = ({ route, navigation }) => {
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

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.inner}>
              <Text style={styles.title}>Customize your {mealType}</Text>

              <Image
                source={require('../../../../assets/fridgewaiting.png')}
                style={styles.image}
                resizeMode="contain"
              />

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Calorie target *</Text>
                <TextInput
                  placeholder="e.g. 500"
                  placeholderTextColor={COLORS.placeholder}
                  keyboardType="numeric"
                  style={styles.input}
                  value={usercalories}
                  onChangeText={setUserCalories}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Additional notes (optional)</Text>
                <TextInput
                  placeholder="No peanuts, extra protein…"
                  placeholderTextColor={COLORS.placeholder}
                  style={[styles.input, styles.notesInput]}
                  value={notes}
                  onChangeText={setNotes}
                  multiline
                  numberOfLines={3}
                />
              </View>

              <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                {loading ? (
                  <ActivityIndicator color={COLORS.white} />
                ) : (
                  <Text style={styles.continueText}>Continue</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    ...typography.header,
    textAlign: 'center',
    marginTop: 60,
  },
  image: {
    width: 200,
    height: 180,
    marginVertical: 30,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    color: COLORS.primary,
    marginBottom: 6,
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  notesInput: {
    height: 90,
    textAlignVertical: 'top',
  },
  continueButton: {
    backgroundColor: COLORS.primaryAccent,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  continueText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomizeMealScreen;
