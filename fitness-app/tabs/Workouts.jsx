import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Image, TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { getExercisesByBodyPart } from '../api/ExercisesAPI';

export default function Workouts() {

    const [exercises, setExercises] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchExercises(selectedCategory);
        }, 500); //add delay to reduce API calls
        return () => clearTimeout(timer);
    }, [selectedCategory]);

    const fetchExercises = async (category) => {
        setExercises([]); //clear previous results while fetching
        setTimeout(async () => {
            const data = await getExercisesByBodyPart(category);
            setExercises(data);
        }, 1000);

    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Workouts Library</Text>
            <Text style={styles.text}>Select your workout category</Text>
            <View style={styles.categoryContainer}>

                {["back", "chest", "upper arms", "lower arms", "lower legs", "upper legs", "shoulders", "cardio", "waist"].map((category) => (
                    <TouchableOpacity
                        key={category}
                        style={[styles.categoryButton, selectedCategory === category && styles.selectedCategory]}
                        onPress={() => setSelectedCategory(category)}
                    >
                        <Text style={styles.categoryText}>{category.toUpperCase()}</Text>
                    </TouchableOpacity>
                ))}

            </View>
                <FlatList
                    data={exercises}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.exerciseCard}>
                            <Image source={{ uri: item.gifUrl || "https://via.placeholder.com/100" }} style={styles.image} />
                            <Text style={styles.exerciseName}>{item.name}</Text>
                        </View>
                    )}
                />
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
    text: {
        fontSize: 16,
        fontWeight: "regular",
        justifyContent: 'flex-start'
    },
    categoryContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20
    },
    categoryButton: {
        padding: 10,
        margin: 5,
        backgroundColor: "#ddd",
        borderRadius: 10
    },
    selectedCategory: {
        backgroundColor: "#007AFF"
    },
    categoryText: {
        fontWeight: "bold",
        color: "#fff"
    },
    exerciseCard: {
        padding: 15,
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
        marginBottom: 10
    },
    image: {
        width: 100,
        height: 100,
        alignSelf: "center"
    },
    exerciseName: {
        textAlign: "center",
        fontWeight: "bold",
        marginTop: 5
    },
});