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
const handleAddViaCamera = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission denied', 'Camera permission is required.');
    return;
  }
  const result = await ImagePicker.launchCameraAsync({
    quality: 0.7,
    allowsEditing: false,
  });

  if (result.canceled) return;
  const imageUri = result.assets[0].uri;
  try {
    setLoading(true);
    const form = new FormData();
    form.append('image', {
      uri: imageUri,
      name: 'fridge.jpg',
      type: 'image/jpeg',
    });
    const res = await api.post('/items/itemrecognize', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (res.data?.success) {
      navigation.navigate('AddItem', {
        prefill: res.data.data,
        imageUri,
      });
    } else {
      Alert.alert('Error', 'Could not recognise the item.');
    }
  } catch (err) {
    console.error(err.response?.data || err.message);
    Alert.alert('Error', 'Recognition service failed.');
  } finally {
    setLoading(false);
  }
};
const showAddOptions = () => {
  const options = ['Add Manually', 'Add with Camera', 'Cancel'];
  const actions = [handleAddManual, handleAddViaCamera];
  if (Platform.OS === 'ios') {
    ActionSheetIOS.showActionSheetWithOptions(
      { options, cancelButtonIndex: 2 },
      index => index < 2 && actions[index]()
    );
  } else {
    Alert.alert('Add Item', 'Choose how to add your item:', [
      { text: 'Add Manually', onPress: handleAddManual },
      { text: 'Add with Camera', onPress: handleAddViaCamera },
      { text: 'Cancel', style: 'cancel' },
    ]);
  }
};
const handleDeleteItem = async (itemId) => {
  try {
    const fridgeId = await AsyncStorage.getItem('fridgeId');
    await api.delete(`/items/deleteitem/${fridgeId}/${itemId}`);
    setItems(prev => prev.filter(i => i.id !== itemId));
  } catch (err) {
    console.error(err.response?.data || err.message);
    Alert.alert('Error', 'Could not delete item.');
  }
};
useEffect(() => {
  if (isFocused) {
    setLoading(true);
    fetchItems();
  }
}, [isFocused]);
