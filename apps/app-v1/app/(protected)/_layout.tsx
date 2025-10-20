import { Stack } from 'expo-router'
import { Text, View } from 'react-native'

export default function ProtectedLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ padding: 8 }}>Protected Routes</Text>
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  )
}
