// Date of change: 16/05/2026 (M1 Lab Summative)

import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// ─── Coffee Menu Data ────────────────────────────────────────────────────────
const menuItems = [
  { 
    id: '1', 
    category: 'Hot Drinks',  
    name: 'Americano',   
    price: '₱120', 
    desc: 'Bold and strong black coffee brewed with espresso shots.',
    image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?auto=format&fit=crop&w=400&q=80'
  },
  { 
    id: '2', 
    category: 'Hot Drinks',  
    name: 'Cappuccino',  
    price: '₱150', 
    desc: 'Classic Italian coffee with equal parts espresso, steamed milk, and foam.',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=400&q=80'
  },
  { 
    id: '3', 
    category: 'Hot Drinks',  
    name: 'Latte',       
    price: '₱160', 
    desc: 'Smooth espresso blended with creamy steamed milk.',
    image: 'https://images.unsplash.com/photo-1593443320739-77f74939d0da?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  { 
    id: '4', 
    category: 'Cold Drinks', 
    name: 'Iced Coffee', 
    price: '₱130', 
    desc: 'Chilled brewed coffee served over ice for a refreshing kick.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  { 
    id: '5', 
    category: 'Cold Drinks', 
    name: 'Frappuccino', 
    price: '₱175', 
    desc: 'Blended iced coffee drink topped with whipped cream.',
    image: 'https://images.unsplash.com/photo-1627998691167-4dab0dfcae9f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  { 
    id: '6', 
    category: 'Dessert', 
    name: 'Brownie', 
    price: '₱35', 
    desc: 'Rich, fudgy chocolate square baked to perfection.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80'
  },
  { 
    id: '7', 
    category: 'Dessert', 
    name: 'Donut', 
    price: '₱50', 
    desc: 'Soft and fluffy glazed pastry ring.',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400&q=80'
  },
  { 
    id: '8', 
    category: 'Dessert', 
    name: 'Slice of Cake', 
    price: '₱220', 
    desc: 'Decadent multi-layered dessert with sweet frosting.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80'
  },
];

// ─── Stack Navigator Setup ───────────────────────────────────────────────────
const Stack = createNativeStackNavigator();

// ─── Home Screen (Coffee Menu) ───────────────────────────────────────────────
function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>☕ Coffee Shop Menu</Text>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            activeOpacity={0.75}
            onPress={() => navigation.navigate('Detail', { coffee: item })}
          >
            <Image source={{ uri: item.image }} style={styles.thumbnail} />
            
            <View style={styles.itemTextContainer}>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// ─── Detail Screen ───────────────────────────────────────────────────────────
function DetailScreen({ route, navigation }: any) {
  const { coffee } = route.params;

  return (
    <View style={styles.detailContainer}>
      <Image source={{ uri: coffee.image }} style={styles.detailImage} />

      <Text style={styles.detailCategory}>{coffee.category}</Text>
      <Text style={styles.detailName}>{coffee.name}</Text>
      <Text style={styles.detailPrice}>{coffee.price}</Text>
      <Text style={styles.detailDesc}>{coffee.desc}</Text>

      <TouchableOpacity
        style={styles.backButton}
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back to Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── App (Navigation Container) ─────────────────────────────────────────────
export default function App() {
  return (
    <NavigationIndependentTree>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#3E1F00' },
          headerTintColor: '#F5E6D3',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Menu"   component={HomeScreen}   options={{ title: '☕ Rainbow Coffee'}} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Coffee Details', headerLeft: () => null }} />
      </Stack.Navigator>
    </NavigationIndependentTree>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  // Home Screen
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FDF6EE',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3E1F00',
  },
  item: {
    backgroundColor: '#FFF8F2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#560ec1',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  thumbnail: {
    width: 70,
    height: 100,
    borderRadius: 8,
    marginRight: 16, 
  },
  itemTextContainer: {
    flex: 1, 
  },
  category: {
    fontSize: 12,
    color: '#6c6b6b',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3E1F00',
  },
  price: {
    fontSize: 14,
    color: '#C1440E',
    marginTop: 4,
  },

  // Detail Screen
  detailContainer: {
    flex: 1,
    padding: 28,
    backgroundColor: '#FDF6EE',
    justifyContent: 'center',
  },
  detailImage: {
    width: 240,
    height: 340,
    borderRadius: 16,
    alignSelf: 'center',
    marginBottom: 24,
    resizeMode: 'cover',
  },
  detailCategory: {
    fontSize: 13,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  detailName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3E1F00',
    marginBottom: 8,
  },
  detailPrice: {
    fontSize: 22,
    color: '#C1440E',
    fontWeight: '600',
    marginBottom: 20,
  },
  detailDesc: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 40,
  },
  backButton: {
    backgroundColor: '#3E1F00',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FDF6EE',
    fontSize: 16,
    fontWeight: '600',
  },
});