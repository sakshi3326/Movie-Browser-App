import React, { useContext } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { FavoritesContext } from '../context/FavoritesContext';

const MovieDetailScreen = ({ route }) => {
  const { movie } = route.params;
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.releaseDate}>Release Date: {movie.release_date}</Text>
        <Text style={styles.rating}>Rating: {movie.vote_average}</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
        
        <TouchableOpacity 
          style={[styles.button, isFavorite ? styles.buttonRemove : styles.buttonAdd]} 
          onPress={toggleFavorite}
        >
          <Text style={styles.buttonText}>
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  poster: {
    width: '100%',
    height: 450,
    resizeMode: 'cover',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20, 
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  releaseDate: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  rating: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginVertical: 10,
  },
  overview: {
    fontSize: 16,
    color: '#555',
    marginTop: 15,
    lineHeight: 22,
    textAlign: 'justify',
  },
  button: {
    padding: 15,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonAdd: {
    backgroundColor: '#FF5A5F', 
  },
  buttonRemove: {
    backgroundColor: '#444', 
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default MovieDetailScreen;
