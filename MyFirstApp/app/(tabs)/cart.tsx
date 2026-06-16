// Rainbow Coffee — Cart Screen
// This is the shopping cart. It shows what the user wants to order
// and lets them go to the Order Summary before checking out.

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// ─── Cart Screen ─────────────────────────────────────────────────────────────
// This screen shows the user's cart.
// Right now it only has a button — the next step is to show the actual items.
function CartScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Cart Screen</Text>

      {/* TODO [ADD CART]: Show the items the user added from the Menu.
          - When the user taps "Add to Cart" on a menu item, save it to the phone's storage.
          - Load those saved items here and display them as a list.
          - Add a remove button for each item.
          - Show the total price at the bottom. */}

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
// This screen shows a final look at the order before the user confirms it.
function OrderSummaryScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Order Summary</Text>

      {/* TODO [VIEW ALL ORDERS]: Show the full order breakdown here.
          - List each item, its quantity, and price.
          - Show the grand total at the bottom.
          - Add a "Place Order" button that saves the order and clears the cart.
          - TIP: You can also show past orders in the Profile screen later. */}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>← Back to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Tab Entry Point ──────────────────────────────────────────────────────────
// NavigationIndependentTree gives the Cart tab its own navigation history
// so it doesn't get mixed up with the Menu or Profile tabs.
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

// ─── Styles ───────────────────────────────────────────────────────────────────
// TIP: The purple color (#49109a) doesn't match the brown coffee theme
// used in the other screens. Try changing it to '#3E1F00' to keep it consistent.
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
