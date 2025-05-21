import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useUser from '../hooks/useUser';
import ProfileHeader from '../components/ProfileHeader';
import COLORS from '../../../theme/colors';
const ProfileScreen = () => {
const { user, loading } = useUser();
if (loading) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ActivityIndicator size="large" color={COLORS.primaryAccent} style={{ marginTop: 100 }} />
    </SafeAreaView>
  );
return (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <ProfileHeader avatar={user.avatar} name={user.name} email={user.email} />
      <View style={styles.actions}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="create-outline" size={20} color={COLORS.primary} />
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
          <Ionicons name="lock-closed-outline" size={20} color={COLORS.primary} />
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
