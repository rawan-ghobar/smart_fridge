import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import * as ImagePicker from 'expo-image-picker';
import api from '../../../services/api';
export const useAddItemForm = (route, navigation) => {
const [name, setName] = useState('');
const [quantity, setQuantity] = useState('');
const [unit, setUnit] = useState('');
const [calories, setCalories] = useState('');
