import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const api = axios.create({
  baseURL: 'http://192.168.0.100:8000/api/v0.1',
  timeout: 10000,
});
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Failed to get token from AsyncStorage', error);
    }
    return config;
