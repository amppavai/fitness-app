import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={require('../assets/HomeBG.jpg')}>
        <View style={styles.overlay}>
          <Text style={styles.greeting}>WELCOME TO FITLY</Text>
          <Text style={styles.tagline}>Track your workouts. Reach your goals.</Text>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  greeting: {
    fontSize: 32,
    fontWeight: "bold",
    color: '#1DCD9F',
    textAlign: 'center',
    marginBottom: 10
  },
  tagline: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 40
  },
  button: {
    backgroundColor: '#1DCD9F',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#000000',
  },
  secondaryButton: {
    borderColor: '#1DCD9F',
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center'
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: '#1DCD9F',
  }
});