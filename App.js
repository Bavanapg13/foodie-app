
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import { RecipeProvider } from './context/RecipeContext';

// Import screens
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import MyRecipesScreen from './screens/MyRecipesScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';
import CategoryScreen from './screens/CategoryScreen';
import AddRecipeScreen from './screens/AddRecipeScreen';
import ApiRecipesScreen from './screens/ApiRecipesScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Common header styling
const headerOptions = {
  headerStyle: {
    backgroundColor: '#FF6B35',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: '800',
  },
  headerBackTitleVisible: false,
};

// Bottom tab navigation
function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const icons = {
          HomeTab: 'home',
          FavoritesTab: 'heart',
          MyRecipesTab: 'restaurant',
          ApiRecipesTab: 'globe-outline',
          SettingsTab: 'settings-outline',
        };

        return {
          headerStyle: {
            backgroundColor: '#FF6B35',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '800',
          },
          tabBarActiveTintColor: '#FF6B35',
          tabBarInactiveTintColor: '#999',

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name={icons[route.name]}
              size={size}
              color={color}
            />
          ),
        };
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: 'Foodie',
          tabBarLabel: 'Home',
        }}
      />

      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesScreen}
        options={{
          title: 'Favorites',
          tabBarLabel: 'Favorites',
        }}
      />

      <Tab.Screen
        name="MyRecipesTab"
        component={MyRecipesScreen}
        options={{
          title: 'My Recipes',
          tabBarLabel: 'My Food',
        }}
      />

      <Tab.Screen
        name="ApiRecipesTab"
        component={ApiRecipesScreen}
        options={{
          title: 'Explore Recipes',
          tabBarLabel: 'Explore',
        }}
      />

      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
}

// Main application
export default function App() {
  return (
    <RecipeProvider>
      <NavigationContainer>
        <StatusBar style="light" />

        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={headerOptions}
        >
          {/* Authentication */}
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Login' }}
          />

          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ title: 'Create Account' }}
          />

          {/* Main tabs */}
          <Stack.Screen
            name="Tabs"
            component={Tabs}
            options={{ headerShown: false }}
          />

          {/* Recipe screens */}
          <Stack.Screen
            name="RecipeDetail"
            component={RecipeDetailScreen}
            options={{ title: 'Recipe Details' }}
          />

          <Stack.Screen
            name="Category"
            component={CategoryScreen}
            options={{ title: 'Category' }}
          />

          <Stack.Screen
            name="AddRecipe"
            component={AddRecipeScreen}
            options={{ title: 'Add Recipe' }}
          />
          <Stack.Screen
  name="ForgotPassword"
  component={ForgotPasswordScreen}
  options={{ title: 'Forgot Password' }}
/>
        </Stack.Navigator>
      </NavigationContainer>
    </RecipeProvider>
  );
}
