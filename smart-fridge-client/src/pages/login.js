import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppText from '../components/textWrapper';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisible(prev => !prev);

  const handleLogin = async () => {
  try {
    const response = await api.post('/guest/login', { email, password }, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('Response Data:', response.data);

