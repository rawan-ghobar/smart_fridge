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
