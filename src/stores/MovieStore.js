import { defineStore } from 'pinia';
import { useFilterStore } from './FilterStore';

export const useMovieStore = defineStore('MovieStore', {
  state: () => ({
    movies: [],
    sortedMovies: [],
    detailedMovie: null,

    currentPage: 1,
    moviePerPage: 25,
  }),

  getters: {
    getAllYears(state) {
      if (state.movies.length !== 0) {
        const years = Array.from(
          new Set(state.movies.map((movie) => movie.year.toString())),
        ).sort((a, b) => b - a);
        return [...years];
      }
      return [];
    },
  },

  actions: {
    async fetchMovie() {
      if (this.movies.length > 0) {
        return;
      }
      try {
        const response = await fetch('../../db.json');
        if (!response.ok) {
          throw new Error('Ошибка при загрузке данных');
        }
        const data = await response.json();
        this.movies = data.docs;
      } catch (error) {
        console.log(error);
      }
    },

    // пагинация
    PaginateMovies(movieList) {
      const start = (this.currentPage - 1) * this.moviePerPage;
      const end = start + this.moviePerPage;
      return movieList.slice(start, end);
    },

    filterAllMovies() {
      const FilterStore = useFilterStore();
      if (this.movies.length !== 0) {
        this.sortedMovies = FilterStore.sortingFunc(this.movies);
      }
    },

    // детальный просмотр
    setDetailedMovie(movie) {
      this.detailedMovie = movie;
      localStorage.setItem('detailedMovie', JSON.stringify(movie));
    },

    getDetailedMovie() {
      if (this.detailedMovie) {
        return this.detailedMovie;
      }
      return JSON.parse(localStorage.getItem('detailedMovie'));
    },
  },
});
