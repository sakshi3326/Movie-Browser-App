import { fetchMovies } from './api';

export const getNowPlayingMovies = () => fetchMovies('/movie/now_playing');
export const getPopularMovies = () => fetchMovies('/movie/popular');
export const getTopRatedMovies = () => fetchMovies('/movie/top_rated');
export const getUpcomingMovies = () => fetchMovies('/movie/upcoming');