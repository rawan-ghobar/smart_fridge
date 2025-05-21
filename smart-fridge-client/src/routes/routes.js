import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabsRoutes from './BottomTabRoutes';

import LoginScreen from '../features/auth/screens/LoginScreen';
import SignupScreen from '../features/auth/screens/SignupScreen';

import ItemListScreen from '../features/items/screens/ItemListScreen';
import AddItemScreen from '../features/items/screens/AddItemScreen';
import ExpiringItemsScreen from '../features/items/screens/ExpiringItemsScreen';

import ConnectFridgeScreen from '../features/fridge/screens/ConnectFridgeScreen';
