import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AppText from '../../../components/textWrapper';
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import { useSignupForm } from '../hooks/useSignupForm';
import COLORS from '../../../theme/colors';
const SignupScreen = ({ navigation }) => {
  const {
    firstName, setFirstName,
    lastName, setLastName,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    passwordVisible, togglePasswordVisibility,
    confirmVisible, toggleConfirmVisibility,
    handleSignup,
  } = useSignupForm(navigation);
<Image source={require('../../../../assets/fridget.png')} style={styles.logo} resizeMode="contain" />
<EmailInput label="First Name" placeholder="John" value={firstName} onChangeText={setFirstName} />
<EmailInput label="Last Name" placeholder="Doe" value={lastName} onChangeText={setLastName} />
<EmailInput value={email} onChangeText={setEmail} />
<PasswordInput value={password} onChangeText={setPassword} visible={passwordVisible} toggleVisibility={togglePasswordVisibility} />
<PasswordInput label="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} visible={confirmVisible} toggleVisibility={toggleConfirmVisibility} />
<TouchableOpacity style={styles.signupButton} onPress={handleSignup} activeOpacity={0.8}>
  <AppText style={styles.signupButtonText}>Signup</AppText>
</TouchableOpacity>
<View style={styles.footer}>
  <AppText style={styles.footerText}>Already have an account? </AppText>
  <TouchableOpacity onPress={() => navigation.goBack()}>
    <AppText style={styles.loginLink}>Login</AppText>
  </TouchableOpacity>
</View>
const FormField = ({ label, placeholder, value, onChangeText }) => (
  <View style={styles.inputGroup}>
    <AppText style={styles.label}>{label}</AppText>
    <View style={styles.inputWrapper}>
      <AppText.Input
        placeholder={placeholder}
        placeholderTextColor={COLORS.placeholder}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
  },
  inputGroup: {
    width: '90%',
    marginBottom: 15,
  },
  label: {
    color: COLORS.primary,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  inputWrapper: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  input: {
    padding: 12,
  },
  signupButton: {
    backgroundColor: COLORS.primaryAccent,
    width: '90%',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  signupButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  footerText: {
    color: COLORS.primary,
  },
  loginLink: {
    color: COLORS.secondaryAccent,
    fontWeight: '500',
  },
});
