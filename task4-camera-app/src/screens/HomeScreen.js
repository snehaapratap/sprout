import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { CATEGORIES } from '../utils/categories';

export default function HomeScreen({ onSelectCategory }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.emoji}>🔍🌿</Text>
        <Text style={styles.title}>Nature Explorer</Text>
        <Text style={styles.subtitle}>Find 5 things around you!</Text>
        <Text style={styles.instruction}>Pick a category:</Text>

        <View style={styles.cards}>
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <TouchableOpacity
              key={key}
              style={[styles.card, { backgroundColor: cat.color }]}
              onPress={() => onSelectCategory(key)}
              activeOpacity={0.7}
            >
              <Text style={styles.cardEmoji}>{cat.emoji}</Text>
              <Text style={styles.cardTitle}>{cat.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F0F8FF',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#2E4057',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
  },
  instruction: {
    fontSize: 16,
    color: '#999',
    marginBottom: 16,
    fontWeight: '600',
  },
  cards: {
    width: '100%',
    gap: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardEmoji: {
    fontSize: 44,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2E4057',
  },
});
