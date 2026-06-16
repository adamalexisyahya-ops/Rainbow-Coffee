// Rainbow Coffee — Root Layout
// This is the starting point of the whole app.
// It sets up the main navigation and the status bar at the top of the phone.

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

// This tells the app to open the (tabs) screen first when it launches.
export const unstable_settings = {
  anchor: '(tabs)',
};

// ─── Root Layout ─────────────────────────────────────────────────────────────
// Stack is the main navigation container. It holds the (tabs) screen group.
// Everything inside (tabs) is then handled by app/(tabs)/_layout.tsx.
// StatusBar "auto" means it adjusts to the phone's light or dark mode.
export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
