import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/splashscreen.png')}
          style={styles.reactLogo}
        />
      }>
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({  
  reactLogo: {
    height: 400,
    width: 350,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
