import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack 
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ED321Eff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="index" options={{ title: "EasyBengali" }} />
      <Stack.Screen name="TestComponent" options={{ title: "EasyBengali" }} />
    </Stack>
  );
}
