import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import React from 'react';
import { drinkData } from '../constants/index.js';
import MasonryList from '@react-native-seoul/masonry-list';
import Loading from './loading.js';
import { useNavigation } from '@react-navigation/native';

export default function Recipes({ categories, drinks }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipes</Text>
      <View>
        {
            categories.length == 0? (
                <Loading size="large"/>
            ): (
                <MasonryList
                 data={drinks}
                 keyExtractor={(item) => item.id}
                 numColumns={2}
                 showsVerticalScrollIndicator={false}
                 renderItem={({ item, index }) => <RecipeCard item={item} index={index} navigation={navigation}/>}
                 onEndReachedThreshold={0.1}
                />
            )
        }
      </View>
    </View>
  );
}

const RecipeCard = ({ item, index, navigation }) => {
  const isEven = index % 2 === 0;
  const isHeight = index % 3 === 0;
  
  return (
    <View>
      <Pressable style={{ ...styles.cardContainer, paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 0 : 8 }}
                 onPress={()=> navigation.navigate('RecipeDetail', {...item})}>
        <Image
          source={{ uri: item.strDrinkThumb }}
          style={{ height: isHeight ? 250 : 350, borderRadius: 37 }}
        />
        <Text style={styles.recipeName}>
            {item.strDrink.length > 20 ? item.strDrink.slice(0, 20) + '...' : item.strDrink}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  cardContainer: {
    width: '100%',
    paddingVertical: 8,
  },
  recipeName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 4,
  },
});