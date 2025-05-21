import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useNotifications from '../hooks/useNotifications';
import NotificationCard from '../components/NotificationCard';
import COLORS from '../../../theme/colors';
import typography from '../../../theme/typography';
const NotificationsScreen = ({ navigation }) => {
  const { notifications, loading } = useNotifications();
  return (
    <SafeAreaView style={styles.safeArea}>
