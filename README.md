# 🍽️ Foodie – React Native Recipe App

Final project for **React Native: Developing Android and iOS Apps** (Coursera).

Foodie lets users browse recipes by category, view full recipe details,
favorite recipes, and create/edit/delete their own recipes.

## Features (mapped to the grading rubric)

| # | Requirement | Where it lives |
|---|-------------|----------------|
| 1 | Imports into Snack Expo via "Import Git Repository" | whole repo |
| 2 | 10+ categories displayed horizontally on the main feed | `components/CategoryBar.js` |
| 3 | Recipe details: ingredients, instructions, prep time, servings, calories, difficulty | `screens/RecipeDetailScreen.js` |
| 4 | Tapping a category loads that category's recipes | `screens/CategoryScreen.js` |
| 5 | Heart icon favorites / unfavorites (toggle) | `components/RecipeCard.js`, detail screen |
| 6 | Favorites section displays favorited recipes | `screens/FavoritesScreen.js` |
| 7 | "My Food" option in the categories bar with "Add New Recipe" | `CategoryBar.js`, `MyRecipesScreen.js` |
| 8 | Add New Recipe: name, image upload, ingredients, step-by-step instructions, Save | `screens/AddRecipeScreen.js` |
| 9 | New recipe appears in "My Recipes" | `screens/MyRecipesScreen.js` |
| 10 | Tapping a My Recipe shows full details (name, image, ingredients, instructions) | `RecipeDetailScreen.js` |
| 11 | Each My Recipe has functional Edit and Delete buttons | `MyRecipesScreen.js`, `RecipeDetailScreen.js` |
| 12 | Functional back button | native stack header (`App.js`) |

## Project structure

```
foodie-app/
├── App.js                     # Navigation (tabs + stack) and providers
├── app.json
├── package.json
├── context/RecipeContext.js   # Global state: favorites + user recipes
├── data/recipes.js            # 12 categories + seed recipes
├── components/
│   ├── CategoryBar.js         # Horizontal category chips
│   └── RecipeCard.js          # Recipe card with heart favorite
└── screens/
    ├── HomeScreen.js          # Main feed
    ├── CategoryScreen.js      # Recipes by category
    ├── RecipeDetailScreen.js  # Full recipe details
    ├── FavoritesScreen.js     # Favorited recipes
    ├── MyRecipesScreen.js     # User's recipes + Add New Recipe
    └── AddRecipeScreen.js     # Add / edit recipe form
```

## How to submit (do these steps)

### 1. Push this project to GitHub
```bash
cd foodie-app
git init
git add .
git commit -m "Foodie final project"
git branch -M main
git remote add origin https://github.com/<your-username>/foodie-app.git
git push -u origin main
```
Make sure the repository is **public** (Settings → General → Danger Zone → Change visibility) so reviewers can open it.

### 2. Open it in Snack Expo
1. Go to https://snack.expo.dev
2. Click the menu → **Import git repository**.
3. Paste your repo URL: `https://github.com/<your-username>/foodie-app`
4. Wait for dependencies to install, then run it in the **Web** preview (or on your phone with Expo Go).

### 3. Submit on Coursera
Paste your **public GitHub repository link** into the assignment's "My submission" tab, then submit for peer review.

## Run locally (optional)
```bash
npm install
npx expo start
```
