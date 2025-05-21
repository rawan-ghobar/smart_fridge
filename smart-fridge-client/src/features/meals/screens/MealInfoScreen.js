import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../../theme/colors';
import typography from '../../../theme/typography';
const MealInfoScreen = ({ route, navigation }) => {
  const { mealData } = route.params;
  const { name, calories, ingredients, steps } = mealData;
return (
  <SafeAreaView style={styles.safeArea}>
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back-outline" size={24} color={COLORS.primary} />
    </TouchableOpacity>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>{name}</Text>

      <Image
        source={require('../../../../assets/fridgeeating.png')}
        style={styles.mealImage}
        resizeMode="cover"
      />

      <Text style={styles.caloriesText}>Total Calories: {calories}</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingredients:</Text>
        {ingredients?.map((item, index) => (
          <Text key={index} style={styles.listItem}>
            • {item}
          </Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Step by Step Instructions:</Text>
        {steps?.map((step, index) => (
          <Text key={index} style={styles.listItem}>
            {index + 1}. {step}
          </Text>
        ))}
      </View>
    </ScrollView>
  </SafeAreaView>
);
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
