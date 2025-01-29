import { defineStore } from 'pinia';
import { useFilterStore } from '@/stores/FilterStore';
import { useMovieStore } from '@/stores/MovieStore';

export const useRatingStore = defineStore('RatingStore', {
  state: () => ({
    ratedMovies: JSON.parse(localStorage.getItem('ratedMovies') || '[]'),
    sortedRated: [],
  }),

  actions: {
    setRating(movieId, newRating) {
      if (newRating > 0) {
        const exsistingMovieId = this.ratedMovies.findIndex((m) => m.movieId === movieId);
        if (exsistingMovieId !== -1) {
          this.ratedMovies[exsistingMovieId].personalRating = newRating;
        } else {
          this.ratedMovies.push({
            movieId,
            personalRating: newRating,
          });
        }
        localStorage.setItem('ratedMovies', JSON.stringify(this.ratedMovies));
      } else {
        return;
      }
    },

    getRating(movieId) {
      if (this.ratedMovies.length > 0) {
        const ratedMovie = this.ratedMovies.find((m) => m.movieId === movieId);
        if (ratedMovie && ratedMovie.personalRating > 0) {
          return ratedMovie.personalRating;
        }
      }
    },

    sortRatedMovies() {
      const FilterStore = useFilterStore();
      const MovieStore = useMovieStore();
      const ratedMoviesIds = this.ratedMovies.map((m) => m.movieId);
      const newRatedMovies = MovieStore.movies.filter((m) => ratedMoviesIds.includes(m.id));
      this.sortedRated = FilterStore.sortingFunc(newRatedMovies);
    },

    deleteFromRated(id) {
      this.ratedMovies = this.ratedMovies.filter((m) => m.movieId !== id);
      localStorage.setItem('ratedMovies', JSON.stringify(this.ratedMovies));
      this.sortRatedMovies();
    },

    getRatedMovies() {
      const MovieStore = useMovieStore();
      const ratedMoviesIds = this.ratedMovies.map((m) => m.movieId);
      return MovieStore.movies.filter((m) => ratedMoviesIds.includes(m.id));
    },
  },
});
