// Rainbow Coffee — Profile Screen
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [name, setName] = useState('Love dove');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfileName = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simple network response check
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      await fetch('https://www.google.com', { mode: 'no-cors', signal: controller.signal });
      clearTimeout(timeoutId);

      const savedName = await AsyncStorage.getItem('@profile_name');
      if (savedName !== null) {
        setName(savedName);
      }
    } catch (e) {
      setError('No internet connection. Cannot synchronize profile data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfileName();
  }, []);

  const handleSaveProfile = async () => {
    try {
      await AsyncStorage.setItem('@profile_name', name);
      Alert.alert("Success", "Profile name updated!");
    } catch (e) {
      console.error("Failed to record profile name changes:", e);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#3E1F00" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center, { paddingHorizontal: 30 }]}>
        <Text style={styles.errorText}>⚠️ {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadProfileName}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.avatar}>👤</Text>
      
      <Text style={styles.inputHeaderLabel}>EDIT PROFILE NAME:</Text>
      <TextInput
        style={styles.nameInput}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        placeholderTextColor="#aaa"
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
  center: { justifyContent: 'center', alignItems: 'center' },
  avatar: { fontSize: 64, marginBottom: 12 },
  inputHeaderLabel: { fontSize: 11, fontWeight: 'bold', color: '#888', alignSelf: 'flex-start', marginLeft: '10%', marginBottom: 4 },
  nameInput: { width: '80%', backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, fontSize: 16, color: '#3E1F00', fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  saveProfileBtn: { backgroundColor: '#3E1F00', width: '80%', paddingVertical: 10, borderRadius: 6, alignItems: 'center', marginBottom: 20 },
  saveBtnText: { color: '#FDF6EE', fontWeight: 'bold' },
  email: { fontSize: 14, color: '#666', fontStyle: 'italic', marginBottom: 24 },
  card: { width: '80%', backgroundColor: '#FFF8F2', padding: 16, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, borderWidth: 1, borderColor: '#E6D7C3' },
  label: { fontSize: 14, color: '#555', fontWeight: '500' },
  value: { fontSize: 14, color: '#3E1F00', fontWeight: 'bold' },
  errorText: { color: 'red', fontSize: 16, textAlign: 'center', fontWeight: '500', marginBottom: 15 },
  retryButton: { backgroundColor: '#3E1F00', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 6 },
  retryButtonText: { color: '#FDF6EE', fontWeight: 'bold' }
});