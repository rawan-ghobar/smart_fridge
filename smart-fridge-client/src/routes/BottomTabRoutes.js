import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '../features/home/screens/HomeScreen';
import ShoppingListScreen from '../features/shopping/screens/ShoppingListScreen';
import NotificationsScreen from '../features/notifications/screens/NotificationsScreen';
import ProfileScreen from '../features/profile/screens/ProfileScreen';
import COLORS from '../theme/colors';
import SavedMealsScreen from '../features/meals/screens/SavedMealsScreen';
const Tab = createBottomTabNavigator();
const BottomTabsRoutes = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.placeholder,
      tabBarStyle: {
        height: 100,
        paddingBottom: 10,
        paddingTop: 10,
      },
      tabBarIcon: ({ color, size }) => {
        switch (route.name) {
          case 'Home':
            return <Ionicons name="home-outline" size={size} color={color} />;
          case 'Shopping List':
            return <MaterialIcons name="list-alt" size={size} color={color} />;
          case 'Meals':
            return <Ionicons name="fast-food-outline" size={size} color={color} />;
          case 'Notifications':
            return <Ionicons name="notifications-outline" size={size} color={color} />;
          case 'Profile':
            return <Ionicons name="person-outline" size={size} color={color} />;
          default:
            return null;
        }
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Shopping List" component={ShoppingListScreen} />
    <Tab.Screen name="Meals" component={SavedMealsScreen} />
    <Tab.Screen name="Notifications" component={NotificationsScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);
