import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// ─── Cart Screen ─────────────────────────────────────────────────────────────
function CartScreen({ navigation }: any) {
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState<{ note: string; time: string } | null>(null);

  useEffect(() => {
    loadNote();
  }, []);

  async function loadNote() {
    const raw = await AsyncStorage.getItem('orderNote');
    if (raw) {
      const parsed = JSON.parse(raw);
      setSaved(parsed);
    }
  }

  async function saveNote() {
    const order = { note: note, time: new Date().toLocaleTimeString() };
    await AsyncStorage.setItem('orderNote', JSON.stringify(order));
    setSaved(order);
    setNote('');
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Cart Screen</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('OrderSummary')}
      >
        <Text style={styles.buttonText}>View Order Summary</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Order Summary Screen ─────────────────────────────────────────────────────
function OrderSummaryScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Order Summary</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>← Back to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
// NavigationIndependentTree isolates this stack from the one in index.tsx.
// Both tabs have their own stack — they do not share or interfere with each other.
export default function App() {
  return (
    <NavigationIndependentTree>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#3d0aa3c6' },
          headerTintColor: '#F5F5F5',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Cart"         component={CartScreen}         options={{ title: '🛒 My Cart' }} />
        <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} options={{ title: 'Order Summary', headerLeft: () => null }} />
      </Stack.Navigator>
    </NavigationIndependentTree>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#49109a',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
