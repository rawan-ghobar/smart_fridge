import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../../services/api';
const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchNotifications = async () => {
    try {
      const fridgeId = await AsyncStorage.getItem('fridgeId');
      if (!fridgeId) {
        Alert.alert('Error', 'Fridge ID not found.');
        setLoading(false);
        return;
      }
      const res = await api.get(`/user/getnotifications/${fridgeId}`);
      if (res.data?.success) {
        setNotifications(res.data.data || []);
      } else {
        Alert.alert('Error', 'Failed to load notifications.');
      }
