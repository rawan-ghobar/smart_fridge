import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useHomeActions } from '../hooks/useHomeActions';
import COLORS from '../../../theme/colors';
import typography from '../../../theme/typography';
const HomeScreen = ({ navigation }) => {
  const { userName, handlePress } = useHomeActions(navigation);
