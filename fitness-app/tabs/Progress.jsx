import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, TextInput, TouchableOpacity, ScrollView, ToastAndroid, Alert } from 'react-native';
import { getDatabase, ref, push, onValue, remove } from "firebase/database";
import { app } from "../components/firebaseConfig";
import { Ionicons } from '@expo/vector-icons';
import { auth } from "../components/firebaseConfig";

const db = getDatabase(app);

export default function Progress() {
    //treenin tallentaminen
    const [modalVisible, setModalVisible] = useState(false);
    const [activity, setActivity] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    //aktiviteettien listaus
    const [activitiesList, setActivitiesList] = useState([]);
    const [activities, setActivities] = useState([]);

    const saveActivity = async () => {
        if (activity && description && duration) {
            const user = auth.currentUser;
            if (!user) return;

            const activitiesRef = ref(db, `activities/${user.uid}`);
            await push(activitiesRef, {
                activity,
                description,
                duration,
                date: new Date().toISOString().split('T')[0]
            });
            ToastAndroid.show('Workout saved successfully!', ToastAndroid.SHORT);
            setActivity('');
            setDescription('');
            setDuration('');
            setModalVisible(false);
        } else {
            alert('Please fill in all fields!');
        }
    };


    useEffect(() => {
        //const activitiesRef = ref(db, 'activities/');
        const user = auth.currentUser;
        if (!user) return;
        const activitiesRef = ref(db, `activities/${user.uid}`);
        const unsubscribe = onValue(activitiesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const parsedActivities = Object.entries(data).map(([id, value]) => ({
                    id,
                    ...value
                }));
                setActivitiesList(parsedActivities);
            } else {
                setActivitiesList([]);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const db = getDatabase(app);
        //const activitiesRef = ref(db, 'activities/');
        const user = auth.currentUser;
        if (!user) return;
        const activitiesRef = ref(db, `activities/${user.uid}`);
        const unsubscribe = onValue(activitiesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const today = new Date();
                const last7Days = new Date(today);
                last7Days.setDate(today.getDate() - 7);

                const loadedActivities = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));

                const recentActivities = loadedActivities.filter(activity => {
                    const activityDate = new Date(activity.date);
                    return activityDate >= last7Days;
                });

                setActivities(recentActivities);
            } else {
                setActivities([]);
            }
        });

        return () => unsubscribe();
    }, []);

    const deleteActivity = (id) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this workout?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        const user = auth.currentUser;
                        if (!user) return;

                        const db = getDatabase(app);
                        const activityRef = ref(db, `activities/${user.uid}/${id}`);
                        await remove(activityRef);
                        ToastAndroid.show('Workout deleted!', ToastAndroid.SHORT);
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Progress</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TouchableOpacity style={styles.logButton} onPress={() => setModalVisible(true)}>
                    <Text style={styles.logButtonText}>Log your workout</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{ width: '90%', marginTop: 20 }}>
                {activities.map((item) => (
                    <View key={item.id} style={styles.activityItem}>
                        <View>
                            <Text style={styles.activityName}>{item.activity}</Text>
                            <Text style={styles.activityDescription}>{item.description} - {item.duration} min</Text>
                        </View>
                        <TouchableOpacity onPress={() => deleteActivity(item.id)}>
                            <Ionicons name="trash-outline" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            placeholder="Activity (e.g. Upper body training)"
                            value={activity}
                            onChangeText={setActivity}
                            style={styles.input}
                            placeholderTextColor="#999"
                        />
                        <TextInput
                            placeholder="Description (e.g. In gym)"
                            value={description}
                            onChangeText={setDescription}
                            style={styles.input}
                            placeholderTextColor="#999"
                        />
                        <TextInput
                            placeholder="Duration (e.g. 60 min)"
                            value={duration}
                            onChangeText={setDuration}
                            keyboardType="numeric"
                            style={styles.input}
                            placeholderTextColor="#999"
                        />

                        <TouchableOpacity style={styles.saveButton} onPress={saveActivity}>
                            <Text style={styles.saveButtonText}>Save Activity</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#1DCD9F',
        marginTop: 20,
        marginBottom: 10,
    },
    logButton: {
        backgroundColor: '#1DCD9F',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginBottom: 20,
    },
    logButtonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalContent: {
        backgroundColor: '#fff',
        margin: 20,
        padding: 20,
        borderRadius: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        color: '#000',
    },
    saveButton: {
        backgroundColor: '#1DCD9F',
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    saveButtonText: {
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    cancelButton: {
        marginTop: 10,
        paddingVertical: 10,
        borderRadius: 5,
        backgroundColor: 'red',
    },
    cancelButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    listContainer: {
        width: '90%',
        marginTop: 10,
    },
    activityCard: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    activityText: {
        fontWeight: 'bold',
        color: '#169976',
        fontSize: 16,
    },
    descriptionText: {
        fontStyle: 'italic',
        color: '#555',
        marginTop: 5,
    },
    activityItem: {
        backgroundColor: "#1D1D1D",
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    activityName: {
        fontSize: 18,
        color: "#1DCD9F",
        fontWeight: "bold",
    },
    activityDescription: {
        fontSize: 14,
        color: "#ccc",
    },

});
