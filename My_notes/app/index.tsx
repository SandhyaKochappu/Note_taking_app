import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
// import SignupScreen from './screens/SignupScreen';
// import NotesScreen from './screens/NotesScreen';
// import AboutScreen from './screens/AboutScreen';
// import SettingsScreen from './screens/SettingsScreen';
import { AuthProvider } from '../contexts/AuthContext';

const Stack = createStackNavigator();

export default function Index() {
  return (
      <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          
          <Stack.Screen name="Login" component={LoginScreen} />
          {/* <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Notes" component={NotesScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}