import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getNowPlayingMovies } from '../services/movieServices';
import { useNavigation } from '@react-navigation/native';

const NowPlayingScreen = () => {
  const [movies, setMovies] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getNowPlayingMovies();
      setMovies(data);
    };
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('MovieDetail', { movie: item })}
    >
      <Image 
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} 
        style={styles.poster} 
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.releaseDate}>📅 {item.release_date}</Text>
        <Text style={styles.rating}>⭐ {item.vote_average.toFixed(1)}/10</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', 
  },
  list: {
    padding: 10,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  poster: {
    width: '100%',
    height: 300,
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  releaseDate: {
    fontSize: 14,
    color: '#BBBBBB',
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFD700', 
  },
});

export default NowPlayingScreen;
