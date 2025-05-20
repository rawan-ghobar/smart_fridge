import { useState } from 'react';
import { Alert } from 'react-native';
import api from '../../../services/api';
export const useSignupForm = (navigation) => {
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [passwordVisible, setPasswordVisible] = useState(false);
const [confirmVisible, setConfirmVisible] = useState(false);
const togglePasswordVisibility = () => setPasswordVisible(p => !p);
const toggleConfirmVisibility = () => setConfirmVisible(p => !p);
const handleSignup = async () => {
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return Alert.alert('Missing Fields', 'Please fill all fields.');
  }

  if (password !== confirmPassword) {
    return Alert.alert('Password Mismatch', 'Passwords do not match.');
  }
  try {
    const res = await api.post('/guest/signup', {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    });
    if (res.data?.success) {
      Alert.alert('Success', res.data?.message || 'Account created', [
        { text: 'Login now', onPress: () => navigation.goBack() },
      ]);
    } else {
      Alert.alert('Signup failed', res.data?.message || 'Something went wrong');
    }
  } catch (err) {
    console.error(err.response?.data || err.message);
    Alert.alert('Error', 'Signup failed');
  }
};
