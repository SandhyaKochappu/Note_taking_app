import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import FontSizeContext from '../../context/fontsize';
import { useNavigation } from '@react-navigation/native';
import {useAuth} from "../../context/authContext";

const url = "http://192.168.1.112:3000/api";

const SignUpScreen = () => {
  const { fontSize } = useContext(FontSizeContext);
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    try {
      const response = await fetch(`${url}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username:username, password:password }),
      });

      const data = await response.json();
      if (response.ok) {  
        Alert.alert('Registration successful', 'You can now log in');
        navigation.navigate('Login');
      } else {
        Alert.alert('Registration failed', data.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Registration failed', 'An unexpected error occurred.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title,{ fontSize }]}>Sign Up</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TextInput
        style={[styles.input,{fontSize}]}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={[styles.input,{fontSize}]}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('login')}>
        <Text style={styles.buttonText}>Back to Login</Text>
      </TouchableOpacity>
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    //fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
