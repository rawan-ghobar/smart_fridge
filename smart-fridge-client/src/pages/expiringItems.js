import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import COLORS from '../theme/colors';
import typography from '../theme/typography';

const ExpiringItems = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExpiring = async () => {
    try {
      const fridgeId = await AsyncStorage.getItem('fridgeId');
      if (!fridgeId) {
        Alert.alert('Error', 'Fridge ID not found.');
        setLoading(false);
        return;
      }

      const res = await api.get(`/items/expiring/${fridgeId}`);
      if (res.data?.success) {
        const arr = Array.isArray(res.data.data)
          ? res.data.data
          : Object.values(res.data.data || {});
        setItems(arr.filter(Boolean));
      } else {
        Alert.alert('Error', 'Could not load expiring items.');
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      Alert.alert('Error', 'Network error.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpiring();
  }, []);

  const renderItem = ({ item }) => {
    if (!item) return null;
    return (
      <View style={styles.itemCard}>
        <View>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDate}>Expiring on: {item.expiry_date}</Text>
        </View>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.itemImage} />
        ) : (
          <Image
            source={require('../../assets/placeholder.png')}
            style={styles.itemImage}
          />
        )}
      </View>
    );
  };

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

      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.primaryAccent}
          style={{ marginTop: 50 }}
        />
      ) : (
        <FlatList
          data={Array.isArray(items) ? items.filter(Boolean) : []}
          renderItem={renderItem}
          keyExtractor={(item, index) =>
            item?.id != null ? String(item.id) : `idx-${index}`
          }
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center' }}>
              Nothing expiring in 3 days.
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  headerWrapper: { paddingHorizontal: 20, paddingVertical: 10, marginTop: 30 },
  header: { flexDirection: 'row', alignItems: 'center', position: 'relative' },
  headerTitle: {
    ...typography.header,
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  listContent: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  itemName: { color: COLORS.primary, fontSize: 16, fontWeight: '500' },
  itemDate: { color: COLORS.placeholder, marginTop: 4, fontSize: 12 },
  itemImage: { width: 40, height: 40 },
});

export default ExpiringItems;