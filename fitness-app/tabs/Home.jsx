import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>

      <Image style={styles.image} name="HomepageBg" source={require('../assets/HomeBG.jpg')} />
      <Text style={styles.greeting}>WELCOME TO YOUR FITNESS APP</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'center'
  },
  greeting: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",

  },
  image: {
    width: '100%',
    height: '100%',
    aspectRatio: 1
  },
});