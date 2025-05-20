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
