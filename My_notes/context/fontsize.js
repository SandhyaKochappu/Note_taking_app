//Context for passing the fontsize as prop across the app
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FontSizeContext = createContext();

export const FontSizeProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    const loadFontSize = async () => {
      const storedFontSize = await AsyncStorage.getItem('fontSize');
      if (storedFontSize) {
        setFontSize(parseFloat(storedFontSize));
      }
    };
    loadFontSize();
  }, []);

  const saveFontSize = async (size) => {
    setFontSize(size);
    await AsyncStorage.setItem('fontSize', size.toString());
  };

  return (
    <FontSizeContext.Provider value={{ fontSize, saveFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export default FontSizeContext;
