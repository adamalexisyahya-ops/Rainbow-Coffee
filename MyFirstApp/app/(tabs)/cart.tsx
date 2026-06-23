// Rainbow Coffee — Cart Screen
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, TextInput, Alert } from 'react-native';
import { NavigationIndependentTree, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFocusEffect, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const parsePrice = (priceStr: string) => {
  return parseFloat(priceStr.replace('₱', '')) || 0;
};

// ─── Cart Screen ─────────────────────────────────────────────────────────────
function CartScreen() { 
  const navigation = useNavigation<any>();
  const [cartItems, setCartItems] = useState<any[]>([]);
  
  // Note State Fields
  const [noteInput, setNoteInput] = useState('');
  const [savedNote, setSavedNote] = useState('');
  const [timestamp, setTimestamp] = useState('');

  useFocusEffect(
    useCallback(() => {
      const loadCartAndNotes = async () => {
        try {
          // Load Cart Items
          const storedCart = await AsyncStorage.getItem('cart_items');
          if (storedCart) setCartItems(JSON.parse(storedCart));
          else setCartItems([]);

          // Load Saved Persistent Instruction
          const storedNoteJson = await AsyncStorage.getItem('@cart_instruction');
          if (storedNoteJson) {
            const parsedNote = JSON.parse(storedNoteJson);
            setSavedNote(parsedNote.text);
            setTimestamp(parsedNote.time);
          }
        } catch (error) {
          console.error("Error loading values: ", error);
        }
      };
      loadCartAndNotes();
    }, [])
  );

  // Persistence handler for storing notes
  const handleSaveNote = async () => {
    if (!noteInput.trim()) {
      Alert.alert("Input Needed", "Please enter a special instruction.");
      return;
    }
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const noteObject = { text: noteInput, time: timeNow };

    try {
      await AsyncStorage.setItem('@cart_instruction', JSON.stringify(noteObject));
      setSavedNote(noteInput);
      setTimestamp(timeNow);
      setNoteInput('');
      Alert.alert("Saved", "Special instruction stored successfully!");
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemoveItem = async (id: string) => {
    try {
      const updatedCart = cartItems.filter(item => item.id !== id);
      setCartItems(updatedCart);
      await AsyncStorage.setItem('cart_items', JSON.stringify(updatedCart));
    } catch (error) {
      console.error("Error removing item: ", error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (parsePrice(item.price) * item.quantity), 0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 My Cart</Text>

      {/* Special Instructions Fields (As per green task reference) */}
      <View style={styles.instructionContainer}>
        <Text style={styles.instructionLabel}>SPECIAL INSTRUCTIONS:</Text>
        <TextInput
          style={styles.inputField}
          placeholder="e.g. Extra sugar, no ice..."
          placeholderTextColor="#aaa"
          value={noteInput}
          onChangeText={setNoteInput}
        />
        <TouchableOpacity style={styles.saveNoteButton} onPress={handleSaveNote}>
          <Text style={styles.saveNoteButtonText}>Save Note</Text>
        </TouchableOpacity>

        {savedNote ? (
          <View style={styles.displayNoteBox}>
            <Text style={styles.savedNoteLabel}>LAST SAVED NOTE:</Text>
            <Text style={styles.savedNoteText}>{savedNote}</Text>
            <Text style={styles.timestampText}>Saved at {timestamp}</Text>
          </View>
        ) : null}
      </View>

      {cartItems.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ color: '#888', fontSize: 16 }}>Your cart is empty.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            style={{ width: '100%', paddingHorizontal: 20 }}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.cartThumbnail} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>{item.price} x {item.quantity}</Text>
                </View>
                <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Amount:</Text>
            <Text style={styles.totalPrice}>₱{calculateTotal()}</Text>
          </View>

          <TouchableOpacity
            style={[styles.button, { width: '90%', marginBottom: 20 }]}
            onPress={() => navigation.navigate('OrderSummary')}
          >
            <Text style={styles.buttonText}>View Order Summary</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

// ─── Order Summary Screen ─────────────────────────────────────────────────────
function OrderSummaryScreen({ navigation }: any) {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadCart = async () => {
        const storedCart = await AsyncStorage.getItem('cart_items');
        if (storedCart) setCartItems(JSON.parse(storedCart));
      };
      loadCart();
    }, [])
  );

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (parsePrice(item.price) * item.quantity), 0);
  };

  const handlePlaceOrder = async () => {
    alert("🎉 Order placed successfully!");
    await AsyncStorage.removeItem('cart_items');
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Order Summary</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        style={{ width: '100%', paddingHorizontal: 20 }}
        renderItem={({ item }) => (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>{item.name} (x{item.quantity})</Text>
            <Text style={styles.summaryText}>₱{parsePrice(item.price) * item.quantity}</Text>
          </View>
        )}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Grand Total:</Text>
        <Text style={styles.totalPrice}>₱{calculateTotal()}</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#C1440E', width: '90%', marginBottom: 10 }]}
        onPress={handlePlaceOrder}
      >
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#777', width: '90%', marginBottom: 20 }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>← Back to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationIndependentTree>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#3E1F00' },
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

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', backgroundColor: '#FDF6EE', paddingTop: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#3E1F00' },
  button: { backgroundColor: '#3E1F00', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  cartItem: { flexDirection: 'row', backgroundColor: '#FFF8F2', padding: 12, borderRadius: 10, marginBottom: 10, alignItems: 'center', elevation: 1 },
  cartThumbnail: { width: 50, height: 50, borderRadius: 6, marginRight: 12 },
  itemName: { fontSize: 16, fontWeight: '600', color: '#3E1F00' },
  itemPrice: { color: '#C1440E', marginTop: 2 },
  removeText: { color: '#ff4444', fontWeight: '600' },
  totalContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '90%', paddingVertical: 15, borderTopWidth: 1, borderTopColor: '#E6D7C3', marginTop: 10 },
  totalLabel: { fontSize: 18, fontWeight: 'bold', color: '#3E1F00' },
  totalPrice: { fontSize: 18, fontWeight: 'bold', color: '#C1440E' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#F5E6D3' },
  summaryText: { fontSize: 16, color: '#555' },
  
  // Instructions Styles
  instructionContainer: { width: '90%', marginBottom: 15 },
  instructionLabel: { fontSize: 11, fontWeight: 'bold', color: '#555', marginBottom: 4 },
  inputField: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, color: '#3E1F00', marginBottom: 8 },
  saveNoteButton: { backgroundColor: '#004d26', paddingVertical: 12, borderRadius: 5, alignItems: 'center', marginBottom: 10 },
  saveNoteButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  displayNoteBox: { backgroundColor: '#eef9f3', padding: 12, borderRadius: 5, borderWidth: 1, borderColor: '#d0ebd9', marginBottom: 5 },
  savedNoteLabel: { fontSize: 11, fontWeight: 'bold', color: '#004d26' },
  savedNoteText: { fontSize: 15, color: '#222', marginVertical: 3, fontWeight: '500' },
  timestampText: { fontSize: 11, color: '#777' }
});