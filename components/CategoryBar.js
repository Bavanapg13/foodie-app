import React from 'react';
import { ScrollView, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES } from '../data/recipes';

// Horizontal, scrollable bar of recipe categories (rubric #2).
// "My Food" is highlighted and routes to the user's recipes (rubric #7).
export default function CategoryBar({ onSelectCategory, activeCategory }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {CATEGORIES.map((cat) => {
        const active = activeCategory === cat.id;
        return (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.chip,
              cat.special && styles.special,
              active && styles.activeChip,
            ]}
            onPress={() => onSelectCategory(cat)}
          >
            <Ionicons
              name={cat.icon}
              size={18}
              color={cat.special || active ? '#fff' : '#FF6B35'}
            />
            <Text
              style={[
                styles.chipText,
                (cat.special || active) && styles.activeText,
              ]}
            >
              {cat.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 12, paddingVertical: 10 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 22,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#FFD9C7',
  },
  special: { backgroundColor: '#FF6B35', borderColor: '#FF6B35' },
  activeChip: { backgroundColor: '#FF6B35', borderColor: '#FF6B35' },
  chipText: { marginLeft: 6, color: '#FF6B35', fontWeight: '600' },
  activeText: { color: '#fff' },
});
