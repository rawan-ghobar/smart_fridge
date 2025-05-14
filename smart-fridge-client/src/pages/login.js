import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppText from '../components/textWrapper';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
