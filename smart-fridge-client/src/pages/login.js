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

    const { success, data } = response.data;
    const { user, token, message } = data;

    if (success && user) {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('id', user.id.toString());
      await AsyncStorage.setItem('fullname', `${user.first_name} ${user.last_name}`);
      await AsyncStorage.setItem('account_type', user.role); 

      navigation.navigate('ConnectFridge');
    } 
    else {
      Alert.alert('Login Failed', 'Invalid credentials');
    }
  }
  catch (err) {
    console.error(err.response?.data || err.message);
    Alert.alert('Error', 'An error occurred. Please try again.');
  }
};
  return (
    <View style={styles.container}>
    <Image source={require('../../assets/fridget.png')} style={styles.logo} resizeMode="contain"/>
    <View style={styles.inputGroup}>
    <AppText style={styles.label}>Email</AppText>
        <TextInput
          placeholder="jhon@gmail.com"
          placeholderTextColor="#C0C0C0"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
    </View>

    <View style={styles.inputGroup}>
        <AppText style={styles.label}>Password</AppText>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="********"
            placeholderTextColor="#C0C0C0"
            secureTextEntry={!passwordVisible}
            autoCapitalize="none"
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons
              name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={20} 
              color={COLORS.primaryAccent}
            />
          </TouchableOpacity>
        </View>
      </View>



}




