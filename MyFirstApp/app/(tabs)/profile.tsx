// Rainbow Coffee — Profile Screen
// Shows the user's profile info like their name and order count.
// TIP: The info here is hardcoded (written directly in the code).
// In a real app you'd load this from a login system so every user
// sees their own name and data.

import { View, Text, StyleSheet } from 'react-native';

// ─── Profile Screen ───────────────────────────────────────────────────────────
export default function ProfileScreen() {
  return (
    <View style={styles.container}>

      {/* Profile picture — TIP: Replace this emoji with a real photo using <Image> */}
      <Text style={styles.avatar}>👤</Text>
      <Text style={styles.name}>Love dove</Text>
      <Text style={styles.email}>I love you💞</Text>

      {/* Info cards — each card shows one piece of profile info */}
      <View style={styles.card}>
        <Text style={styles.label}>Member Since</Text>
        <Text style={styles.value}>January 2024</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Total Orders</Text>
        <Text style={styles.value}>12</Text>
      </View>

      {/* TODO [VIEW ALL ORDERS]: Add an "Order History" section here.
          - Load past orders from the phone's storage.
          - Show each order with the date and total price. */}

      {/* TODO [FAVORITES]: Add a "My Favorites" section here.
          - Load saved favorite items from the phone's storage.
          - Show them as a list or a button that opens a Favorites screen. */}

    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
// TIP: The orange (#C1440E) and cream (#FDF6EE) colors are also used in index.tsx.
// Try saving colors as variables so you don't have to repeat them everywhere.
// Example:  const ORANGE = '#C1440E';
//           const CREAM  = '#FDF6EE';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    backgroundColor: '#FDF6EE',
  },
  avatar: {
    fontSize: 64,
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3E1F00',
  },
  email: {
    fontSize: 14,
    color: '#888',
    marginBottom: 30,
  },
  card: {
    width: '80%',
    backgroundColor: '#FFF8F2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#C1440E',
  },
  label: {
    fontSize: 12,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3E1F00',
    marginTop: 4,
  },
});
