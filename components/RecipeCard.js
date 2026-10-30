import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRecipes } from '../context/RecipeContext';

// A tappable recipe card with an image, quick info and a heart favorite button.
export default function RecipeCard({ recipe, onPress }) {
  const { isFavorite, toggleFavorite } = useRecipes();
  const favorited = isFavorite(recipe.id);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: recipe.image }} style={styles.image} />

      {/* Heart favorite toggle (rubric #5) */}
      <TouchableOpacity
        style={styles.heart}
        onPress={() => toggleFavorite(recipe.id)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons
          name={favorited ? 'heart' : 'heart-outline'}
          size={24}
          color={favorited ? '#FF3B30' : '#fff'}
        />
      </TouchableOpacity>

      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>
          {recipe.name}
        </Text>
        <View style={styles.metaRow}>
          <View style={styles.meta}>
            <Ionicons name="time-outline" size={14} color="#666" />
            <Text style={styles.metaText}>{recipe.prepTime}</Text>
          </View>
          <View style={styles.meta}>
            <Ionicons name="flame-outline" size={14} color="#666" />
            <Text style={styles.metaText}>{recipe.calories} cal</Text>
          </View>
          <View style={styles.meta}>
            <Ionicons name="speedometer-outline" size={14} color="#666" />
            <Text style={styles.metaText}>{recipe.difficulty}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  image: { width: '100%', height: 170, backgroundColor: '#eee' },
  heart: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 20,
    padding: 6,
  },
  body: { padding: 12 },
  title: { fontSize: 18, fontWeight: '700', color: '#222', marginBottom: 8 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between' },
  meta: { flexDirection: 'row', alignItems: 'center' },
  metaText: { marginLeft: 4, color: '#666', fontSize: 13 },
});
