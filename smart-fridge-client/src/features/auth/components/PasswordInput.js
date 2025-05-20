import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppText from '../../../components/textWrapper';
import COLORS from '../../../theme/colors';

const PasswordInput = ({
  value,
  onChangeText,
  visible,
  toggleVisibility,
  label = 'Password',
}) => {
    <View style={styles.inputGroup}>
  <AppText style={styles.label}>{label}</AppText>
<View style={styles.passwordContainer}>
  <TextInput
    placeholder="********"
    placeholderTextColor={COLORS.placeholder}
    secureTextEntry={!visible}
    autoCapitalize="none"
    value={value}
    onChangeText={onChangeText}
    style={styles.input}
  />
  <TouchableOpacity onPress={toggleVisibility}>
    <Ionicons
      name={visible ? 'eye-off-outline' : 'eye-outline'}
      size={20}
      color={COLORS.primaryAccent}
    />
  </TouchableOpacity>
</View>

