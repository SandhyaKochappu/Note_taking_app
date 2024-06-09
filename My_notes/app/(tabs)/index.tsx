
import { Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator, TextInput, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '../../context/authContext';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import Ionicons from '@expo/vector-icons/Ionicons';

const url = "http://192.168.1.112:3000/api";

export default function HomeScreen() {
  const colorScheme = useColorScheme();

  const { token, logout } = useAuth(); //authentication details passed down as prop 
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [editingNote, setEditingNote] = useState('');
  const [editingTitle, setEditingTitle] = useState('');
  const [editingContent, setEditingContent] = useState('');

  //fetching saved notes from the database
  const fetchNotes = async () => {
    if (!token) {
      setError('User is not authenticated');
    return;
    }
  try {
      const response = await fetch(`${url}/notes`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.error);
        return;
      }
      const data = await response.json();
      setNotes(data);
    } 
    catch (error) {
      console.error(error);
      setError('Failed to fetch notes');
    }
  };

  //Adding new notes into the database
  const addNote = async () => {
    if (!newNoteTitle || !newNoteContent) {
      Alert.alert('Error', 'Please provide both a title and content for the note.');
      return;
    }

    try {
      const response = await fetch(`${url}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title:newNoteTitle, content:newNoteContent }),
      });

  const data = await response.json();
      if (response.ok) {
        setNotes([...notes, data]);
        setNewNoteTitle('');
        setNewNoteContent('');
      } 
      else {
        Alert.alert('Error', data.error);
      }
    } 
    catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to add note');
    }
  };

  //Deleting an existing note
  const deleteNote = async (noteId) => {
    try {
      const response = await fetch(`${url}/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setNotes(notes.filter((note) => note.id !== noteId));
      } 
      else {
        const data = await response.json();
        Alert.alert('Error', data.error);
      }
    } 

    catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to delete note');
    }
  };
  //editing note
  const startEditing = (note) => {
    setEditingNote(note);
    setEditingTitle(note.title);
    setEditingContent(note.content);
  };

  const saveNote = async () => {
    if (!editingTitle || !editingContent) {
      Alert.alert('Error', 'Please provide both a title and content for the note.');
      return;
    }

    try {
      const response = await fetch(`${url}/notes/${editingNote.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title: editingTitle, content: editingContent }),
      });

      const data = await response.json();
      if (response.ok) {
        setNotes(notes.map((note) => (note.id === editingNote.id ? data : note)));
        setEditingNote("");
        setEditingTitle('');
        setEditingContent('');
      } 
      else {
        Alert.alert('Error', data.error);
      }
    } 
    catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update note');
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [token]);


  return (
    <ParallaxScrollView
    headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="home-outline" style={styles.headerImage} />}>
    <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Notes</ThemedText>
      </ThemedView>
    <ThemedView style={{flex: 1}}>
    <FlatList
      data={notes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ThemedView style={styles.listContainer}>
          <ThemedText type="subtitle">{item.title}</ThemedText>
          <ThemedText >{item.content}</ThemedText>
          <View style={styles.noteActions}>
            <Button title="Edit" onPress={() => startEditing(item)} />
            <Button title="Delete" onPress={() => deleteNote(item.id)} color="red" />
          </View>
        </ThemedView>
         )}
      ListEmptyComponent={<Text style={styles.noNotes}>No notes available</Text>}
    />

    {editingNote ? ( 
      <ThemedView>
        <TextInput
          style={[styles.input]}
          placeholder="Edit Title"
          value={editingTitle}
          onChangeText={setEditingTitle}
        />
    <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Edit Content"
          value={editingContent}
          onChangeText={setEditingContent}
          multiline
        />
        <Button title="Save" onPress={saveNote}/>         
        <Button title="Cancel" onPress={() => setEditingNote("")}/>          
      </ThemedView>
      ) : (
      <ThemedView>
        <TextInput
          style={[styles.input]}
          placeholder="Note Title"
          value={newNoteTitle}
          onChangeText={setNewNoteTitle}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Note Content"
          value={newNoteContent}
          onChangeText={setNewNoteContent}
          multiline
        />
        <Button title="Add Note" onPress={addNote}/>         
      </ThemedView>
    )}

    <Button title="Logout" onPress={logout}/>    
  </ThemedView>
</ParallaxScrollView>
);
}

const styles = StyleSheet.create({
  listContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#343a40',
  },
  note: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495057',
  },
  noteContent: {
    fontSize: 14,
    color: '#6c757d',
  },
  noteActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  noNotes: {
    textAlign: 'center',
    color: '#6c757d',
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
