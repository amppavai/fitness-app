import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Home() {
  return (
      <View style={styles.container}>
        <Text style={styles.greeting}>WELCOME TO YOUR FITNESS APP</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold"
  },
  
});