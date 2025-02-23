import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getPopularMovies } from '../services/movieServices';

const { width } = Dimensions.get('window'); 

const PopularScreen = () => {
  const [movies, setMovies] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPopularMovies();
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
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>⭐ {item.vote_average.toFixed(1)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    paddingVertical: 20,
  },
  list: {
    paddingHorizontal: 10,
  },
  card: {
    width: width * 0.6, 
    marginRight: 15,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#222', 
  },
  poster: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  infoContainer: {
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  releaseDate: {
    fontSize: 12,
    color: '#BBBBBB',
    marginVertical: 4,
  },
  ratingBadge: {
    backgroundColor: '#FFD700', 
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default PopularScreen;
