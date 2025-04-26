import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { getDatabase, ref, push } from "firebase/database";
import { app } from "../firebaseConfig";

const db = getDatabase(app);

const logTest = () => {
    const activitiesRef = ref(db, "activities");
    push(activitiesRef, {
        activity: "Test Activity",
        description: "Just testing",
        duration: 30,
        timestamp: Date.now()
    });
};

export default function Progress() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Progress history</Text>
            <Button title="Log Test" onPress={logTest} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: '#1DCD9F',
        justifyContent: 'flex-start',
        margin: 10,
        marginTop: 20
    },
});