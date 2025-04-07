import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';

import Home from './tabs/Home';
import Workouts from './tabs/Workouts';
import Activity from './tabs/Activity';
import Progress from './tabs/Progress';


const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'}/>
      <NavigationContainer>
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
          <Tab.Screen style={styles.navigationContainer} name="Home" component={Home} />
          <Tab.Screen name="Workouts" component={Workouts} />
          <Tab.Screen name="Activity" component={Activity} />
          <Tab.Screen name="Progress" component={Progress} />

        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222',
    color: 'white'
  },
  navigationContainer: {
    backgroundColor: '#222222'
  },

});