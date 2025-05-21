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
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Hello {userName}!</Text>
          <Text style={styles.welcomeSubText}>How can we help you today?</Text>
        </View>
        <Image source={require('../../../../assets/happyfridge.png')} style={styles.fridgeImage} resizeMode="contain" />
        <View style={styles.buttonsContainer}>
          <OptionButton icon={<FontAwesome6 name="list-alt" size={30} color={COLORS.primary} />} label="Check available items" onPress={() => handlePress('Check Items')} />
          <OptionButton icon={<MaterialCommunityIcons name="alert-circle-outline" size={30} color={COLORS.primary} />} label="Near to expiry products" onPress={() => handlePress('Expiry Products')} />
          <OptionButton icon={<Ionicons name="dice-outline" size={30} color={COLORS.primary} />} label="Generate random meal" onPress={() => handlePress('Random Meal')} />
          <OptionButton icon={<Ionicons name="restaurant-outline" size={30} color={COLORS.primary} />} label="Generate custom meal" onPress={() => handlePress('Custom Meal')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const OptionButton = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.optionButton} onPress={onPress}>
    {icon}
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);
