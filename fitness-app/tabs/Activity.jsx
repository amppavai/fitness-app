import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Pedometer } from 'expo-sensors';

//https://docs.expo.dev/versions/latest/sdk/pedometer/

export default function Activity() {
    const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking...");
    const [stepCount, setStepCount] = useState(0);

    useEffect(() => {
        Pedometer.isAvailableAsync().then(
            result => setIsPedometerAvailable(String(result)),
            error => setIsPedometerAvailable("Could not get isAvailable: " + error)
        );
        const subscription = Pedometer.watchStepCount(result => {
            setStepCount(result.steps);
        });

        return () => subscription.remove();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Activity report</Text>
            <Text>Pedometer available: {isPedometerAvailable}</Text>
            <Text>Steps taken (since app opened): {stepCount}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        justifyContent: 'flex-start',
        margin: 10,
        marginTop: 20
    },
});




