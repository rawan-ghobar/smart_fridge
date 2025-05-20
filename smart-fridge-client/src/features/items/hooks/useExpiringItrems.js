import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../../services/api';
import { Alert } from 'react-native';
const useExpiringItems = () => {
const [items, setItems] = useState([]);
const [loading, setLoading] = useState(true);
const fetchExpiring = async () => {
  try {
    const fridgeId = await AsyncStorage.getItem('fridgeId');
    if (!fridgeId) {
      Alert.alert('Error', 'Fridge ID not found.');
      setLoading(false);
      return;
    }
