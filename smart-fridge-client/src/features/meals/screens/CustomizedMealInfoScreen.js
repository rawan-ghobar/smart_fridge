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
