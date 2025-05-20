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
<Image source={require('../../../../assets/fridget.png')} style={styles.logo} resizeMode="contain" />
<FridgeCodeInput value={code} onChangeText={setCode} />
<PasswordInput
  value={password}
  onChangeText={setPassword}
  visible={passwordVisible}
  toggleVisibility={togglePasswordVisibility}
/>
<TouchableOpacity
  style={styles.connectButton}
  activeOpacity={0.8}
  onPress={handleConnect}
>
  <AppText style={styles.connectButtonText}>Connect</AppText>
</TouchableOpacity>
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
    marginBottom: 10,
  },
  connectButton: {
    backgroundColor: COLORS.primaryAccent,
    width: '90%',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  connectButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
