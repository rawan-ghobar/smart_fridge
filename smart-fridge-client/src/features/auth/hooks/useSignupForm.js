import { useState } from 'react';
import { Alert } from 'react-native';
import api from '../../../services/api';
export const useSignupForm = (navigation) => {
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
