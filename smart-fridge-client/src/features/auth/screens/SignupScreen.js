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
