import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
  ScrollView,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { CATEGORIES } from '../utils/categories';

export default function VictoryScreen({ category, foundItems, onPlayAgain }) {
  const cat = CATEGORIES[category];
  const badgeScale = useRef(new Animated.Value(0)).current;
  const gridOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    Animated.sequence([
      Animated.spring(badgeScale, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(gridOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Confetti text */}
        <Text style={styles.confetti}>🎊 🎉 🎊</Text>

        {/* Badge */}
        <Animated.View
          style={[styles.badge, { transform: [{ scale: badgeScale }] }]}
        >
          <Text style={styles.badgeEmoji}>🏆</Text>
          <Text style={styles.badgeTitle}>Nature Explorer</Text>
          <Text style={styles.badgeSubtitle}>
            {cat.title} Champion!
          </Text>
        </Animated.View>

        <Text style={styles.completeText}>
          You found all 5 {cat.title.toLowerCase()}!
        </Text>

        {/* Photo grid */}
        <Animated.View
          style={[styles.grid, { opacity: gridOpacity }]}
        >
          {foundItems.map((item, i) => (
            <View key={i} style={styles.gridItem}>
              <Image source={{ uri: item.photo }} style={styles.gridPhoto} />
              <Text style={styles.gridLabel}>{item.label}</Text>
              <Text style={styles.gridStar}>⭐</Text>
            </View>
          ))}
        </Animated.View>

        {/* Play again */}
        <TouchableOpacity
          style={styles.playAgain}
          onPress={onPlayAgain}
          activeOpacity={0.7}
        >
          <Text style={styles.playAgainText}>Play Again!</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAF0',
  },
  scroll: {
    alignItems: 'center',
    padding: 24,
    paddingBottom: 60,
  },
  confetti: {
    fontSize: 40,
    marginBottom: 16,
    letterSpacing: 10,
  },
  badge: {
    backgroundColor: '#FFD700',
    width: 180,
    height: 180,
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  badgeEmoji: {
    fontSize: 50,
    marginBottom: 4,
  },
  badgeTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#8B6914',
  },
  badgeSubtitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#A07B1A',
  },
  completeText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2E4057',
    textAlign: 'center',
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 30,
  },
  gridItem: {
    alignItems: 'center',
    width: 100,
  },
  gridPhoto: {
    width: 90,
    height: 90,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  gridLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2E4057',
    marginTop: 4,
    textAlign: 'center',
  },
  gridStar: {
    fontSize: 16,
  },
  playAgain: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 30,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  playAgainText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '800',
  },
});
