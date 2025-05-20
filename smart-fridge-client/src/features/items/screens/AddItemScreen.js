import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { useAddItemForm } from '../hooks/useAddItemForm';
import FormInput from '../components/FormInput';
import ImagePickerField from '../components/ImagePickerField';
import COLORS from '../../../theme/colors';
