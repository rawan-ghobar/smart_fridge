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
import typography from '../../../theme/typography';
const ExpiringItemsScreen = ({ navigation }) => {
  const { items, loading } = useExpiringItems();

  const renderItem = ({ item }) => <ItemCard item={item} />;
return (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.headerWrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hurry up, we’re expiring soon!</Text>
      </View>
    </View>
