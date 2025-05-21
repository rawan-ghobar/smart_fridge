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
