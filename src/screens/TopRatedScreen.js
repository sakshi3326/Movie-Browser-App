import React, { useEffect, useState, useRef } from 'react';
import { 
  View, Text, Image, StyleSheet, TouchableOpacity, Animated, PanResponder, Dimensions 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getTopRatedMovies } from '../services/movieServices';

const { width, height } = Dimensions.get('window'); 

const TopRatedScreen = () => {
  const [movies, setMovies] = useState([]);
  const position = useRef(new Animated.ValueXY()).current;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTopRatedMovies();
      setMovies(data);
    };
    fetchData();
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 120) {
          swipeCard('right');
        } else if (gesture.dx < -120) {
          swipeCard('left');
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const swipeCard = (direction) => {
    Animated.timing(position, {
      toValue: { x: direction === 'right' ? width : -width, y: 0 },
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      position.setValue({ x: 0, y: 0 });
      
      setMovies((prevMovies) => prevMovies.slice(1)); 
    });
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {movies.length > 0 ? (
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.card,
            { 
              transform: [
                { translateX: position.x },
                { translateY: position.y },
                { rotate: position.x.interpolate({
                    inputRange: [-width, 0, width],
                    outputRange: ['-10deg', '0deg', '10deg'],
                  })
                },
              ],
            },
          ]}
        >
          <TouchableOpacity 
            onPress={() => navigation.navigate('MovieDetail', { movie: movies[0] })}
          >
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${movies[0].poster_path}` }}
              style={styles.poster}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{movies[0].title}</Text>
              <Text style={styles.releaseDate}>📅 {movies[0].release_date}</Text>
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>⭐ {movies[0].vote_average}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <Text style={styles.noMoreMovies}>No more movies!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: width * 0.9,
    height: height * 0.7,
    position: 'absolute',
    borderRadius: 12,
    backgroundColor: '#222',
    overflow: 'hidden',
    elevation: 5,
  },
  poster: {
    width: '100%',
    height: '80%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  infoContainer: {
    padding: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  releaseDate: {
    fontSize: 14,
    color: '#BBBBBB',
    marginVertical: 4,
  },
  ratingBadge: {
    backgroundColor: '#FFD700',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  noMoreMovies: {
    fontSize: 20,
    color: '#FFF',
  },
});

export default TopRatedScreen;
