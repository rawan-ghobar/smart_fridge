import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useItemList } from '../hooks/useItemList';
import ItemCard from '../components/ItemCard';
import COLORS from '../../../theme/colors';
import typography from '../../../theme/typography';
const ItemListScreen = ({ navigation }) => {
  const { items, loading, showAddOptions, handleDeleteItem } = useItemList(navigation);
return (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.headerWrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>What's Inside?</Text>
      </View>
    </View>
