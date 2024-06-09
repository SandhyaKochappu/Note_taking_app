// src/screens/LoginScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from 'expo-router';
import {useAuth} from "../../context/authContext";

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function LoginScreen ()  { 

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState(null);
  
  const { login } = useAuth();
  const [loggedInUser, setLoggedInUser] = useState("");


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
      const response = await fetch('http://192.168.1.112:3000/api/auth/login', {
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
      <Button title="Login" onPress={handleLogin} />
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


