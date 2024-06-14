import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import FontSizeContext from '../../context/fontsize';
import Slider from '@react-native-community/slider';

const SettingsScreen = () => {
  const { fontSize, saveFontSize } = useContext(FontSizeContext);

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { fontSize }]}>Font Size</Text>
      <Slider
        style={styles.slider}
        minimumValue={10}
        maximumValue={30}
        value={fontSize}
        onValueChange={(value) => saveFontSize(value)}
      />
      <Button title="Save Settings" onPress={() => Alert.alert('Settings saved!')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    textAlign: 'center',
    marginBottom: 20,
  },
  slider: {
    marginBottom: 20,
  },
});

export default SettingsScreen;
