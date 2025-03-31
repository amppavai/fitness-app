import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Workouts() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Workouts Library</Text>
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