import { useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../../services/api';

export const useLoginForm = (navigation) => {
    const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [passwordVisible, setPasswordVisible] = useState(false);
const togglePasswordVisibility = () => setPasswordVisible(prev => !prev);

