import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import * as ImagePicker from 'expo-image-picker';
import api from '../../../services/api';
export const useAddItemForm = (route, navigation) => {
const [name, setName] = useState('');
const [quantity, setQuantity] = useState('');
const [unit, setUnit] = useState('');
const [calories, setCalories] = useState('');
const [expiryDate, setExpiryDate] = useState(null);
const [showDatePicker, setShowDatePicker] = useState(false);
const [imageUri, setImageUri] = useState(null);
const [loading, setLoading] = useState(false);
useEffect(() => {
  if (route?.params?.prefill) {
    const p = route.params.prefill;
    setName(p.name || '');
    setQuantity((p.quantity ?? '').toString());
    setUnit(p.unit || '');
    setCalories((p.calories ?? '').toString());
  }
  if (route?.params?.imageUri) {
    setImageUri(route.params.imageUri);
  }
}, []);
const handleSave = async () => {
  if (!name.trim() || !quantity || !unit.trim() || !calories) {
    Alert.alert('Missing fields', 'Please fill out all required fields.');
    return;
  }
  const quantityNum = Number(quantity);
  const caloriesNum = Number(calories);

  if (isNaN(quantityNum) || isNaN(caloriesNum) || quantityNum <= 0 || caloriesNum <= 0) {
    Alert.alert('Invalid numbers', 'Quantity and Calories must be positive numbers.');
    return;
  }
