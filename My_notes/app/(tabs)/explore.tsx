import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, Text } from 'react-native';
import Slider  from '../../node_modules/@react-native-community/slider';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FONT_SIZE_KEY = '@font_size';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
  const [fontSize, setFontSize] = useState<number>(16);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedFontSize = await AsyncStorage.getItem(FONT_SIZE_KEY);
        if (savedFontSize !== null) {
          setFontSize(parseFloat(savedFontSize));
        }
      } catch (error) {
        console.error('Failed to load settings.', error);
      }
    };

    loadSettings();
  }, []);

  const handleFontSizeChange = async (value: number) => {
    setFontSize(value);
    try {
      await AsyncStorage.setItem(FONT_SIZE_KEY, value.toString());
    } catch (error) {
      console.error('Failed to save settings.', error);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="settings-outline" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Settings</ThemedText>
      </ThemedView>
      <ThemedText>You can change the accessibilty settings here.</ThemedText>
      
      <View style={styles.container}>
      <Text style={[styles.label, { fontSize }]}>Sample Text</Text>
      <Text style={styles.label}>Font Size: {fontSize.toFixed(0)}</Text>
      <Slider
        style={styles.slider}
        minimumValue={12}
        maximumValue={30}
        step={1}
        value={fontSize}
        onValueChange={handleFontSizeChange}
      />
    </View>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  slider: {
    width: 300,
  },
});
