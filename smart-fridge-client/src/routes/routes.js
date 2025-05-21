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

import ChooseMealScreen from '../features/meals/screens/ChooseMealScreen';
import MealInfoScreen from '../features/meals/screens/MealInfoScreen';
import ChooseCustomizedMealScreen from '../features/meals/screens/ChooseCustomizedMealScreen';
import CustomizeMealScreen from '../features/meals/screens/CustomizeMealScreen';
import CustomizedMealInfoScreen from '../features/meals/screens/CustomizedMealInfoScreen';

const Stack = createNativeStackNavigator();
const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={BottomTabsRoutes} options={{ headerShown: false }} />
        {/* Items */}
        <Stack.Screen name="Items" component={ItemListScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddItem" component={AddItemScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ExpiringItems" component={ExpiringItemsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ConnectFridge" component={ConnectFridgeScreen} options={{ headerShown: false }} />
