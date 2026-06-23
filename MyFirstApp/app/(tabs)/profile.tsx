// Rainbow Coffee — Profile Screen
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [name, setName] = useState('Love dove');

  // Load name inside profile from AsyncStorage on initialization
  useEffect(() => {
    const loadProfileName = async () => {
      try {
        const savedName = await AsyncStorage.getItem('@profile_name');
        if (savedName !== null) {
          setName(savedName);
        }
      } catch (e) {
        console.error("Failed to read profile name data:", e);
      }
    };
    loadProfileName();
  }, []);

  // Save changes locally
  const handleSaveProfile = async () => {
    try {
      await AsyncStorage.setItem('@profile_name', name);
      Alert.alert("Success", "Profile name updated!");
    } catch (e) {
      console.error("Failed to record profile name changes:", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.avatar}>👤</Text>
      
      {/* Editable Profile Name Field */}
      <Text style={styles.inputHeaderLabel}>EDIT PROFILE NAME:</Text>
      <TextInput
        style={styles.nameInput}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />
      
      <TouchableOpacity style={styles.saveProfileBtn} onPress={handleSaveProfile}>
        <Text style={styles.saveBtnText}>Save Profile Name</Text>
      </TouchableOpacity>

      <Text style={styles.email}>I love you💞</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Member Since</Text>
        <Text style={styles.value}>January 2024</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Total Orders</Text>
        <Text style={styles.value}>12</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 40, backgroundColor: '#FDF6EE' },
  avatar: { fontSize: 64, marginBottom: 12 },
  inputHeaderLabel: { fontSize: 11, fontWeight: 'bold', color: '#888', alignSelf: 'flex-start', marginLeft: '10%', marginBottom: 4 },
  nameInput: { width: '80%', backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, fontSize: 16, color: '#3E1F00', fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  saveProfileBtn: { backgroundColor: '#3E1F00', width: '80%', paddingVertical: 10, borderRadius: 6, alignItems: 'center', marginBottom: 20 },
  saveBtnText: { color: '#FDF6EE', fontWeight: 'bold' },
  email: { fontSize: 14, color: '#888', marginBottom: 30 },
  card: { width: '80%', backgroundColor: '#FFF8F2', borderRadius: 12, padding: 16, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#C1440E' },
  label: { fontSize: 12, color: '#888', textTransform: 'uppercase', letterSpacing: 1 },
  value: { fontSize: 18, fontWeight: '600', color: '#3E1F00', marginTop: 4 },
});