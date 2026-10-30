import React, { useLayoutEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import RecipeCard from '../components/RecipeCard';
import { useRecipes } from '../context/RecipeContext';

// Shows recipes belonging to a single category (rubric #4).
export default function CategoryScreen({ route, navigation }) {
  const { category } = route.params;
  const { getRecipesByCategory } = useRecipes();
  const recipes = getRecipesByCategory(category.id);

  useLayoutEffect(() => {
    navigation.setOptions({ title: category.name });
  }, [navigation, category]);

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={() => navigation.navigate('RecipeDetail', { id: item.id })}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No recipes in this category yet.</Text>
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF6F1' },
  listContent: { padding: 16 },
  empty: { textAlign: 'center', color: '#888', marginTop: 40, fontSize: 16 },
});
