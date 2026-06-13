import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

export default function StarProgress({ found, total = 5 }) {
  return (
    <View style={styles.container}>
      <View style={styles.stars}>
        {Array.from({ length: total }).map((_, i) => (
          <AnimatedStar key={i} filled={i < found} index={i} />
        ))}
      </View>
      <Text style={styles.text}>
        {found}/{total} found
      </Text>
    </View>
  );
}

function AnimatedStar({ filled, index }) {
  const scale = useRef(new Animated.Value(filled ? 1 : 0.8)).current;

  useEffect(() => {
    if (filled) {
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.4,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [filled]);

  return (
    <Animated.Text
      style={[
        styles.star,
        {
          transform: [{ scale }],
          opacity: filled ? 1 : 0.3,
        },
      ]}
    >
      ⭐
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  stars: {
    flexDirection: 'row',
    gap: 8,
  },
  star: {
    fontSize: 28,
  },
  text: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    fontWeight: '600',
  },
});
