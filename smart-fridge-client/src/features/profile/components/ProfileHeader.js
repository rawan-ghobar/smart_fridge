import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import COLORS from '../../../theme/colors';
import typography from '../../../theme/typography';
const ProfileHeader = ({ avatar, name, email }) => (
  <View style={styles.headerContainer}>
    <Image source={avatar} style={styles.avatar} />
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.email}>{email}</Text>
  </View>
);
const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
    avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.primaryAccent,

