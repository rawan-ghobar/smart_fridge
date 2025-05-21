import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import COLORS from '../../../theme/colors';
import typography from '../../../theme/typography';

const NotificationsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const fridgeId = await AsyncStorage.getItem('fridgeId');
      if (!fridgeId) {
        Alert.alert('Error', 'Fridge ID not found.');
        setLoading(false);
        return;
      }

      const res = await api.get(`/user/getnotifications/${fridgeId}`);
      if (res.data?.success) {
        setNotifications(res.data.data);
      } else {
        Alert.alert('Error', 'Failed to load notifications.');
      }
    } catch (err) {
      console.error(err.response?.data || err.messasge);
      Alert.alert('Error', 'Network error.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.notificationCard}>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.date}>{new Date(item.created_at).toLocaleString()}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primaryAccent} style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<Text style={{ textAlign: 'center' }}>No notifications yet.</Text>}
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
  notificationCard: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  message: { color: COLORS.primary, fontSize: 16 },
  date: { color: COLORS.placeholder, fontSize: 12, marginTop: 6 },
});

export default NotificationsScreen;