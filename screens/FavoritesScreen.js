import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RecipeCard from '../components/RecipeCard';
import { useRecipes } from '../context/RecipeContext';

// Lists every recipe the user has favorited (rubric #6).
export default function FavoritesScreen({ navigation }) {
  const { favoriteRecipes } = useRecipes();

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteRecipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={() => navigation.navigate('RecipeDetail', { id: item.id })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="heart-outline" size={60} color="#FFB59B" />
            <Text style={styles.emptyText}>No favorites yet.</Text>
            <Text style={styles.emptySub}>
              Tap the heart on any recipe to save it here.
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF6F1' },
  listContent: { padding: 16, flexGrow: 1 },
  empty: { alignItems: 'center', marginTop: 80 },
  emptyText: { fontSize: 18, fontWeight: '700', color: '#555', marginTop: 12 },
  emptySub: { color: '#999', marginTop: 4, textAlign: 'center' },
});
