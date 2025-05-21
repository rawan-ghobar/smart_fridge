import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const api = axios.create({
  baseURL: 'http://192.168.0.100:8000/api/v0.1',
  timeout: 10000,
});
