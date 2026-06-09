import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';

export default function Controls({ onRestart, onUndo, undoCount, onOpenSettings, theme }) {
  const { width } = useWindowDimensions();
  const controlsWidth = Math.min(width - 32, 450);

  return (
    <View style={[styles.container, { width: controlsWidth }]}>
      {/* Undo Button */}
      <TouchableOpacity
        style={[
          styles.button,
          { 
            backgroundColor: theme.buttonBg, 
            borderColor: theme.buttonBorder,
            opacity: undoCount > 0 ? 1 : 0.4
          }
        ]}
        onPress={onUndo}
        disabled={undoCount === 0}
        activeOpacity={0.7}
      >
        <Text style={[styles.buttonIcon, { color: theme.accent }]}>⎌</Text>
        <Text style={[styles.buttonText, { color: theme.textPrimary }]}>
          Undo ({undoCount})
        </Text>
      </TouchableOpacity>

      {/* New Game Button */}
      <TouchableOpacity
        style={[
          styles.button,
          styles.primaryButton,
          { 
            backgroundColor: theme.accent, 
            borderColor: theme.accent 
          }
        ]}
        onPress={onRestart}
        activeOpacity={0.8}
      >
        <Text style={[styles.buttonIcon, styles.primaryButtonText]}>↻</Text>
        <Text style={[styles.buttonText, styles.primaryButtonText]}>New Game</Text>
      </TouchableOpacity>

      {/* Settings Button */}
      <TouchableOpacity
        style={[
          styles.iconButton,
          { 
            backgroundColor: theme.buttonBg, 
            borderColor: theme.buttonBorder 
          }
        ]}
        onPress={onOpenSettings}
        activeOpacity={0.7}
      >
        <Text style={[styles.buttonIcon, { color: theme.textPrimary, fontSize: 18 }]}>⚙</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    gap: 10,
  },
  button: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  primaryButton: {
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  iconButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonIcon: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
});
