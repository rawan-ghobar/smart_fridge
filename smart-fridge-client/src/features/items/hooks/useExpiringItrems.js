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
    const res = await api.get(`/items/expiring/${fridgeId}`);
    if (res.data?.success) {
      const arr = Array.isArray(res.data.data)
        ? res.data.data
        : Object.values(res.data.data || {});
      setItems(arr.filter(Boolean));
    } else {
      Alert.alert('Error', 'Could not load expiring items.');
    }
  } catch (err) {
    console.error(err.response?.data || err.message);
    Alert.alert('Error', 'Network error.');
  } finally {
    setLoading(false);
  }
};
