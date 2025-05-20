import { useState, useEffect } from 'react';
import { Alert, Platform, ActionSheetIOS } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useIsFocused } from '@react-navigation/native';
import api from '../../../services/api';
export const useItemList = (navigation) => {
const [items, setItems] = useState([]);
const [loading, setLoading] = useState(true);
const isFocused = useIsFocused();
const fetchItems = async () => {
  try {
    const fridgeId = await AsyncStorage.getItem('fridgeId');
    if (!fridgeId) {
      Alert.alert('Error', 'Fridge ID not found.');
      return;
    }
    const res = await api.get(`items/getitems/${fridgeId}`);
    if (res.data?.success) {
      setItems(res.data.data);
    } else {
      Alert.alert('Error', 'Failed to fetch items.');
    }
  } catch (err) {
    console.error(err.response?.data || err.message);
    Alert.alert('Error', 'An error occurred while fetching items.');
  } finally {
    setLoading(false);
  }
};
const handleAddManual = () => navigation.navigate('AddItem');
