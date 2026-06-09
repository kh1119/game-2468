import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Platform,
  LayoutAnimation,
  UIManager,
  StatusBar as RNStatusBar
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

// Core Logic & Styling
import { colors } from './src/styles/theme';
import { initBoard, moveBoard, isGameOver, checkWinCondition, addRandomTile } from './src/utils/gameLogic';

// UI Components
import Header from './src/components/Header';
import Board from './src/components/Board';
import Controls from './src/components/Controls';
import SettingsModal from './src/components/SettingsModal';
import GameOverlay from './src/components/GameOverlay';

// Enable LayoutAnimation for Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
  // 1. Settings state
  const [mode, setMode] = useState('powersOf2'); // 'powersOf2' or 'evenSteps'
  const [gridSize, setGridSize] = useState(4); // 3x3, 4x4, 5x5
  const [themeType, setThemeType] = useState('dark'); // 'dark' or 'light'
  const [settingsVisible, setSettingsVisible] = useState(false);

  // 2. Game state
  const [board, setBoard] = useState(() => initBoard(4));
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [history, setHistory] = useState([]); // Undo history: Array of { board, score }
  
  // Game flags
  const [gameOver, setGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [keepPlaying, setKeepPlaying] = useState(false);

  // Theme definition mapping
  const activeTheme = colors[themeType] || colors.dark;

  // Key to store high score in AsyncStorage
  const getHighScoreKey = (m, g) => `@game_2468:highscore:${m}:${g}`;

  // Load configuration and high scores on mount
  useEffect(() => {
    async function loadSavedConfig() {
      try {
        const savedMode = await AsyncStorage.getItem('@game_2468:mode');
        const savedGridSize = await AsyncStorage.getItem('@game_2468:gridSize');
        const savedTheme = await AsyncStorage.getItem('@game_2468:theme');

        if (savedMode) setMode(savedMode);
        if (savedGridSize) setGridSize(parseInt(savedGridSize, 10));
        if (savedTheme) setThemeType(savedTheme);
      } catch (err) {
        console.error('Error loading config:', err);
      }
    }
    loadSavedConfig();
  }, []);

  // Update game board when mode or grid size changes
  useEffect(() => {
    resetGame(gridSize, mode);
    loadHighScore(mode, gridSize);
    saveConfig(mode, gridSize);
  }, [mode, gridSize]);

  // Save theme state
  useEffect(() => {
    AsyncStorage.setItem('@game_2468:theme', themeType);
  }, [themeType]);

  // Helper to save configuration
  const saveConfig = async (m, g) => {
    try {
      await AsyncStorage.setItem('@game_2468:mode', m);
      await AsyncStorage.setItem('@game_2468:gridSize', g.toString());
    } catch (err) {
      console.error('Error saving config:', err);
    }
  };

  // Helper to load high score for specific settings
  const loadHighScore = async (m, g) => {
    try {
      const key = getHighScoreKey(m, g);
      const savedScore = await AsyncStorage.getItem(key);
      if (savedScore) {
        setHighScore(parseInt(savedScore, 10));
      } else {
        setHighScore(0);
      }
    } catch (err) {
      console.error('Error loading high score:', err);
    }
  };

  // Update high score
  const updateHighScore = async (newScore) => {
    if (newScore > highScore) {
      setHighScore(newScore);
      try {
        const key = getHighScoreKey(mode, gridSize);
        await AsyncStorage.setItem(key, newScore.toString());
      } catch (err) {
        console.error('Error saving high score:', err);
      }
    }
  };

  // Reset high score for current game mode and grid size
  const handleResetHighScore = async () => {
    try {
      const key = getHighScoreKey(mode, gridSize);
      await AsyncStorage.removeItem(key);
      setHighScore(0);
    } catch (err) {
      console.error('Error resetting high score:', err);
    }
  };

  // Reset or Start New Game
  const resetGame = (size = gridSize, currentMode = mode) => {
    animateLayout();
    setBoard(initBoard(size));
    setScore(0);
    setHistory([]);
    setGameOver(false);
    setHasWon(false);
    setKeepPlaying(false);
  };

  // Trigger smooth layout animations
  const animateLayout = () => {
    try {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    } catch (err) {
      // Gracefully ignore layout animation crashes (e.g. on web or simulator issues)
    }
  };

  // Handle Board Moves
  const handleMove = (direction) => {
    // If the game is already over or won (and not continuing), don't allow moves
    if (gameOver || (hasWon && !keepPlaying)) return;

    const { newBoard, scoreAdded, moved } = moveBoard(board, direction, mode);

    if (moved) {
      animateLayout();

      // Save previous state to history (limit history to 5 steps to save memory)
      const currentHistory = [...history, { board: board.map(row => [...row]), score }];
      if (currentHistory.length > 5) {
        currentHistory.shift();
      }
      setHistory(currentHistory);

      // Spawn a random tile on the new board
      const boardAfterSpawn = addRandomTile(newBoard);
      setBoard(boardAfterSpawn);
      
      const newScore = score + scoreAdded;
      setScore(newScore);
      updateHighScore(newScore);

      // Check win condition (Classic target 2048, Even Steps target 2468)
      const winTarget = mode === 'evenSteps' ? 2468 : 2048;
      if (!keepPlaying && checkWinCondition(boardAfterSpawn, mode, winTarget)) {
        setHasWon(true);
      } else if (isGameOver(boardAfterSpawn, mode)) {
        setGameOver(true);
      }
    }
  };

  // Handle Undo Move
  const handleUndo = () => {
    if (history.length === 0) return;

    animateLayout();
    const prevStates = [...history];
    const prevState = prevStates.pop();

    setBoard(prevState.board);
    setScore(prevState.score);
    setHistory(prevStates);
    
    // Reset game over flag since player can continue
    setGameOver(false);
  };

  return (
    <LinearGradient
      colors={[activeTheme.bgStart, activeTheme.bgEnd]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />

      {/* Glowing Neon Blobs */}
      <View style={[styles.backgroundBlob1, { backgroundColor: themeType === 'dark' ? 'rgba(99, 102, 241, 0.16)' : 'rgba(99, 102, 241, 0.08)' }]} pointerEvents="none" />
      <View style={[styles.backgroundBlob2, { backgroundColor: themeType === 'dark' ? 'rgba(236, 72, 153, 0.12)' : 'rgba(236, 72, 153, 0.06)' }]} pointerEvents="none" />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Header */}
          <Header
            score={score}
            highScore={highScore}
            mode={mode}
            theme={activeTheme}
          />

          {/* Board Container */}
          <View style={styles.boardContainer}>
            <Board
              board={board}
              mode={mode}
              theme={activeTheme}
              onMove={handleMove}
            />

            {/* Overlays (Win / Game Over) */}
            <GameOverlay
              gameOver={gameOver}
              hasWon={hasWon}
              score={score}
              onRestart={() => resetGame(gridSize, mode)}
              onKeepPlaying={() => {
                animateLayout();
                setKeepPlaying(true);
                setHasWon(false);
              }}
              theme={activeTheme}
            />
          </View>

          {/* Controls (Undo, New Game, Settings Trigger) */}
          <Controls
            onRestart={() => resetGame(gridSize, mode)}
            onUndo={handleUndo}
            undoCount={history.length}
            onOpenSettings={() => setSettingsVisible(true)}
            theme={activeTheme}
          />

          {/* Instructional Subtext */}
          <View style={styles.instructionContainer}>
            <Text style={[styles.instructionText, { color: activeTheme.textSecondary }]}>
              Swipe to move all tiles.{' '}
              {mode === 'evenSteps'
                ? 'Merge matching tiles to climb the even numbers sequence (2 → 4 → 6 → 8 ...). Reaching 2468 wins!'
                : 'Merge matching tiles to double them (2 → 4 → 8 → 16 ...). Reaching 2048 wins!'}
            </Text>
          </View>
        </View>

        {/* Settings Modal */}
        <SettingsModal
          visible={settingsVisible}
          onClose={() => setSettingsVisible(false)}
          mode={mode}
          setMode={setMode}
          gridSize={gridSize}
          setGridSize={setGridSize}
          themeType={themeType}
          setThemeType={setThemeType}
          onResetHighScore={handleResetHighScore}
          theme={activeTheme}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  boardContainer: {
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  instructionContainer: {
    marginTop: 15,
    paddingHorizontal: 20,
    maxWidth: 450,
  },
  instructionText: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
  backgroundBlob1: {
    position: 'absolute',
    top: '12%',
    left: '-25%',
    width: 250,
    height: 250,
    borderRadius: 125,
    zIndex: 0,
    ...Platform.select({
      web: {
        filter: 'blur(75px)',
      },
      default: {
        opacity: 0.35,
      },
    }),
  },
  backgroundBlob2: {
    position: 'absolute',
    bottom: '15%',
    right: '-30%',
    width: 320,
    height: 320,
    borderRadius: 160,
    zIndex: 0,
    ...Platform.select({
      web: {
        filter: 'blur(90px)',
      },
      default: {
        opacity: 0.25,
      },
    }),
  },
});
