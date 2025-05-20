import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppText from '../../../components/textWrapper';
import COLORS from '../../../theme/colors';

const PasswordInput = ({
  value,
  onChangeText,
  visible,
  toggleVisibility,
  label = 'Password',
}) => {
