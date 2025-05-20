import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AppText from '../../../components/textWrapper';
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import { useLoginForm } from '../hooks/useLoginForm';
import COLORS from '../../../theme/colors';
const LoginScreen = ({ navigation }) => {
  const {
    email, setEmail,
    password, setPassword,
    passwordVisible,
    togglePasswordVisibility,
    handleLogin,
  } = useLoginForm(navigation);
<Image
  source={require('../../../../assets/fridget.png')}
  style={styles.logo}
  resizeMode="contain"
/>
<EmailInput value={email} onChangeText={setEmail} />
<PasswordInput value={password} onChangeText={setPassword} visible={passwordVisible} toggleVisibility={togglePasswordVisibility} />
<TouchableOpacity style={styles.loginButton} onPress={handleLogin} activeOpacity={0.8}>
  <AppText style={styles.loginButtonText}>Login</AppText>
</TouchableOpacity>
<View style={styles.footer}>
  <AppText style={styles.footerText}>Don’t have an account? </AppText>
  <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
    <AppText style={styles.signupLink}>Sign Up</AppText>
  </TouchableOpacity>
</View>
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 350,
    height: 350,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: COLORS.primaryAccent,
    width: '90%',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
