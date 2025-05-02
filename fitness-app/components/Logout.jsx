
import React, { useState, useCallback } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth';

export default function Logout({ setIsSignedIn }) {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            setModalVisible(true);
        }, [])
    );

    const handleConfirmLogout = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                setIsSignedIn(false);
            })
            .catch(error => {
                console.error("Failed to log out:", error);
            });
    };

    const handleCancel = () => {
        setModalVisible(false);
        navigation.goBack();
    };

    return (


        < Modal
            transparent={true}
            visible={modalVisible}
            animationType="fade"
            onRequestClose={handleCancel}
        >
            <View style={styles.fullScreen}>
                <ImageBackground
                    source={require('../assets/logout.jpg')}
                    style={styles.imageBackground}
                    resizeMode="cover"
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalText}>Are you sure you want to log out?</Text>
                            <View style={styles.modalButtons}>
                                <TouchableOpacity onPress={handleConfirmLogout} style={styles.confirmButton}>
                                    <Text style={styles.confirmText}>Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                                    <Text style={styles.cancelText}>No</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </Modal >

    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
   /*  modalContainer: {
        backgroundColor: '#111',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    }, */
    modalText: {
        color: '#FCF596',
        fontSize: 22,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    confirmButton: {
        backgroundColor: '#1DCD9F',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        marginRight: 10,
        alignItems: 'center'
    },
    confirmText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    cancelButton: {
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        marginLeft: 10,
        alignItems: 'center'
    },
    cancelText: {
        color: '#aaa',
        fontWeight: 'bold'
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    fullScreen: {
        flex: 1
    }
});
