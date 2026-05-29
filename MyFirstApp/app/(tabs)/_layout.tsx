import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; //for the icons???
//import React from 'react';

//import { HapticTab } from '@/components/haptic-tab';
//import { IconSymbol } from '@/components/ui/icon-symbol';
//import { Colors } from '@/constants/theme';
//import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  //const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#3E1F00',
        tabBarInactiveTintColor: '#a8a8a8',
        tabBarStyle: { backgroundColor: '#d2cdb7'},
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
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cafe-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cafe-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
