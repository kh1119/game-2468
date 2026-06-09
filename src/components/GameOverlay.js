import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';

export default function GameOverlay({ gameOver, hasWon, score, onRestart, onKeepPlaying, theme }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (gameOver || hasWon) {
      fadeAnim.setValue(0);
      slideAnim.setValue(20);
      
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          friction: 6,
          tension: 80,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [gameOver, hasWon, fadeAnim, slideAnim]);

  if (!gameOver && !hasWon) return null;

  const isWin = hasWon && !gameOver;

  return (
    <Animated.View
      style={[
        styles.overlay,
        {
          backgroundColor: isWin ? 'rgba(99, 102, 241, 0.92)' : 'rgba(15, 23, 42, 0.88)',
          opacity: fadeAnim,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.contentContainer,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={[styles.title, { color: '#FFFFFF' }]}>
          {isWin ? '🏆 Victory!' : '🎮 Game Over'}
        </Text>

        <Text style={[styles.subtitle, { color: isWin ? 'rgba(255, 255, 255, 0.9)' : theme.textSecondary }]}>
          {isWin ? 'You reached the legendary tile!' : 'No more possible moves remaining.'}
        </Text>

        <View style={styles.scoreContainer}>
          <Text style={[styles.scoreLabel, { color: isWin ? 'rgba(255, 255, 255, 0.7)' : theme.textSecondary }]}>
            FINAL SCORE
          </Text>
          <Text style={styles.scoreValue}>{score}</Text>
        </View>

        <View style={styles.buttonsContainer}>
          {isWin && (
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={onKeepPlaying}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>Keep Playing</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[
              styles.button,
              styles.primaryButton,
              { backgroundColor: isWin ? '#FFFFFF' : theme.accent }
            ]}
            onPress={onRestart}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.primaryButtonText,
              { color: isWin ? theme.accent : '#FFFFFF' }
            ]}>
              {isWin ? 'Play Again' : 'Try Again'}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    zIndex: 10,
  },
  contentContainer: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  scoreContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 14,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  scoreLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 2,
  },
  scoreValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    justifyContent: 'center',
  },
  button: {
    height: 48,
    paddingHorizontal: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 130,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  primaryButton: {},
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '800',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
