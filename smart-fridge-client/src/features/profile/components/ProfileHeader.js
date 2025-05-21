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
