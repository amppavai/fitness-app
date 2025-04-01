import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, SafeAreaView } from 'react-native';

import Home from './tabs/Home';
import Workouts from './tabs/Workouts';
import Activity from './tabs/Activity';
import Progress from './tabs/Progress';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
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
            tabBarActiveTintColor: "#007AFF",
            tabBarInactiveTintColor: "gray",
            headerShown: false,
            animation: 'shift'
          })}
        >
          <Tab.Screen name="Home" component={Home} />
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
    backgroundColor: '#fff'/* ,
    alignItems: 'center',
    justifyContent: 'center', */
  },

});