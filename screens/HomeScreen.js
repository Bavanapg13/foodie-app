import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import CategoryBar from '../components/CategoryBar';
import RecipeCard from '../components/RecipeCard';
import { useRecipes } from '../context/RecipeContext';

// Main feed: horizontal categories on top, scrollable recipe list below.
export default function HomeScreen({ navigation }) {
  const { allRecipes } = useRecipes();

  const handleSelectCategory = (cat) => {
    if (cat.special) {
      // "My Food" -> user's own recipes (rubric #7)
      navigation.navigate('MyRecipesTab');
    } else {
      // Category chip -> recipes for that category (rubric #4)
      navigation.navigate('Category', { category: cat });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={allRecipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={() => navigation.navigate('RecipeDetail', { id: item.id })}
          />
        )}
        ListHeaderComponent={
          <View>
            <CategoryBar onSelectCategory={handleSelectCategory} />
            <Text style={styles.sectionTitle}>Popular Recipes</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF6F1' },
  listContent: { paddingHorizontal: 16, paddingBottom: 24 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#222',
    marginVertical: 12,
  },
});
