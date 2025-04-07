import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

export default function Home() {
  return (
    <ImageBackground style={styles.image} name="HomepageBg" source={require('../assets/HomeBG.jpg')}>
      <View style={styles.container}>
        <Text style={styles.greeting}>WELCOME TO YOUR FITNESS APP</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: '#fff'
  },
  image: {
    flex: 1
    /* width: '100%',
    height: '100%',
    aspectRatio: 0.5 */
  },
});