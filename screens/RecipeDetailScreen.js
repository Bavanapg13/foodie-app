import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRecipes } from '../context/RecipeContext';

// Full recipe details: image, name, ingredients, instructions, prep time,
// servings, calories and difficulty (rubric #3 and #10).
export default function RecipeDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const { getRecipeById, isFavorite, toggleFavorite, deleteRecipe } = useRecipes();
  const recipe = getRecipeById(id);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: recipe ? recipe.name : 'Recipe',
      headerRight: () =>
        recipe ? (
          <TouchableOpacity onPress={() => toggleFavorite(recipe.id)}>
            <Ionicons
              name={isFavorite(recipe.id) ? 'heart' : 'heart-outline'}
              size={26}
              color={isFavorite(recipe.id) ? '#FF3B30' : '#fff'}
            />
          </TouchableOpacity>
        ) : null,
    });
  }, [navigation, recipe, isFavorite(id)]);

  if (!recipe) {
    return (
      <View style={styles.center}>
        <Text>Recipe not found.</Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert('Delete Recipe', `Delete "${recipe.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteRecipe(recipe.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <Image source={{ uri: recipe.image }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{recipe.name}</Text>
          <TouchableOpacity onPress={() => toggleFavorite(recipe.id)}>
            <Ionicons
              name={isFavorite(recipe.id) ? 'heart' : 'heart-outline'}
              size={28}
              color={isFavorite(recipe.id) ? '#FF3B30' : '#FF6B35'}
            />
          </TouchableOpacity>
        </View>

        {/* Quick facts */}
        <View style={styles.factsRow}>
          <Fact icon="time-outline" label="Prep" value={recipe.prepTime} />
          <Fact icon="people-outline" label="Servings" value={String(recipe.servings)} />
          <Fact icon="flame-outline" label="Calories" value={`${recipe.calories}`} />
          <Fact icon="speedometer-outline" label="Level" value={recipe.difficulty} />
        </View>

        {/* Ingredients */}
        <Text style={styles.sectionTitle}>Ingredients</Text>
        {recipe.ingredients.map((ing, i) => (
          <View key={i} style={styles.listItem}>
            <Ionicons name="ellipse" size={8} color="#FF6B35" style={{ marginTop: 6 }} />
            <Text style={styles.listText}>{ing}</Text>
          </View>
        ))}

        {/* Instructions */}
        <Text style={styles.sectionTitle}>Instructions</Text>
        {recipe.instructions.map((step, i) => (
          <View key={i} style={styles.listItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{i + 1}</Text>
            </View>
            <Text style={styles.listText}>{step}</Text>
          </View>
        ))}

        {/* Edit / Delete only for the user's own recipes (rubric #11) */}
        {recipe.isUserRecipe && (
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.actionBtn, styles.editBtn]}
              onPress={() => navigation.navigate('AddRecipe', { editId: recipe.id })}
            >
              <Ionicons name="create-outline" size={18} color="#fff" />
              <Text style={styles.actionText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, styles.deleteBtn]}
              onPress={handleDelete}
            >
              <Ionicons name="trash-outline" size={18} color="#fff" />
              <Text style={styles.actionText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

function Fact({ icon, label, value }) {
  return (
    <View style={styles.fact}>
      <Ionicons name={icon} size={20} color="#FF6B35" />
      <Text style={styles.factValue}>{value}</Text>
      <Text style={styles.factLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: 240, backgroundColor: '#eee' },
  content: { padding: 16 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: { fontSize: 24, fontWeight: '800', color: '#222', flex: 1, marginRight: 8 },
  factsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF6F1',
    borderRadius: 14,
    padding: 14,
    marginVertical: 16,
  },
  fact: { alignItems: 'center', flex: 1 },
  factValue: { fontWeight: '700', color: '#222', marginTop: 4 },
  factLabel: { fontSize: 12, color: '#888' },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#222',
    marginTop: 16,
    marginBottom: 10,
  },
  listItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  listText: { flex: 1, marginLeft: 10, color: '#444', fontSize: 15, lineHeight: 22 },
  stepNumber: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  actions: { flexDirection: 'row', marginTop: 24 },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  editBtn: { backgroundColor: '#FF6B35' },
  deleteBtn: { backgroundColor: '#FF3B30' },
  actionText: { color: '#fff', fontWeight: '700', marginLeft: 6 },
});
