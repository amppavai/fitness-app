import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

export default function Home() {
  return (

    <View style={styles.container}>
      <ImageBackground style={styles.image} name="HomepageBg" source={require('../assets/HomeBG.jpg')}>
        <Text style={styles.greeting}>WELCOME TO YOUR FITNESS APP</Text>
      </ImageBackground>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    height: '100%',
    width: '100%',
    flex: 1
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: 'white',
    margin: 10,
    marginTop: 300
     /*
    fontWeight: "bold",
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute' */
  },
  image: {
    flex: 1
    /* width: '100%',
    height: '100%',
    aspectRatio: 0.5 */
  },
});