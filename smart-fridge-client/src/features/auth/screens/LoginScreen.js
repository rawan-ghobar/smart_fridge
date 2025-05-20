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
