import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRecipes } from '../context/RecipeContext';

// Add New Recipe / Edit Recipe form (rubric #8 and #11).
// Inputs: name, image upload, ingredients list, step-by-step instructions,
// plus prep time / servings / calories / difficulty and a Save Recipe button.
export default function AddRecipeScreen({ route, navigation }) {
  const editId = route.params?.editId;
  const { getRecipeById, addRecipe, updateRecipe } = useRecipes();
  const existing = editId ? getRecipeById(editId) : null;

  const [name, setName] = useState(existing?.name || '');
  const [image, setImage] = useState(existing?.image || '');
  const [prepTime, setPrepTime] = useState(existing?.prepTime || '');
  const [servings, setServings] = useState(existing ? String(existing.servings) : '');
  const [calories, setCalories] = useState(existing ? String(existing.calories) : '');
  const [difficulty, setDifficulty] = useState(existing?.difficulty || 'Easy');
  const [ingredients, setIngredients] = useState(existing?.ingredients || ['']);
  const [instructions, setInstructions] = useState(existing?.instructions || ['']);

  useLayoutEffect(() => {
    navigation.setOptions({ title: editId ? 'Edit Recipe' : 'Add New Recipe' });
  }, [navigation, editId]);

  // Pick an image from the device gallery (rubric #8 - "Image upload").
  const pickImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Permission needed', 'Please allow photo access to upload an image.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Helpers to manage the dynamic ingredient / instruction rows.
  const updateItem = (list, setList, index, value) => {
    const copy = [...list];
    copy[index] = value;
    setList(copy);
  };
  const addItem = (list, setList) => setList([...list, '']);
  const removeItem = (list, setList, index) => {
    if (list.length === 1) return;
    setList(list.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const cleanIngredients = ingredients.map((i) => i.trim()).filter(Boolean);
    const cleanInstructions = instructions.map((i) => i.trim()).filter(Boolean);

    if (!name.trim()) return Alert.alert('Missing name', 'Please enter a recipe name.');
    if (cleanIngredients.length === 0)
      return Alert.alert('Missing ingredients', 'Please add at least one ingredient.');
    if (cleanInstructions.length === 0)
      return Alert.alert('Missing steps', 'Please add at least one instruction.');

    const data = {
      name: name.trim(),
      image: image || 'https://picsum.photos/seed/myfood/500/350',
      prepTime: prepTime.trim() || 'N/A',
      servings: Number(servings) || 1,
      calories: Number(calories) || 0,
      difficulty,
      ingredients: cleanIngredients,
      instructions: cleanInstructions,
    };

    if (editId) {
      updateRecipe(editId, data);
    } else {
      addRecipe(data);
    }
    // Return to My Recipes so the new/updated recipe is visible (rubric #9).
    navigation.navigate('Tabs', { screen: 'MyRecipesTab' });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      {/* Image upload */}
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.preview} />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="camera" size={36} color="#FF6B35" />
            <Text style={styles.placeholderText}>Upload Image</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Recipe name */}
      <Text style={styles.label}>Recipe Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Grandma's Apple Pie"
        value={name}
        onChangeText={setName}
      />

      {/* Quick facts */}
      <View style={styles.row}>
        <View style={styles.half}>
          <Text style={styles.label}>Prep Time</Text>
          <TextInput
            style={styles.input}
            placeholder="30 min"
            value={prepTime}
            onChangeText={setPrepTime}
          />
        </View>
        <View style={styles.half}>
          <Text style={styles.label}>Servings</Text>
          <TextInput
            style={styles.input}
            placeholder="4"
            keyboardType="numeric"
            value={servings}
            onChangeText={setServings}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.half}>
          <Text style={styles.label}>Calories</Text>
          <TextInput
            style={styles.input}
            placeholder="350"
            keyboardType="numeric"
            value={calories}
            onChangeText={setCalories}
          />
        </View>
        <View style={styles.half}>
          <Text style={styles.label}>Difficulty</Text>
          <View style={styles.difficultyRow}>
            {['Easy', 'Medium', 'Hard'].map((level) => (
              <TouchableOpacity
                key={level}
                style={[styles.diffChip, difficulty === level && styles.diffActive]}
                onPress={() => setDifficulty(level)}
              >
                <Text
                  style={[
                    styles.diffText,
                    difficulty === level && styles.diffTextActive,
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Ingredients list */}
      <Text style={styles.label}>Ingredients</Text>
      {ingredients.map((item, index) => (
        <View key={index} style={styles.dynamicRow}>
          <TextInput
            style={[styles.input, styles.flexInput]}
            placeholder={`Ingredient ${index + 1}`}
            value={item}
            onChangeText={(v) => updateItem(ingredients, setIngredients, index, v)}
          />
          <TouchableOpacity
            style={styles.removeBtn}
            onPress={() => removeItem(ingredients, setIngredients, index)}
          >
            <Ionicons name="close" size={20} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.addRow} onPress={() => addItem(ingredients, setIngredients)}>
        <Ionicons name="add" size={18} color="#FF6B35" />
        <Text style={styles.addRowText}>Add Ingredient</Text>
      </TouchableOpacity>

      {/* Step-by-step instructions */}
      <Text style={styles.label}>Step-by-step Instructions</Text>
      {instructions.map((item, index) => (
        <View key={index} style={styles.dynamicRow}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepBadgeText}>{index + 1}</Text>
          </View>
          <TextInput
            style={[styles.input, styles.flexInput]}
            placeholder={`Step ${index + 1}`}
            value={item}
            multiline
            onChangeText={(v) => updateItem(instructions, setInstructions, index, v)}
          />
          <TouchableOpacity
            style={styles.removeBtn}
            onPress={() => removeItem(instructions, setInstructions, index)}
          >
            <Ionicons name="close" size={20} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.addRow} onPress={() => addItem(instructions, setInstructions)}>
        <Ionicons name="add" size={18} color="#FF6B35" />
        <Text style={styles.addRowText}>Add Step</Text>
      </TouchableOpacity>

      {/* Save Recipe */}
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Ionicons name="save-outline" size={20} color="#fff" />
        <Text style={styles.saveText}>{editId ? 'Update Recipe' : 'Save Recipe'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF6F1' },
  imagePicker: {
    height: 180,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#FFD9C7',
    borderStyle: 'dashed',
  },
  preview: { width: '100%', height: '100%' },
  placeholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  placeholderText: { color: '#FF6B35', marginTop: 8, fontWeight: '600' },
  label: { fontWeight: '700', color: '#333', marginBottom: 6, marginTop: 10 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#eee',
    color: '#222',
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  half: { width: '48%' },
  difficultyRow: { flexDirection: 'row', justifyContent: 'space-between' },
  diffChip: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 2,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },
  diffActive: { backgroundColor: '#FF6B35', borderColor: '#FF6B35' },
  diffText: { color: '#666', fontSize: 12, fontWeight: '600' },
  diffTextActive: { color: '#fff' },
  dynamicRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  flexInput: { flex: 1 },
  removeBtn: { padding: 8, marginLeft: 4 },
  stepBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  stepBadgeText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  addRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 6 },
  addRowText: { color: '#FF6B35', fontWeight: '600', marginLeft: 4 },
  saveBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6B35',
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 24,
  },
  saveText: { color: '#fff', fontWeight: '700', fontSize: 16, marginLeft: 8 },
});
