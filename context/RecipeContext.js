
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { RECIPES } from '../data/recipes';

const RecipeContext = createContext();

const FAVORITES_KEY = '@foodie_favorites';
const MY_RECIPES_KEY = '@foodie_my_recipes';

export function RecipeProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [myRecipes, setMyRecipes] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load saved data when the app starts
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const values = await AsyncStorage.multiGet([
          FAVORITES_KEY,
          MY_RECIPES_KEY,
        ]);

        const savedFavorites = values[0][1];
        const savedRecipes = values[1][1];

        if (savedFavorites !== null) {
          const parsedFavorites = JSON.parse(savedFavorites);
          if (Array.isArray(parsedFavorites)) {
            setFavorites(parsedFavorites);
          }
        }

        if (savedRecipes !== null) {
          const parsedRecipes = JSON.parse(savedRecipes);
          if (Array.isArray(parsedRecipes)) {
            setMyRecipes(parsedRecipes);
          }
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
      } finally {
        setIsHydrated(true);
      }
    };

    loadSavedData();
  }, []);

  // Save favorites whenever they change
  useEffect(() => {
    if (!isHydrated) return;

    AsyncStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(favorites)
    ).catch(error =>
      console.error('Error saving favorites:', error)
    );
  }, [favorites, isHydrated]);

  // Save user recipes whenever they change
  useEffect(() => {
    if (!isHydrated) return;

    AsyncStorage.setItem(
      MY_RECIPES_KEY,
      JSON.stringify(myRecipes)
    ).catch(error =>
      console.error('Error saving recipes:', error)
    );
  }, [myRecipes, isHydrated]);

  // Add or remove a favorite
  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const isFavorite = (id) => favorites.includes(id);

  // Add a new recipe
  const addRecipe = (recipe) => {
    const newRecipe = {
      ...recipe,
      id: 'user-' + Date.now(),
      category: 'my-food',
      isUserRecipe: true,
    };

    setMyRecipes(prev => [newRecipe, ...prev]);

    return newRecipe;
  };

  // Update an existing recipe
  const updateRecipe = (id, updates) => {
    setMyRecipes(prev =>
      prev.map(recipe =>
        recipe.id === id
          ? { ...recipe, ...updates }
          : recipe
      )
    );
  };

  // Delete a recipe
  const deleteRecipe = (id) => {
    setMyRecipes(prev =>
      prev.filter(recipe => recipe.id !== id)
    );

    setFavorites(prev =>
      prev.filter(favoriteId => favoriteId !== id)
    );
  };

  // Combine built-in and user-created recipes
  const allRecipes = [...myRecipes, ...RECIPES];

  const getRecipeById = (id) =>
    allRecipes.find(recipe => recipe.id === id);

  const getRecipesByCategory = (categoryId) =>
    allRecipes.filter(
      recipe => recipe.category === categoryId
    );

  const favoriteRecipes = allRecipes.filter(
    recipe => favorites.includes(recipe.id)
  );

  return (
    <RecipeContext.Provider
      value={{
        favorites,
        favoriteRecipes,
        myRecipes,
        allRecipes,
        isHydrated,
        toggleFavorite,
        isFavorite,
        addRecipe,
        updateRecipe,
        deleteRecipe,
        getRecipeById,
        getRecipesByCategory,
      }}
    >
      {isHydrated ? children : null}
    </RecipeContext.Provider>
  );
}

export const useRecipes = () => useContext(RecipeContext);
