import React from 'react';
import { StyleSheet, View, Text, useWindowDimensions } from 'react-native';

export default function Header({ score, highScore, mode, theme }) {
  const { width } = useWindowDimensions();
  const headerWidth = Math.min(width - 32, 450);

  return (
    <View style={[styles.container, { width: headerWidth }]}>
      {/* Title block */}
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>
          2<Text style={{ color: theme.accent }}>4</Text>6<Text style={{ color: theme.accent }}>8</Text>
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          {mode === 'evenSteps' ? 'Even Steps Mode' : 'Powers of 2 Mode'}
        </Text>
      </View>

      {/* Scores block */}
      <View style={styles.scoresContainer}>
        {/* Current Score */}
        <View style={[styles.scoreCard, { backgroundColor: theme.scoreBg, borderColor: theme.cardBorder }]}>
          <Text style={[styles.scoreLabel, { color: theme.textSecondary }]}>SCORE</Text>
          <Text style={[styles.scoreValue, { color: theme.textPrimary }]}>{score}</Text>
        </View>

        {/* High Score */}
        <View style={[styles.scoreCard, { backgroundColor: theme.scoreBg, borderColor: theme.cardBorder }]}>
          <Text style={[styles.scoreLabel, { color: theme.textSecondary }]}>BEST</Text>
          <Text style={[styles.scoreValue, { color: theme.textPrimary }]}>{highScore}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: 2,
    textShadowColor: 'rgba(99, 102, 241, 0.35)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: -2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  scoresContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  scoreCard: {
    minWidth: 75,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  scoreLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 2,
  },
  scoreValue: {
    fontSize: 18,
    fontWeight: '800',
  },
});
