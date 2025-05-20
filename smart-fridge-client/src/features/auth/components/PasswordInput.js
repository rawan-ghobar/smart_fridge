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

const styles = StyleSheet.create({
  inputGroup: {
    width: '90%',
    marginBottom: 20,
  },
  label: {
    color: COLORS.primary,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: '500',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 10,
  },

    input: {
    flex: 1,
    paddingVertical: 12,
  },
});
