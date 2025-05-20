import { View, Text, TextInput, StyleSheet } from 'react-native';
import COLORS from '../../../theme/colors';
const FormInput = ({ label, value, onChangeText, placeholder, keyboardType = 'default' }) => {
return (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={COLORS.placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />
  </View>
);
