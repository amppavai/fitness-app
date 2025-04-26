import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Modal, TextInput, TouchableOpacity } from 'react-native';
import { getDatabase, ref, push } from "firebase/database";
import { app } from "../firebaseConfig";

const db = getDatabase(app);

export default function Progress() {
    //treenin tallentaminen
    const [modalVisible, setModalVisible] = useState(false);
    const [activity, setActivity] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');

    const saveActivity = async () => {
        if (activity && description && duration) {
            try {
                const activitiesRef = ref(db, 'activities/');
                await push(activitiesRef, {
                    activity,
                    description,
                    duration,
                    date: new Date().toISOString().split('T')[0]
                });
                console.log('Activity saved successfully!');
                setActivity('');
                setDescription('');
                setDuration('');
                setModalVisible(false);
            } catch (error) {
                console.error('Error saving activity:', error);
            }
        } else {
            alert('Please fill in all fields!');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Progress</Text>
            <Button style={styles.logButton} title="Log your activity" onPress={() => setModalVisible(true)} />
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            placeholder="Activity (e.g. Upper body training)"
                            placeholderTextColor="gray"
                            value={activity}
                            onChangeText={setActivity}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Description (e.g. In gym)"
                            placeholderTextColor="gray"
                            value={description}
                            onChangeText={setDescription}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Duration (e.g. 60 min)"
                            placeholderTextColor="gray"
                            value={duration}
                            onChangeText={setDuration}
                            keyboardType="numeric"
                            style={styles.input}
                        />
                        <Button title="Save Activity" onPress={saveActivity} />
                        <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
                    </View>
                </View>
            </Modal>

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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        margin: 20,
        padding: 20,
        borderRadius: 10,
    },
    input: {
        borderBottomWidth: 1,
        marginBottom: 10,
        padding: 8,
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        fontSize: 16,
    },
    logButton: {
        paddingBottom: 5,
        paddingTop: 5,
        paddingLeft: 7,
        paddingRight: 7,
        margin: 3,
        backgroundColor: "#ddd",
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
});