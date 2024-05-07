import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { categoryData } from '../constants/index.js';

const Categories = ({ activeCategory, handleChangeCategory }) => {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {categoryData.map((cat, index) => {
          const isActive = cat.name === activeCategory;
          const activeButtonStyle = isActive ? styles.activeButton : styles.inactiveButton;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(cat.name)}
              style={[styles.categoryButton, activeButtonStyle]}
            >
              <View style={styles.buttonContent}>
                <View style={styles.imageContainer}>
                  <Image
                    source={cat.image}
                    style={styles.image}
                  />
                </View>
                <Text style={styles.categoryName}>{cat.name}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingHorizontal: 10,
  },
  categoryButton: {
    marginRight: 10,
    padding: 20,
    borderRadius: 30,
    paddingVertical: 10,
  },
  inactiveButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  activeButton: {
    backgroundColor: '#DA8EE7',
  },
  buttonContent: {
    alignItems: 'center',
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  categoryName: {
    fontSize: 16,
    color: '#888',
  },
});

export default Categories;
