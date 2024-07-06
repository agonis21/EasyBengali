// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the Survey Quiz</Text>
      <Button
        title="Start Quiz"
        onPress={() => navigation.navigate('Quiz')}
      />
    </View>
  );
}
