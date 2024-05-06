import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {

    const navigation = useNavigation();

    setTimeout(()=> navigation.navigate('Home'), 3500);

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <View style={styles.innerContainer}>
                    <Image 
                        source={require('../../assets/images/welcome.png')}
                        style={styles.image}
                    />
                </View>
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    Drinkz
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFC107',
    },
    imageContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 999,
        padding: 50,
    },
    innerContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 999,
        padding: 30,
    },
    image: {
        width: 200,
        height: 200,
    },
    textContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    text: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 60,
    },
});
