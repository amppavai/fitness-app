import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Image, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { getExercisesByBodyPart, getAllExercises } from '../api/ExercisesAPI';

export default function Workouts() {

    const [exercises, setExercises] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchExercises();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchExercises(selectedCategory);
        }, 500);
        return () => clearTimeout(timer);

    }, [selectedCategory]);

    const fetchExercises = async (category) => {
        try {
            setLoading(true);
            setExercises([]);
            let data = [];
            if (category) {
                data = await getExercisesByBodyPart(category);
            } else {
                data = await getAllExercises();
            }
            setExercises(data);
        } catch (error) {
            console.error('Error fetching exercises:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Workouts Library</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={styles.scrollViewContent}
            >
                {["all", "back", "chest", "upper arms", "lower arms", "lower legs", "upper legs", "shoulders", "cardio", "waist"].map((category) => (
                    <TouchableOpacity
                        key={category}
                        style={[
                            styles.categoryButton,
                            selectedCategory === (category === "all" ? "" : category) && styles.selectedCategory
                        ]}
                        onPress={() => setSelectedCategory(category === "all" ? "" : category)}
                    >
                        <Text style={styles.categoryButtonText}>{category.toUpperCase()}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {loading ? (
                <Text style={styles.loadingText}>Loading...</Text>
            ) : (
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
            )}
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
        fontSize: 30,
        fontWeight: "bold",
        color: '#1DCD9F',
        justifyContent: 'flex-start',
        margin: 10,
        marginTop: 20
    },
    categoryContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: 50
    },
    scrollViewContent: {
        alignItems: 'center',
        paddingVertical: 10,
        height: 70,
      },
    categoryButton: {
        backgroundColor: "#ddd",
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
      },
    categoryButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#222222",
        textAlign: 'center',
    },

    selectedCategory: {
        backgroundColor: "#1DCD9F"
    },
    exerciseCard: {
        marginTop: 30,
        padding: 10,
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
        color: '#169976',
        marginTop: 5
    },
    loadingText: {
        fontSize: 18,
        color: "#1DCD9F",
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    }
});