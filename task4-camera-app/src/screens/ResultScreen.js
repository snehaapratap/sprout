import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { CATEGORIES } from '../utils/categories';

export default function ResultScreen({
  category,
  photo,
  match,
  foundCount,
  onContinue,
}) {
  const cat = CATEGORIES[category];
  const scale = useRef(new Animated.Value(0)).current;
  const isMatch = !!match;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();

    if (isMatch) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isMatch ? '#F0FFF0' : '#FFF8F0' },
      ]}
    >
      <Animated.View
        style={[styles.content, { transform: [{ scale }] }]}
      >
        {/* Photo */}
        <View
          style={[
            styles.photoFrame,
            {
              borderColor: isMatch ? '#4CAF50' : '#FFA500',
            },
          ]}
        >
          <Image source={{ uri: photo }} style={styles.photo} />
        </View>

        {/* Result */}
        {isMatch ? (
          <>
            <Text style={styles.successEmoji}>🎉</Text>
            <Text style={styles.successTitle}>
              You found a {match.label}!
            </Text>
            <Text style={styles.encouragement}>{match.encouragement}</Text>
            <Text style={styles.starGain}>⭐ +1 Star!</Text>
          </>
        ) : (
          <>
            <Text style={styles.tryEmoji}>🤔</Text>
            <Text style={styles.tryTitle}>
              Hmm, that doesn't look like{'\n'}
              {cat.title.toLowerCase().endsWith('s')
                ? cat.title.toLowerCase().slice(0, -1)
                : cat.title.toLowerCase()}
            </Text>
            <Text style={styles.tryText}>
              Let's keep looking! You'll find one!
            </Text>
          </>
        )}

        {/* Button */}
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: isMatch ? '#4CAF50' : '#FFA500',
            },
          ]}
          onPress={onContinue}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>
            {isMatch
              ? foundCount >= 5
                ? 'See My Collection!'
                : 'Find the Next One!'
              : 'Try Again!'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  photoFrame: {
    borderWidth: 6,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  photo: {
    width: 250,
    height: 250,
    borderRadius: 14,
  },
  successEmoji: {
    fontSize: 50,
    marginBottom: 8,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#2E4057',
    textAlign: 'center',
    marginBottom: 8,
  },
  encouragement: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: '600',
    marginBottom: 8,
  },
  starGain: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFD700',
    marginBottom: 24,
  },
  tryEmoji: {
    fontSize: 50,
    marginBottom: 8,
  },
  tryTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2E4057',
    textAlign: 'center',
    marginBottom: 8,
  },
  tryText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  button: {
    paddingHorizontal: 36,
    paddingVertical: 18,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '800',
  },
});
