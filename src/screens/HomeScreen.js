import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TextInput, StyleSheet } from 'react-native';
import Categories from '../components/categories';
import Recipes from '../components/recipes';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import axios from 'axios';

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('Drink');
  const [searchText, setSearchText] = useState('');
  const [categories, setCategories] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCategory();
  }, []);

  const handleChangeCategory = category=>{
    getRecipes(category);
    setActiveCategory(category);
    setDrinks([]);
  }

  const getCategory = async () => {
    try {
      const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      console.log('got categories: ', response.data);
      if (response && response.data && response.data.drinks) {
        const categoryNames = response.data.drinks.map(drink => drink.strCategory);
        setCategories(categoryNames);
        if (categoryNames.length > 0) {
          getRecipes(categoryNames[0]);
        }
      }
    } catch (err) {
      console.log('error', err.message);
      if (err.response && err.response.status === 429) {
        await retryAfterDelay(getCategory);
      } else {
        setError(err.message);
      }
    }
  }

  const getRecipes = async (category = "Drink") => {
    try {
      const response = await axios.get(`https://thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
      console.log('got recipes: ', response.data);
      if (response && response.data) {
        setDrinks(response.data.drinks);
      }
    } catch (err) {
      console.log('error', err.message);
      if (err.response && err.response.status === 429) {
        await retryAfterDelay(() => getRecipes(category));
      } else {
        setError(err.message);
      }
    }
  }

  const retryAfterDelay = async (func) => {
    const delay = 1000 * Math.pow(2, retryCount);
    console.log(`Retrying after ${delay} milliseconds...`);
    await new Promise(resolve => setTimeout(resolve, delay));
    await func();
  }

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/*avatar and icon*/}
        <View style={styles.avatarIconContainer}>
          <Image source={require('../../assets/images/avatar.png')} style={styles.avatarIcon} />
          <BellIcon size={40} color="gray" />
        </View>

        {/*greetings*/}
        <View style={styles.greetingsContainer}>
          <Text style={styles.greetingsText}>Hello, username!</Text>
          <View>
            <Text style={styles.makeYourOwnText}>Stop wasting money in bars</Text>
          </View>
          <Text style={styles.stayHomeText}>
            make drinks at <Text style={styles.amberText}>home</Text>
          </Text>
        </View>

        {/*searchbar*/}
        <View style={styles.searchBarContainer}>
          <TextInput
            placeholder="Search recipe"
            placeholderTextColor="gray"
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
          <View style={styles.searchIcon}>
            <MagnifyingGlassIcon size={25} strokeWidth={3} color="gray" />
          </View>
        </View>

        {/*categories*/}
        <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />

        {/*recipes*/}
        <View>
          <Recipes drinks={drinks} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    paddingBottom: 50,
    paddingTop: 14,
    paddingHorizontal: 4,
  },
  avatarIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 4,
  },
  avatarIcon: {
    height: 50,
    width: 50,
  },
  greetingsContainer: {
    marginHorizontal: 4,
    marginBottom: 10,
  },
  greetingsText: {
    fontSize: 17,
  },
  makeYourOwnText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  stayHomeText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  amberText: {
    color: '#DA8EE7',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 30,
    height: 58,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 17,
    marginLeft: 10,
  },
  searchIcon: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});
