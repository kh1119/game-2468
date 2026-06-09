import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Text, useWindowDimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getTileColors, getTileTextColor } from '../styles/theme';

// An individual Tile component with pop-up animation and 3D glass sheen
const Tile = ({ value, mode, cellSize, gapSize }) => {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    scaleAnim.setValue(0.8);
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 110,
      useNativeDriver: true,
    }).start();
  }, [value, scaleAnim]);

  if (value === 0) return null;

  const fontScale = value > 999 ? 0.35 : value > 99 ? 0.45 : value > 9 ? 0.55 : 0.65;
  const fontSize = cellSize * fontScale;
  const borderRadius = cellSize * 0.16;

  return (
    <Animated.View
      style={[
        styles.tileContainer,
        {
          width: cellSize,
          height: cellSize,
          borderRadius: borderRadius,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <LinearGradient
        colors={getTileColors(value, mode)}
        style={[styles.tileGradient, { borderRadius }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Glass sheen overlay (Top half lighter highlight for 3D effect) */}
        <View
          style={[
            styles.glossOverlay,
            {
              borderTopLeftRadius: borderRadius,
              borderTopRightRadius: borderRadius,
            },
          ]}
        />
        
        <Text
          style={[
            styles.tileText,
            {
              color: getTileTextColor(value, mode),
              fontSize,
              fontWeight: '900',
            },
          ]}
        >
          {value}
        </Text>
      </LinearGradient>
    </Animated.View>
  );
};

export default function Board({ board, mode, theme, onMove }) {
  const { width } = useWindowDimensions();
  
  const containerWidth = Math.min(width - 32, 450);
  const size = board.length;
  const gapSize = size === 3 ? 12 : size === 4 ? 10 : 8;
  const totalGaps = gapSize * (size + 1);
  const cellSize = (containerWidth - totalGaps) / size;

  // Swipe detection coordinates
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });
  const SWIPE_THRESHOLD = 35; 
  const SWIPE_TIME_LIMIT = 500; 

  const handleTouchStart = (e) => {
    const { pageX, pageY } = e.nativeEvent;
    touchStartRef.current = { x: pageX, y: pageY, time: Date.now() };
  };

  const handleTouchEnd = (e) => {
    const { pageX, pageY } = e.nativeEvent;
    const start = touchStartRef.current;
    const duration = Date.now() - start.time;

    if (duration > SWIPE_TIME_LIMIT) return;

    const dx = pageX - start.x;
    const dy = pageY - start.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (Math.max(absDx, absDy) < SWIPE_THRESHOLD) return;

    if (absDx > absDy) {
      if (dx > 0) onMove('RIGHT');
      else onMove('LEFT');
    } else {
      if (dy > 0) onMove('DOWN');
      else onMove('UP');
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          width: containerWidth,
          height: containerWidth,
          padding: gapSize,
          borderRadius: 20,
          backgroundColor: theme.cardBg,
          borderColor: theme.cardBorder,
          shadowColor: theme.accent, // Neon shadow matching active theme
        },
      ]}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background grid cells */}
      {board.map((row, rIdx) => (
        <View key={`row-bg-${rIdx}`} style={[styles.row, { marginBottom: rIdx < size - 1 ? gapSize : 0 }]}>
          {row.map((_, cIdx) => (
            <View
              key={`cell-bg-${rIdx}-${cIdx}`}
              style={[
                styles.emptyCell,
                {
                  width: cellSize,
                  height: cellSize,
                  borderRadius: cellSize * 0.16,
                  backgroundColor: theme.emptyCell,
                  marginRight: cIdx < size - 1 ? gapSize : 0,
                },
              ]}
            />
          ))}
        </View>
      ))}

      {/* Floating active tiles */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View style={{ padding: gapSize }}>
          {board.map((row, rIdx) => (
            <View key={`row-tiles-${rIdx}`} style={[styles.row, { marginBottom: rIdx < size - 1 ? gapSize : 0 }]}>
              {row.map((val, cIdx) => (
                <View
                  key={`tile-container-${rIdx}-${cIdx}`}
                  style={{
                    width: cellSize,
                    height: cellSize,
                    marginRight: cIdx < size - 1 ? gapSize : 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {val > 0 && (
                    <Tile
                      value={val}
                      mode={mode}
                      cellSize={cellSize}
                      gapSize={gapSize}
                    />
                  )}
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCell: {
    opacity: 0.9,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.02)',
  },
  tileContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.22,
    shadowRadius: 6,
    elevation: 5,
  },
  tileGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  glossOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '46%',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  tileText: {
    textAlign: 'center',
    fontFamily: 'System',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1.5 },
    textShadowRadius: 3,
  },
});
