import React from 'react';
import { Text as DefaultText } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import Routes from './src/routes/routes';

const fetchFonts = () => {
  return Font.loadAsync({
    'Outfit-Regular': require('./assets/fonts/Outfit/static/Outfit-Regular.ttf'),
    'Outfit-Bold': require('./assets/fonts/Outfit/static/Outfit-Bold.ttf'),
    'Outfit-SemiBold': require('./assets/fonts/Outfit/static/Outfit-SemiBold.ttf'),
  });
};
