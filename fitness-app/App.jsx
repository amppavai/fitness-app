import React, { useState } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar, StyleSheet, SafeAreaView } from 'react-native';

import Home from './tabs/Home';
import Workouts from './tabs/Workouts';
import Activity from './tabs/Activity';
import Progress from './tabs/Progress';
import SignUp from './components/SignUp';
import Login from './components/Login';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") iconName = "home";
          else if (route.name === "Workouts") iconName = "barbell";
          else if (route.name === "Activity") iconName = "footsteps";
          else if (route.name === "Progress") iconName = "stats-chart";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveBackgroundColor: "#222222",
        tabBarInactiveBackgroundColor: "#222222",
        tabBarActiveTintColor: "#FCF596",
        tabBarInactiveTintColor: "#1DCD9F",
        headerShown: false,
        animation: 'shift',
        tabBarStyle: { position: 'absolute' }
      })}
    >
      <Tab.Screen name="Workouts" component={Workouts} />
      <Tab.Screen name="Activity" component={Activity} />
      <Tab.Screen name="Progress" component={Progress} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isSignedIn ? (
            <>
              <Stack.Screen name="HomeScreen">
                {props => <Home {...props} />}
              </Stack.Screen>
              <Stack.Screen name="SignUp">
                {props => <SignUp {...props} setIsSignedIn={setIsSignedIn} />}
              </Stack.Screen>
              <Stack.Screen name="Login">
                {props => <Login {...props} setIsSignedIn={setIsSignedIn} />}
              </Stack.Screen>
            </>
          ) : (
            <Stack.Screen name="Workouts" component={TabNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222',
    color: 'white'
  }
});
