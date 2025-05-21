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
const CustomizedMealInfoScreen = ({ route, navigation }) => {
  const { mealData } = route.params;
  const { name, usercalories, ingredients, steps } = mealData;
  const ingredientsArray = Array.isArray(ingredients)
    ? ingredients
    : ingredients.split(',').map((item) => item.trim());

  const stepsArray = Array.isArray(steps)
    ? steps
    : steps.split('.').map((item) => item.trim()).filter(Boolean);
