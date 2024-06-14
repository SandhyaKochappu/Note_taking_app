import { Tabs } from 'expo-router';
import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { View, Text, StyleSheet, Image } from 'react-native';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import {FontSizeProvider} from "../../context/fontsize";
import {AuthProvider} from "../../context/authContext";

SplashScreen.preventAutoHideAsync();

  export default function TabLayout() {
  const [appIsReady, setAppIsReady] = useState(false); //for hiding splash screen
  const colorScheme = useColorScheme();

  //This is for setting the splash screen time
  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
      } 
      catch (e) {
        console.warn(e);
      } 
      finally {
        setAppIsReady(true);
      }
    }prepare();
  }, 
  []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      //Hiding splash screen
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <FontSizeProvider> 
      <AuthProvider> 

        <Tabs
          screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
        }}>

          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: 'Settings',
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="about"
            options={{
              title: 'About',
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'information-circle' : 'information-circle-outline'} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="login"
            options={{
              title: 'User',
              tabBarIcon: ({ color, focused }) => (
                <FontAwesome name={focused ? 'user' : 'user-o'} color={color} size={24} />
              ),
            }}
          />
          <Tabs.Screen
            name="signup"
            options={{
              title: 'SignUp',
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'person-add' : 'person-add-outline'} color={color} size={24} />
              ),
            }}
          />
        </Tabs>
      </AuthProvider>
    </FontSizeProvider>
  );

  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  text: {
    marginTop: 20,
    fontSize: 24,
  },
});
