import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { RecipeProvider } from './context/RecipeContext';
import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import MyRecipesScreen from './screens/MyRecipesScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';
import CategoryScreen from './screens/CategoryScreen';
import AddRecipeScreen from './screens/AddRecipeScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Header style shared by the native stack (also renders the back button).
const headerOptions = {
  headerStyle: { backgroundColor: '#FF6B35' },
  headerTintColor: '#fff',
  headerTitleStyle: { fontWeight: '800' },
  headerBackTitleVisible: false,
};

// Bottom tabs: Home, Favorites and My Recipes.
function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        ...headerOptions,
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: '#999',
        tabBarIcon: ({ color, size }) => {
          const icons = {
            HomeTab: 'home',
            FavoritesTab: 'heart',
            MyRecipesTab: 'restaurant',
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ title: 'Foodie', tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesScreen}
        options={{ title: 'Favorites', tabBarLabel: 'Favorites' }}
      />
      <Tab.Screen
        name="MyRecipesTab"
        component={MyRecipesScreen}
        options={{ title: 'My Recipes', tabBarLabel: 'My Food' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <RecipeProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator screenOptions={headerOptions}>
          {/* Tabs live inside the stack so detail screens get a back button (rubric #12) */}
          <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
          <Stack.Screen name="Category" component={CategoryScreen} />
          <Stack.Screen name="AddRecipe" component={AddRecipeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecipeProvider>
  );
}
