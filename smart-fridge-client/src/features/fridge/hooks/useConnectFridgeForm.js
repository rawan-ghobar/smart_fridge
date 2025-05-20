import { useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../../services/api';
export const useConnectFridgeForm = (navigation) => {
const [code, setCode] = useState('');
const [password, setPassword] = useState('');
