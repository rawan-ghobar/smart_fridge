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
