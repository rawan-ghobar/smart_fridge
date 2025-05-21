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
const CustomizedMealInfoScreen = ({ route, navigation }) => {
  const { mealData } = route.params;
  const { name, usercalories, ingredients, steps } = mealData;
  const ingredientsArray = Array.isArray(ingredients)
    ? ingredients
    : ingredients.split(',').map((item) => item.trim());

  const stepsArray = Array.isArray(steps)
    ? steps
    : steps.split('.').map((item) => item.trim()).filter(Boolean);
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

        <Text style={styles.caloriesText}>{usercalories} calories</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients:</Text>
          {ingredientsArray.map((item, index) => (
            <Text key={index} style={styles.listItem}>
              • {item}
            </Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Step by Step Instructions:</Text>
          {stepsArray.map((step, index) => (
            <Text key={index} style={styles.listItem}>
              {index + 1}. {step}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
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
  headerText: {
    ...typography.header,
    color: COLORS.secondaryAccent,
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  mealImage: {
    width: '50%',
    height: 200,
    borderRadius: 12,
    marginBottom: 10,
  },
