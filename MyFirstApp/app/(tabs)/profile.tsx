// Rainbow Coffee — Profile Screen
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, FlatList, Image } from 'react-native';
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [name, setName] = useState('Love dove');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [orderHistory, setOrderHistory] = useState<any[]>([]);
  
  // ─── Added Favorite States ───
  const [favoriteItems, setFavoriteItems] = useState<any[]>([]);

  const loadProfileAndHistory = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Load Profile Name
      const savedName = await AsyncStorage.getItem('@profile_name');
      if (savedName !== null) setName(savedName);

      // 2. Load Order History
      const storedHistory = await AsyncStorage.getItem('@order_history');
      if (storedHistory !== null) {
        setOrderHistory(JSON.parse(storedHistory));
      } else {
        setOrderHistory([]);
      }

      // 3. Load Menu Data & Favorites
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);
        
        const menuResponse = await fetch('https://raw.githubusercontent.com/adamalexisyahya-ops/Rainbow-Coffee/main/menu.json', { signal: controller.signal });
        clearTimeout(timeoutId);

        const storedFavIdsStr = await AsyncStorage.getItem('user_favorites');
        
        if (menuResponse.ok && storedFavIdsStr) {
          const allMenuItems = await menuResponse.json();
          const favIds: string[] = JSON.parse(storedFavIdsStr);
          const userFavs = allMenuItems.filter((item: any) => favIds.includes(item.id));
          setFavoriteItems(userFavs);
        } else {
          setFavoriteItems([]);
        }
      } catch (netError) {
        console.log("Network sync deferred, operating in offline fallback mode:", netError);
      }

    } catch (e) {
      console.error(e);
      setError('Failed to synchronize profile storage.');
    } finally {
      setLoading(false);
    }
  };

  // Reload history and favorites dynamically whenever user views the profile tab
  useFocusEffect(
    useCallback(() => {
      loadProfileAndHistory();
    }, [])
  );

  const handleSaveProfile = async () => {
    try {
      await AsyncStorage.setItem('@profile_name', name);
      Alert.alert("Success", "Profile name updated!");
    } catch (e) {
      console.error("Failed to record profile name changes:", e);
    }
  };

  const handleRemoveFavorite = async (itemId: string) => {
    try {
      const storedFavIdsStr = await AsyncStorage.getItem('user_favorites');
      if (storedFavIdsStr) {
        let favIds: string[] = JSON.parse(storedFavIdsStr);
        favIds = favIds.filter(id => id !== itemId);
        
        await AsyncStorage.setItem('user_favorites', JSON.stringify(favIds));
        setFavoriteItems(prev => prev.filter(item => item.id !== itemId));
      }
    } catch (e) {
      console.error("Error removing favorite: ", e);
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
        <TouchableOpacity style={styles.retryButton} onPress={loadProfileAndHistory}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const lastOrder = orderHistory[0];

  return (
    <FlatList
      data={orderHistory}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingBottom: 40 }}
      style={{ backgroundColor: '#FDF6EE' }}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
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

          <Text style={styles.email}>Enjoy your coffee!☕</Text>

          <View style={styles.card}>
            <Text style={styles.label}>Member Since</Text>
            <Text style={styles.value}>January 2024</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Total Orders</Text>
            <Text style={styles.value}>{orderHistory.length}</Text>
          </View>

          {/* ─── Favorites Section ─── */}
          <Text style={styles.sectionTitle}>❤️ Favorite Drinks</Text>
          {favoriteItems.length > 0 ? (
            <FlatList
              horizontal
              data={favoriteItems}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.favoritesScroll}
              renderItem={({ item }) => (
                <View style={styles.favCard}>
                  <Image source={{ uri: item.image }} style={styles.favImage} />
                  <Text style={styles.favName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.favPrice}>₱{item.price}</Text>
                  <TouchableOpacity 
                    style={styles.unfavButton} 
                    onPress={() => handleRemoveFavorite(item.id)}
                  >
                    <Text style={styles.unfavButtonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          ) : (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>No favorited drinks yet.</Text>
            </View>
          )}

          {/* ─── Last Order Section ─── */}
          <Text style={styles.sectionTitle}>🎯 Last Order</Text>
          {lastOrder ? (
            <View style={styles.lastOrderCard}>
              <Text style={styles.orderDate}>{lastOrder.date}</Text>
              {lastOrder.items.map((item: any, index: number) => (
                <Text key={index} style={styles.orderItemText}>
                  • {item.name} x{item.quantity} (₱{item.price * item.quantity})
                </Text>
              ))}
              <Text style={styles.orderTotal}>Total Paid: ₱{lastOrder.total}</Text>
            </View>
          ) : (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>No recent orders found.</Text>
            </View>
          )}

          {/* ─── Order History Title Header (Clear All Removed) ─── */}
          <View style={styles.historyHeaderRow}>
            <Text style={styles.historySectionTitle}>📜 Order History</Text>
          </View>
          
          {orderHistory.length === 0 && (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>Your complete history is empty.</Text>
            </View>
          )}
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.historyCard}>
          <View style={styles.historyCardHeader}>
            <Text style={styles.historyDate}>{item.date}</Text>
            <Text style={styles.historyTotal}>₱{item.total}</Text>
          </View>
          <Text style={styles.historyDetails} numberOfLines={1}>
            {item.items.map((i: any) => `${i.name} (x${i.quantity})`).join(', ')}
          </Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDF6EE' },
  headerContainer: { alignItems: 'center', paddingTop: 40 },
  center: { justifyContent: 'center', alignItems: 'center' },
  avatar: { fontSize: 64, marginBottom: 12, marginTop: 40 },
  inputHeaderLabel: { fontSize: 11, fontWeight: 'bold', color: '#888', alignSelf: 'flex-start', marginLeft: '10%', marginBottom: 4 },
  nameInput: { width: '80%', backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, fontSize: 16, color: '#3E1F00', fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  saveProfileBtn: { backgroundColor: '#3E1F00', width: '80%', paddingVertical: 10, borderRadius: 6, alignItems: 'center', marginBottom: 20 },
  saveBtnText: { color: '#f2e5ab', fontWeight: 'bold' },
  email: { fontSize: 14, color: '#666', fontStyle: 'italic', marginBottom: 24 },
  card: { width: '80%', backgroundColor: '#FFF8F2', padding: 16, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, borderWidth: 1, borderColor: '#E6D7C3' },
  label: { fontSize: 14, color: '#555', fontWeight: '500' },
  value: { fontSize: 14, color: '#3E1F00', fontWeight: 'bold' },
  
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#3E1F00', alignSelf: 'flex-start', marginLeft: '10%', marginTop: 20, marginBottom: 10 },
  
  historyHeaderRow: { 
    flexDirection: 'row', 
    justifyContent: 'flex-start', // Aligns header back beautifully to the left edge
    alignItems: 'center',
    width: '100%', 
    paddingHorizontal: '10%',
    marginTop: 20, 
    marginBottom: 10 
  },
  historySectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#3E1F00' },
  
  lastOrderCard: { width: '80%', backgroundColor: '#fff', padding: 16, borderRadius: 8, borderWidth: 1, borderColor: '#396535', marginBottom: 10 },
  orderDate: { fontSize: 12, color: '#555', fontWeight: 'bold', marginBottom: 6 },
  orderItemText: { fontSize: 14, color: '#222', marginBottom: 2 },
  orderTotal: { fontSize: 15, fontWeight: 'bold', color: '#396535', marginTop: 8, textAlign: 'right' },
  emptyCard: { width: '80%', backgroundColor: '#FFF8F2', padding: 16, borderRadius: 8, alignItems: 'center', borderStyle: 'dashed', borderWidth: 1, borderColor: '#ccc', marginBottom: 10 },
  emptyText: { color: '#888', fontStyle: 'italic' },
  historyCard: { width: '80%', backgroundColor: '#FFF8F2', padding: 14, borderRadius: 8, alignSelf: 'center', marginBottom: 8, borderWidth: 1, borderColor: '#E6D7C3' },
  historyCardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  historyDate: { fontSize: 13, color: '#555', fontWeight: '500' },
  historyTotal: { fontSize: 14, fontWeight: 'bold', color: '#C1440E' },
  historyDetails: { fontSize: 13, color: '#777' },
  
  errorText: { color: 'red', fontSize: 16, textAlign: 'center', fontWeight: '500', marginBottom: 15 },
  retryButton: { backgroundColor: '#3E1F00', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 6 },
  retryButtonText: { color: '#FDF6EE', fontWeight: 'bold' },

  favoritesScroll: { paddingLeft: '10%', paddingRight: 10, marginBottom: 10 },
  favCard: { width: 110, backgroundColor: '#FFF8F2', borderRadius: 8, padding: 8, marginRight: 12, borderWidth: 1, borderColor: '#E6D7C3', alignItems: 'center' },
  favImage: { width: 90, height: 90, borderRadius: 6, marginBottom: 6 },
  favName: { fontSize: 13, fontWeight: '600', color: '#3E1F00', textAlign: 'center', width: '100%' },
  favPrice: { fontSize: 12, color: '#C1440E', marginBottom: 6, fontWeight: '500' },
  unfavButton: { backgroundColor: '#8a0a0a', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 4, width: '100%', alignItems: 'center' },
  unfavButtonText: { color: '#fff', fontSize: 10, fontWeight: 'bold' }
});