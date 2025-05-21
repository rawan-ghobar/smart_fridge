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
import useExpiringItems from '../hooks/useExpiringItems';
import ItemCard from '../components/ItemCard'; // reused component
import COLORS from '../../../theme/colors';
