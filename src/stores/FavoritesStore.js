import { defineStore } from 'pinia';
import { useFilterStore } from '@/stores/FilterStore';

export const useFavoritesStore = defineStore('FavoritesStore', {
  state: () => ({
    favoriteMovies: JSON.parse(localStorage.getItem('favoriteMovies') || '[]'),
    sortedFavorites: JSON.parse(localStorage.getItem('favoriteMovies') || '[]'),
  }),

  actions: {
    addToFavorites(movie) {
      const isDuplicate = this.favoriteMovies.some(
        (favMovie) => favMovie.id === movie.id,
      );
      if (isDuplicate) {
        return;
      }
      this.favoriteMovies.push(movie);
      localStorage.setItem(
        'favoriteMovies',
        JSON.stringify(this.favoriteMovies),
      );
      this.sortFavoriteMovies();
    },

    deleteFromFavorites(id) {
      this.favoriteMovies = this.favoriteMovies.filter(
        (movie) => movie.id !== id,
      );
      this.sortedFavorites = this.sortedFavorites.filter(
        (movie) => movie.id !== id,
      );
      localStorage.setItem(
        'favoriteMovies',
        JSON.stringify(this.favoriteMovies),
      );
      this.sortFavoriteMovies();
    },
  
    isMovieInFavorites(id) {
      return this.favoriteMovies.some((movie) => movie.id === id);
    },
  
    sortFavoriteMovies() {
      const FilterStore = useFilterStore();
      if (this.favoriteMovies.length !== 0) {
        this.sortedFavorites = FilterStore.sortingFunc(this.favoriteMovies);
      }
    },
  },
});