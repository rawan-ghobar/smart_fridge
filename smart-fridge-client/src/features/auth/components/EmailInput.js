import { View, TextInput, StyleSheet } from 'react-native';
import AppText from '../../../components/textWrapper';
import COLORS from '../../../theme/colors';

const EmailInput = ({ value, onChangeText, label = 'Email' }) => {
  return (
    <View style={styles.inputGroup}>
      <AppText style={styles.label}>{label}</AppText>
      <TextInput
        placeholder="example@mail.com"
        placeholderTextColor={COLORS.placeholder}
        keyboardType="email-address"
        autoCapitalize="none"
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
};

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
    input: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
});

export default EmailInput;
