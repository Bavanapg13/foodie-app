
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const API_URL =
  'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export default function ApiRecipesScreen() {
  const [search, setSearch] = useState('pasta');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRecipes = async (query) => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(
        API_URL + encodeURIComponent(query.trim())
      );

      if (!response.ok) {
        throw new Error('Unable to connect to recipe API.');
      }

      const data = await response.json();

      setRecipes(data.meals || []);

    } catch (err) {
      setError('Could not load recipes. Check your internet connection.');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes('pasta');
  }, []);

  const renderRecipe = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.strMealThumb }}
        style={styles.image}
      />

      <View style={styles.details}>
        <Text style={styles.name}>{item.strMeal}</Text>

        <Text style={styles.category}>
          {item.strCategory || 'Recipe'}
        </Text>

        <Text style={styles.area}>
          Cuisine: {item.strArea || 'Not specified'}
        </Text>

        <Text style={styles.apiLabel}>
          Fetched from TheMealDB API
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Explore Recipes</Text>

      <Text style={styles.subtitle}>
        Discover recipes from around the world
      </Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search recipes..."
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={() => fetchRecipes(search)}
          returnKeyType="search"
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => fetchRecipes(search)}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#FF6B35"
          style={styles.loader}
        />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : recipes.length === 0 ? (
        <Text style={styles.empty}>
          No recipes found. Try another search.
        </Text>
      ) : (
        <>
          <Text style={styles.resultCount}>
            {recipes.length} recipes found
          </Text>

          <FlatList
            data={recipes}
            keyExtractor={(item) => item.idMeal}
            renderItem={renderRecipe}
            contentContainerStyle={styles.list}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F3',
    padding: 16,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  subtitle: {
    color: '#777',
    marginTop: 5,
    marginBottom: 18,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
  },
  searchButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 40,
  },
  resultCount: {
    fontWeight: '600',
    marginBottom: 10,
    color: '#555',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 190,
  },
  details: {
    padding: 13,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  category: {
    color: '#FF6B35',
    marginTop: 5,
  },
  area: {
    color: '#777',
    marginTop: 4,
  },
  apiLabel: {
    color: '#16833B',
    fontSize: 12,
    marginTop: 8,
  },
  error: {
    color: 'red',
    marginTop: 20,
  },
  empty: {
    textAlign: 'center',
    marginTop: 30,
    color: '#777',
  },
});
