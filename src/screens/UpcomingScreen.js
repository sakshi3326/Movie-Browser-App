// src/screens/UpcomingScreen.js
import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getUpcomingMovies } from '../services/movieService';

const UpcomingScreen = () => {
  const [movies, setMovies] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUpcomingMovies();
      setMovies(data);
    };
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('MovieDetail', { movie: item })}
    >
      <View style={styles.movieItem}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          style={styles.poster}
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.releaseDate}>{item.release_date}</Text>
        <Text style={styles.rating}>Rating: {item.vote_average}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={movies}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  movieItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  poster: {
    width: 100,
    height: 150,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  releaseDate: {
    fontSize: 14,
    color: '#666',
  },
  rating: {
    fontSize: 14,
    color: '#666',
  },
});

export default UpcomingScreen;