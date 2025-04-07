import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Pedometer } from 'expo-sensors';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from 'victory-native';

//https://docs.expo.dev/versions/latest/sdk/pedometer/

export default function Activity() {
    const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking...");
    const [stepCount, setStepCount] = useState(0);
    const [activeTab, setActiveTab] = useState("W"); // oletuksena weekly steps
    const [stepDataByView, setStepDataByView] = useState({ D: [], W: [], M: [], Y: [] });


    /*     useEffect(() => {
            Pedometer.isAvailableAsync().then(
                result => setIsPedometerAvailable(String(result)),
                error => setIsPedometerAvailable("Could not get isAvailable: " + error)
            );
            const subscription = Pedometer.watchStepCount(result => {
                setStepCount(result.steps);
            });
    
            return () => subscription.remove();
        }, []); */
    // live step updates
    useEffect(() => {
        const subscribe = async () => {
            const available = await Pedometer.isAvailableAsync();
            setIsPedometerAvailable(String(available));

            const subscription = Pedometer.watchStepCount(result => {
                setStepCount(result.steps);
            });

            return () => subscription.remove();
        };

        subscribe();
    }, []);

    //feetching step data for chart views (d,w,m,y)
    useEffect(() => {
        const fetchAllStepData = async () => {
            const today = new Date();
            //today daily steps by hour
            const daily = [];
            for (let i = 0; i < 24; i++) {
                const start = new Date(today);
                start.setHours(i, 0, 0, 0);
                const end = new Date(today);
                end.setHours(i, 59, 59, 999);

                try {
                    const result = await Pedometer.getStepCountAsync(start, end);
                    daily.push({ label: `${i}:00`, steps: result.steps });
                } catch {
                    daily.push({ label: `${i}:00`, steps: 0 });
                }
            }
            const weekly = [];
            for (let i = 6; i >= 0; i--) {
                const start = new Date(today);
                start.setDate(today.getDate() - i);
                start.setHours(0, 0, 0, 0);
                const end = new Date(start);
                end.setHours(23, 59, 59, 999);

                try {
                    const result = await Pedometer.getStepCountAsync(start, end);
                    weekly.push({ label: start.toLocaleDateString('en-US', { weekday: 'short' }), steps: result.steps });
                } catch {
                    weekly.push({ label: start.toLocaleDateString('en-US', { weekday: 'short' }), steps: 0 });
                }
            }
            const monthly = [];
            for (let i = 3; i >= 0; i--) {
                const start = new Date(today);
                start.setDate(today.getDate() - i * 7);
                start.setHours(0, 0, 0, 0);
                const end = new Date(start);
                end.setDate(start.getDate() + 6);
                end.setHours(23, 59, 59, 999);

                try {
                    const result = await Pedometer.getStepCountAsync(start, end);
                    monthly.push({ label: `Week ${4 - i}`, steps: result.steps });
                } catch {
                    monthly.push({ label: `Week ${4 - i}`, steps: 0 });
                }
            }
            const yearly = [];
            for (let i = 11; i >= 0; i--) {
                const start = new Date(today);
                start.setMonth(today.getMonth() - i, 1);
                start.setHours(0, 0, 0, 0);
                const end = new Date(start);
                end.setMonth(start.getMonth() + 1);
                end.setDate(0);
                end.setHours(23, 59, 59, 999);

                try {
                    const result = await Pedometer.getStepCountAsync(start, end);
                    yearly.push({ label: start.toLocaleString('default', { month: 'short' }), steps: result.steps });
                } catch {
                    yearly.push({ label: start.toLocaleString('default', { month: 'short' }), steps: 0 });
                }
            }
            //save data for chart views
            setStepDataByView({ D: daily, W: weekly, M: monthly, Y: yearly });
        };

        fetchAllStepData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Activity report</Text>
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
            {/* testing live steps, ok */}
            <Text style={styles.text}>Live Steps: {stepCount}</Text>

            {/* test data, ok */}
            <Text style={styles.subtitle}>View: {activeTab}</Text>
            {stepDataByView[activeTab]?.map((entry, index) => (
                <Text style={styles.text} key={index}>{entry.label}: {entry.steps}</Text>
            ))}
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
    subtitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: 'white',
        marginTop: 20,
        marginBottom: 10
    },
    text: {
        color: 'white'
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
        width: '90%'
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
        borderBottomColor: '#000'
    }
});

