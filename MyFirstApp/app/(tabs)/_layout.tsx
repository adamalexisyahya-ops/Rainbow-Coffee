// Rainbow Coffee — Tab Bar
// This sets up the three tabs at the bottom of the screen: Menu, Cart, and Profile.

import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// ─── Tab Navigator ────────────────────────────────────────────────────────────
// screenOptions sets the look of the tab bar for every tab:
//   tabBarActiveTintColor   — icon/text color when the tab is selected
//   tabBarInactiveTintColor — icon/text color when the tab is not selected
//   tabBarStyle             — background color of the tab bar
//   headerShown: false      — hides the top header bar (each screen has its own)
//
// TIP: All three tabs currently use the same icon — change each one so they
// look different from each other:
//   Menu    → "cafe-outline"
//   Cart    → "cart-outline"
//   Profile → "person-outline"
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#f2e5ab',
        tabBarInactiveTintColor: '#ffffff',
        tabBarStyle: { backgroundColor: '#1a1713' },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cafe-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          // TIP: Change "cafe-outline" to "cart-outline" for a cart icon.
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          // TIP: Change "cafe-outline" to "person-outline" for a profile icon.
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
