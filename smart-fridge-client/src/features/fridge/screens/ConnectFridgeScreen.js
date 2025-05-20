import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AppText from '../../../components/textWrapper';
import FridgeCodeInput from '../components/FridgeCodeInput';
import PasswordInput from '../../auth/components/PasswordInput';
import { useConnectFridgeForm } from '../hooks/useConnectFridgeForm';
import COLORS from '../../../theme/colors';
const ConnectFridgeScreen = ({ navigation }) => {
  const {
    code, setCode,
    password, setPassword,
    passwordVisible, togglePasswordVisibility,
    handleConnect,
  } = useConnectFridgeForm(navigation);
