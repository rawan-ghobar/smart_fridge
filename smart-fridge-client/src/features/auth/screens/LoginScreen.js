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
