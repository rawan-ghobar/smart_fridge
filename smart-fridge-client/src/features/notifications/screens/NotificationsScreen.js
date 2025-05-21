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
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primaryAccent} style={styles.loader} />
      ) : (
        <FlatList
          data={notifications}
          renderItem={({ item }) => (
            <NotificationCard message={item.message} created_at={item.created_at} />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.empty}>No notifications yet.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
