import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Pedometer } from 'expo-sensors';
import { BarChart } from 'react-native-chart-kit';

//https://docs.expo.dev/versions/latest/sdk/pedometer/

const screenWidth = Dimensions.get("window").width;

export default function Activity() {

    const [activeTab, setActiveTab] = useState("D");
    const [stepData, setStepData] = useState({ D: [], W: [], M: [], Y: [] });

    useEffect(() => {
        const fetchSteps = async () => {
            const today = new Date();

            const fetchRangeSteps = async (start, end) => {
                try {
                    const result = await Pedometer.getStepCountAsync(start, end);
                    return result.steps;
                } catch {
                    return 0;
                }
            };
            const daily = await Promise.all(
                [...Array(24).keys()].map(async i => {
                    const start = new Date(today); start.setHours(i, 0, 0, 0);
                    const end = new Date(today); end.setHours(i, 59, 59, 999);
                    return { label: `${i}:00`, steps: await fetchRangeSteps(start, end) };
                })
            );
            const weekly = await Promise.all(
                [...Array(7).keys()].map(async i => {
                    const day = new Date(today); day.setDate(today.getDate() - (6 - i));
                    day.setHours(0, 0, 0, 0);
                    const end = new Date(day); end.setHours(23, 59, 59, 999);
                    return {
                        label: day.toLocaleDateString('en-US', { weekday: 'short' }),
                        steps: await fetchRangeSteps(day, end)
                    };
                })
            );
            const monthly = await Promise.all(
                [...Array(4).keys()].map(async i => {
                    const start = new Date(today); start.setDate(today.getDate() - (21 - i * 7));
                    start.setHours(0, 0, 0, 0);
                    const end = new Date(start); end.setDate(start.getDate() + 6);
                    end.setHours(23, 59, 59, 999);
                    return {
                        label: `Week ${i + 1}`,
                        steps: await fetchRangeSteps(start, end)
                    };
                })
            );
            const yearly = await Promise.all(
                [...Array(12).keys()].map(async i => {
                    const start = new Date(today); start.setMonth(today.getMonth() - (11 - i), 1);
                    start.setHours(0, 0, 0, 0);
                    const end = new Date(start); end.setMonth(start.getMonth() + 1); end.setDate(0);
                    end.setHours(23, 59, 59, 999);
                    return {
                        label: start.toLocaleString('default', { month: 'short' }),
                        steps: await fetchRangeSteps(start, end)
                    };
                })
            );
            setStepData({ D: daily, W: weekly, M: monthly, Y: yearly });
        };

        fetchSteps();
    }, []);

    const currentData = stepData[activeTab];
    const stepsArray = currentData.map(entry => entry.steps);
    const totalSteps = stepsArray.reduce((a, b) => a + b, 0);
    const averageSteps = Math.round(totalSteps / stepsArray.length);

    const timeLabels = {
        D: 'Today',
        W: 'This week',
        M: 'This month',
        Y: 'This year',
    };

    const countText = activeTab === 'D' ? totalSteps : averageSteps;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Activity report</Text>
            <View style={styles.graphContainer}>
                <Text style={styles.subtitle}>Steps</Text>
                <Text style={styles.period}>{timeLabels[activeTab]}</Text>
                <View style={styles.tabBar}>
                    {["D", "W", "M", "Y"].map(tab => (
                        <Text
                            key={tab}
                            onPress={() => setActiveTab(tab)}
                            style={[styles.tabButton, activeTab === tab && styles.activeTab]}
                        >
                            {tab}
                        </Text>
                    ))}
                </View>
                {(activeTab === "W" || activeTab === "M" || activeTab === "Y") && (
                    <Text style={styles.averageText}>
                        {activeTab === "W" ? "Weekly Average" : activeTab === "M" ? "Monthly Average" : "Yearly Average"}
                    </Text>
                )}
            </View>
            <View style={{ width: '120%' }}>
                <BarChart
                    data={{
                        labels: activeTab === 'D'
                            ? currentData.map((entry, index) => index % 6 === 0 ? entry.label : '')
                            : currentData.map(entry => entry.label),
                        datasets: [{ data: stepsArray }]
                    }}
                    width={screenWidth}
                    height={220}
                    withInnerLines={false}
                    withHorizontalLabels={false}
                    showValuesOnTopOfBars={true}
                    chartConfig={{
                        backgroundColor: "#000",
                        backgroundGradientFrom: "#000",
                        backgroundGradientTo: "#000",
                        decimalPlaces: 0,
                        barPercentage: 0.5,
                        color: (opacity = 1) => `rgba(29, 205, 159, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        fillShadowGradient: '#1DCD9F',
                        fillShadowGradientOpacity: 1,
                        useShadowColorFromDataset: false,
                        propsForBackgroundLines: {
                            stroke: "transparent",
                        },
                        propsForVerticalLabels: {
                            fontSize: 12,
                            fontWeight: 'bold',
                        },
                    }}
                />

            </View>
            <Text style={styles.countLabel}>Count</Text>
            <Text style={styles.countValue}>{countText}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center'
    },
    graphContainer: {
        alignSelf: 'stretch',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: '#1DCD9F',
        justifyContent: 'flex-start',
        margin: 10,
        marginTop: 20
    },
    subtitle: {
        fontSize: 28,
        fontWeight: "bold",
        color: 'white',
        marginTop: 20,
        marginBottom: 10
    },
    period: {
        fontSize: 20,
        color: '#aaa',
        marginBottom: 10,
    },
    text: {
        color: 'white'
    },
    averageText: {
        color: '#1DCD9F',
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
        //width: '90%'
    },
    tabButton: {
        fontSize: 18,
        padding: 8,
        color: '#888',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent'
    },
    activeTab: {
        color: '#169976',
        fontWeight: 'bold',
        borderBottomColor: '#000',
    },
    countLabel: {
        fontSize: 16,
        color: '#aaa',
        marginTop: 12,
    },
    countValue: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '600',
    },

});