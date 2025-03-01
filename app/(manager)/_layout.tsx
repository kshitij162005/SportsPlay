import { Stack } from 'expo-router';

export default function ManagerLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="courts" />
      <Stack.Screen name="bookings" />
      <Stack.Screen name="customers" />
      <Stack.Screen name="tournaments" />
    </Stack>
  );
}