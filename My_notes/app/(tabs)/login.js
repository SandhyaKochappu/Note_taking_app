// src/screens/LoginScreen.js
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack } from 'expo-router';
import {useAuth} from "../../context/authContext";
import { useNavigation } from '@react-navigation/native';
import FontSizeContext from '../../context/fontsize';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
const url = "http://192.168.1.112:3000/api";

export default function LoginScreen ()  { 

  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { fontSize } = useContext(FontSizeContext);
  const { login } = useAuth();
  const [loggedInUser, setLoggedInUser] = useState(null);


  //Saving the username in local storage
  useEffect(() => {
    const getStoredUsername = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername) {
        setLoggedInUser(storedUsername);
      }
    };

    getStoredUsername();
  }, []);



  const handleLogin = async () => {
    try {
      console.log(`${url}/auth/login`)
      const response = await fetch(`${url}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password }),
      });

      const data = await response.json();
      console.log(data)
      if (response.ok) {
        login(data.token);
        setLoggedInUser(username);
        await AsyncStorage.setItem('username', username);
        navigation.navigate('index');
      } else {
        Alert.alert('Login failed', data.error);
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Login failed', 'Invalid username or password');
    }
  };
  return (
    <>
      <Stack.Screen options={{ title: 'Login' }} />
      <ThemedView style={styles.container}>
      
        <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Button title="Login" onPress={handleLogin} />
      {/* <Button title="Sign Up" onPress={() => navigation.navigate('signup')} /> */}
      </ThemedView>
      </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },  
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 75,
  }
});


