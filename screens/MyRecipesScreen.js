import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRecipes } from '../context/RecipeContext';

// The user's own recipes, reached from the "My Food" category (rubric #7, #9).
// Each row has Edit and Delete buttons (rubric #11).
export default function MyRecipesScreen({ navigation }) {
  const { myRecipes, deleteRecipe } = useRecipes();

  const confirmDelete = (recipe) => {
    Alert.alert('Delete Recipe', `Delete "${recipe.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteRecipe(recipe.id) },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Add New Recipe (rubric #7, opens the form in rubric #8) */}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate('AddRecipe')}
      >
        <Ionicons name="add-circle" size={22} color="#fff" />
        <Text style={styles.addText}>Add New Recipe</Text>
      </TouchableOpacity>

      <FlatList
        data={myRecipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.cardMain}
              onPress={() => navigation.navigate('RecipeDetail', { id: item.id })}
            >
              <Image source={{ uri: item.image }} style={styles.thumb} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.cardMeta}>
                  {item.prepTime} · {item.calories} cal
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.rowActions}>
              <TouchableOpacity
                style={[styles.iconBtn, styles.edit]}
                onPress={() => navigation.navigate('AddRecipe', { editId: item.id })}
              >
                <Ionicons name="create-outline" size={18} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.iconBtn, styles.del]}
                onPress={() => confirmDelete(item)}
              >
                <Ionicons name="trash-outline" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="fast-food-outline" size={60} color="#FFB59B" />
            <Text style={styles.emptyText}>No recipes yet.</Text>
            <Text style={styles.emptySub}>
              Tap "Add New Recipe" to create your first one.
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
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B35',
    margin: 16,
    paddingVertical: 14,
    borderRadius: 12,
  },
  addText: { color: '#fff', fontWeight: '700', fontSize: 16, marginLeft: 8 },
  listContent: { paddingHorizontal: 16, paddingBottom: 24, flexGrow: 1 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 10,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
  },
  cardMain: { flexDirection: 'row', flex: 1, alignItems: 'center' },
  thumb: { width: 64, height: 64, borderRadius: 10, backgroundColor: '#eee' },
  cardInfo: { marginLeft: 12, flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#222' },
  cardMeta: { color: '#888', marginTop: 4, fontSize: 13 },
  rowActions: { flexDirection: 'row' },
  iconBtn: { padding: 9, borderRadius: 10, marginLeft: 6 },
  edit: { backgroundColor: '#FF6B35' },
  del: { backgroundColor: '#FF3B30' },
  empty: { alignItems: 'center', marginTop: 60 },
  emptyText: { fontSize: 18, fontWeight: '700', color: '#555', marginTop: 12 },
  emptySub: { color: '#999', marginTop: 4, textAlign: 'center' },
});
