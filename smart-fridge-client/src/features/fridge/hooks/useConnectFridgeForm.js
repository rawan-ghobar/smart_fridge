import { useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../../services/api';
export const useConnectFridgeForm = (navigation) => {
const [code, setCode] = useState('');
const [password, setPassword] = useState('');
const [passwordVisible, setPasswordVisible] = useState(false);
const togglePasswordVisibility = () => setPasswordVisible(prev => !prev);
const handleConnect = async () => {
  try {
    const response = await api.post('/fridge/connect', { code, password }, {
      headers: { 'Content-Type': 'application/json' },
    });
const handleConnect = async () => {
  try {
    const response = await api.post('/fridge/connect', { code, password }, {
      headers: { 'Content-Type': 'application/json' },
    });
