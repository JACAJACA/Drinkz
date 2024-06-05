import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ChevronLeftIcon, ClockIcon, FireIcon, Square3Stack3DIcon, UsersIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function RecipeDetailScreen(props) {
    console.log(props.route.params);
    let item = props.route.params;
    const navigation = useNavigation();
    const [drink, setDrink] = useState(null);

    useEffect(() => {
        getDrinkData(item.idDrink);
    }, []);

    const getDrinkData = async (id) => {
        try {
            const response = await axios.get(`https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
            console.log('got drink data: ', response.data);
            if (response && response.data) {
                setDrink(response.data.drinks[0]);
            }
        } catch (err) {
            console.log('error', err.message);
            if (err.response && err.response.status === 429) {
                await retryAfterDelay(() => getDrinkData(id));
            } else {
                setError(err.message);
            }
        }
    };

    if (!item || !item.strDrinkThumb) {
        return (
            <View style={styles.noDataContainer}>
                <Text>No data available</Text>
            </View>
        );
    }

    const ingredientsIndexes = (drink) => {
        if (!drink) return [];
        let indexes = [];
        for (let i = 1; i <= 20; i++) {
            if (drink['strIngredient' + i]) {
                indexes.push(i);
            }
        }
        return indexes;
    };

    return (
        <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.imageContainer}>
                <Image 
                    source={{ uri: item.strDrinkThumb }}
                    style={styles.image}
                />
            </View>

            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeftIcon size={35} color="#DA8EE7"/>
                </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.drinkTitle}>
                        {drink?.strDrink}
                    </Text>
                    <Text style={styles.alcoholicText}>
                        {drink?.strAlcoholic}
                    </Text>
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.infoBox}>
                        <View style={styles.infoIcon}>
                            <ClockIcon size={40} color="#525252"/>
                        </View>
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoTextNumber}>5</Text>
                            <Text style={styles.infoTextLabel}>Mins</Text>
                        </View>
                    </View>

                    <View style={styles.infoBox}>
                        <View style={styles.infoIcon}>
                            <UsersIcon size={40} color="gray"/>
                        </View>
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoTextNumber}>01</Text>
                            <Text style={styles.infoTextLabel}>Servings</Text>
                        </View>
                    </View>

                    <View style={styles.infoBox}>
                        <View style={styles.infoIcon}>
                            <FireIcon size={40} color="#525252"/>
                        </View>
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoTextNumber}>240</Text>
                            <Text style={styles.infoTextLabel}>Cal</Text>
                        </View>
                    </View>

                    <View style={styles.infoBox}>
                        <View style={styles.infoIcon}>
                            <Square3Stack3DIcon size={40} color="#525252"/>
                        </View>
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoTextLabel}>Easy</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Ingredients</Text>
                    <View style={styles.ingredientsContainer}>
                        {
                            ingredientsIndexes(drink).map(i => {
                                return (
                                    <View key={i} style={styles.ingredientRow}>
                                        <View style={styles.ingredientBullet} />
                                        <View style={styles.ingredientTextContainer}>
                                            <Text style={styles.ingredientMeasure}>{drink['strMeasure' + i]}</Text>
                                            <Text style={styles.ingredientName}>{drink['strIngredient' + i]}</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Instructions</Text>
                    <Text style={styles.instructionsText}>
                        {drink?.strInstructions}
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'white',
        flex: 1
    },
    scrollViewContent: {
        paddingBottom: 30
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 5
    },
    image: {
        width: 400,
        height: 450,
        borderRadius: 53
    },
    headerContainer: {
        width: '100%',
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 14
    },
    backButton: {
        padding: 2,
        borderRadius: 50,
        marginLeft: 5,
        backgroundColor: 'white'
    },
    contentContainer: {
        paddingHorizontal: 16,
        paddingTop: 8,
        spaceBetween: 8
    },
    titleContainer: {
        marginBottom: 16
    },
    drinkTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333'
    },
    alcoholicText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#555'
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16
    },
    infoBox: {
        alignItems: 'center',
        backgroundColor: '#DA8EE7',
        borderRadius: 50,
        padding: 8
    },
    infoIcon: {
        height: 65,
        width: 65,
        backgroundColor: 'white',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoTextContainer: {
        alignItems: 'center',
        paddingTop: 8
    },
    infoTextNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333'
    },
    infoTextLabel: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#333'
    },
    sectionContainer: {
        marginBottom: 16
    },
    sectionTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#333'
    },
    ingredientsContainer: {
        marginLeft: 12,
        marginTop: 8
    },
    ingredientRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
    },
    ingredientBullet: {
        height: 15,
        width: 15,
        backgroundColor: '#DA8EE7',
        borderRadius: 50,
        marginRight: 8
    },
    ingredientTextContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    ingredientMeasure: {
        fontSize: 17,
        fontWeight: '700',
        color: '#333',
        marginRight: 4
    },
    ingredientName: {
        fontSize: 17,
        fontWeight: '500',
        color: '#555'
    },
    instructionsText: {
        fontSize: 16,
        color: '#333'
    }
});
