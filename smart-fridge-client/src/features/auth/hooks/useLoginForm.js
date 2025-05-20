import { useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../../services/api';

export const useLoginForm = (navigation) => {
    const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [passwordVisible, setPasswordVisible] = useState(false);
const togglePasswordVisibility = () => setPasswordVisible(prev => !prev);

const handleLogin = async () => {
  try {
    const response = await api.post('/guest/login', { email, password }, {
      headers: { 'Content-Type': 'application/json' },
    });
    const { success, data } = response.data;
    const { user, token } = data;

    if (success && user) {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('id', user.id.toString());
      await AsyncStorage.setItem('fullname', `${user.first_name} ${user.last_name}`);
      await AsyncStorage.setItem('account_type', user.role);
      navigation.navigate('ConnectFridge');
    } else {
      Alert.alert('Login Failed', 'Invalid credentials');
    }
  } catch (err) {
    console.error(err.response?.data || err.message);
    Alert.alert('Error', 'An error occurred. Please try again.');
  }
};
