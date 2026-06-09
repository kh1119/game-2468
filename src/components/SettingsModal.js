import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, ScrollView, Alert } from 'react-native';

export default function SettingsModal({
  visible,
  onClose,
  mode,
  setMode,
  gridSize,
  setGridSize,
  themeType,
  setThemeType,
  onResetHighScore,
  theme
}) {
  const confirmResetHighScore = () => {
    // Custom cross-platform alert / confirmation
    // On web, Alert.alert can fall back to browser confirm
    if (typeof window !== 'undefined') {
      const confirmWeb = window.confirm("Reset High Scores? This will clear all high scores permanently.");
      if (confirmWeb) onResetHighScore();
    } else {
      Alert.alert(
        "Reset High Scores",
        "This will clear all high scores permanently. Are you sure?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Reset", style: "destructive", onPress: onResetHighScore }
        ]
      );
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackdrop}>
        <View style={[styles.modalContainer, { backgroundColor: theme.scoreBg, borderColor: theme.cardBorder }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>Settings</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={[styles.closeIcon, { color: theme.textSecondary }]}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            {/* 1. Game Mode Settings */}
            <View style={styles.settingSection}>
              <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Game Mode</Text>
              <View style={styles.selectorContainer}>
                {/* Powers of 2 */}
                <TouchableOpacity
                  style={[
                    styles.selectorPill,
                    mode === 'powersOf2' && { backgroundColor: theme.accent }
                  ]}
                  onPress={() => setMode('powersOf2')}
                >
                  <Text style={[
                    styles.selectorText, 
                    { color: mode === 'powersOf2' ? '#FFF' : theme.textPrimary }
                  ]}>
                    Powers of 2
                  </Text>
                  <Text style={[
                    styles.selectorSubtext,
                    { color: mode === 'powersOf2' ? 'rgba(255,255,255,0.7)' : theme.textSecondary }
                  ]}>
                    2, 4, 8, 16...
                  </Text>
                </TouchableOpacity>

                {/* Even Steps */}
                <TouchableOpacity
                  style={[
                    styles.selectorPill,
                    mode === 'evenSteps' && { backgroundColor: theme.accent }
                  ]}
                  onPress={() => setMode('evenSteps')}
                >
                  <Text style={[
                    styles.selectorText, 
                    { color: mode === 'evenSteps' ? '#FFF' : theme.textPrimary }
                  ]}>
                    Even Steps
                  </Text>
                  <Text style={[
                    styles.selectorSubtext,
                    { color: mode === 'evenSteps' ? 'rgba(255,255,255,0.7)' : theme.textSecondary }
                  ]}>
                    2, 4, 6, 8...
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* 2. Grid Size Settings */}
            <View style={styles.settingSection}>
              <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Grid Size</Text>
              <View style={styles.gridSizeContainer}>
                {[3, 4, 5].map((size) => (
                  <TouchableOpacity
                    key={`size-${size}`}
                    style={[
                      styles.sizeOption,
                      { backgroundColor: theme.buttonBg, borderColor: theme.buttonBorder },
                      gridSize === size && { backgroundColor: theme.accent, borderColor: theme.accent }
                    ]}
                    onPress={() => setGridSize(size)}
                  >
                    <Text style={[
                      styles.sizeText,
                      { color: gridSize === size ? '#FFF' : theme.textPrimary }
                    ]}>
                      {size}x{size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* 3. Theme Settings */}
            <View style={styles.settingSection}>
              <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Theme</Text>
              <View style={styles.selectorContainer}>
                {/* Dark Theme */}
                <TouchableOpacity
                  style={[
                    styles.selectorPill,
                    themeType === 'dark' && { backgroundColor: theme.accent }
                  ]}
                  onPress={() => setThemeType('dark')}
                >
                  <Text style={[
                    styles.selectorText, 
                    { color: themeType === 'dark' ? '#FFF' : theme.textPrimary, textAlign: 'center' }
                  ]}>
                    Dark Mode
                  </Text>
                </TouchableOpacity>

                {/* Light Theme */}
                <TouchableOpacity
                  style={[
                    styles.selectorPill,
                    themeType === 'light' && { backgroundColor: theme.accent }
                  ]}
                  onPress={() => setThemeType('light')}
                >
                  <Text style={[
                    styles.selectorText, 
                    { color: themeType === 'light' ? '#FFF' : theme.textPrimary, textAlign: 'center' }
                  ]}>
                    Light Mode
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* 4. Reset & Tools */}
            <View style={[styles.settingSection, { marginTop: 15, borderBottomWidth: 0 }]}>
              <TouchableOpacity
                style={[styles.resetButton, { borderColor: '#EF4444' }]}
                onPress={confirmResetHighScore}
                activeOpacity={0.7}
              >
                <Text style={styles.resetButtonText}>Reset High Scores</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Close button */}
          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: theme.accent, shadowColor: theme.accent }]}
            onPress={onClose}
          >
            <Text style={styles.saveButtonText}>Apply & Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '88%',
    maxWidth: 380,
    borderRadius: 20,
    borderWidth: 1.5,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 16,
    fontWeight: '700',
  },
  modalBody: {
    maxHeight: 350,
  },
  settingSection: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.12)',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  selectorContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 4,
    gap: 4,
  },
  selectorPill: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectorText: {
    fontSize: 13,
    fontWeight: '700',
  },
  selectorSubtext: {
    fontSize: 9,
    fontWeight: '500',
    marginTop: 2,
  },
  gridSizeContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  sizeOption: {
    flex: 1,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 14,
    fontWeight: '700',
  },
  resetButton: {
    width: '100%',
    height: 44,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '700',
  },
  saveButton: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
