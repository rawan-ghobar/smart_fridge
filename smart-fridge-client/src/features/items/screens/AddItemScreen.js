import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { useAddItemForm } from '../hooks/useAddItemForm';
import FormInput from '../components/FormInput';
import ImagePickerField from '../components/ImagePickerField';
import COLORS from '../../../theme/colors';
const AddItemScreen = ({ navigation, route }) => {
  const {
    name, setName,
    quantity, setQuantity,
    unit, setUnit,
    calories, setCalories,
    expiryDate, showDatePicker,
    setShowDatePicker, handleDateChange,
    handleSave, pickImage,
    imageUri, loading,
  } = useAddItemForm(route, navigation);
return (
  <SafeAreaView style={styles.container}>
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
      <Ionicons name="arrow-back-outline" size={24} color={COLORS.primary} />
    </TouchableOpacity>
<KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView contentContainerStyle={styles.scrollView}>
<Text style={styles.title}>Add Item</Text>

<FormInput label="Name *" placeholder="e.g. Chicken breast" value={name} onChangeText={setName} />
<FormInput label="Quantity *" placeholder="e.g. 2" value={quantity} onChangeText={setQuantity} keyboardType="numeric" />
<FormInput label="Unit *" placeholder="e.g. pcs, g, ml" value={unit} onChangeText={setUnit} />
<FormInput label="Calories per unit *" placeholder="e.g. 165" value={calories} onChangeText={setCalories} keyboardType="numeric" />
<View style={styles.inputGroup}>
  <Text style={styles.label}>Expiry Date (optional)</Text>
  <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
    <Text style={{ color: expiryDate ? COLORS.text : COLORS.placeholder }}>
      {expiryDate ? moment(expiryDate).format('YYYY-MM-DD') : 'Select Date'}
    </Text>
  </TouchableOpacity>
  {showDatePicker && (
    <DateTimePicker
      value={expiryDate || new Date()}
      mode="date"
      display="default"
      onChange={handleDateChange}
    />
  )}
</View>
<ImagePickerField imageUri={imageUri} onPick={pickImage} />
<TouchableOpacity onPress={handleSave} style={styles.saveButton}>
  {loading ? (
    <ActivityIndicator color={COLORS.white} />
  ) : (
    <Text style={styles.saveText}>Save Item</Text>
  )}
</TouchableOpacity>
</ScrollView>
</TouchableWithoutFeedback>
</KeyboardAvoidingView>
</SafeAreaView>
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  backButton: {
    padding: 20,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
