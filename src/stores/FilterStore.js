import { defineStore } from 'pinia';

export const useFilterStore = defineStore('FilterStore', {
  state: () => ({
    ratingSortValue: '',
    yearSortValue: [],
    lengthSortValue: '',
    searchingValue: '',
  }),

  actions: {
    filterByYear(movies) {
      if (Array.isArray(this.yearSortValue) && this.yearSortValue.length > 0) {
        return movies.filter((movie) => this.yearSortValue.includes(movie.year.toString()));
      }
      return movies;
    },

    filterByRating(movies) {
      if (this.ratingSortValue) {
        return movies.filter((movie) => movie.rating.kp >= this.ratingSortValue);
      }
      return movies;
    },

    filterByLength(movies) {
      if (this.lengthSortValue) {
        if (this.lengthSortValue === 'Менее 30') {
          return movies.filter((movie) => movie.movieLength <= 30);
        } else {
          return movies.filter((movie) => movie.movieLength >= this.lengthSortValue);
        }
      }
      return movies;
    },

    applySearch(movies) {
      if (this.searchingValue) {
        return movies.filter((movie) =>
          movie.name.toLowerCase().includes(this.searchingValue.toLowerCase()),
        );
      }
      return movies;
    },

    sortingFunc(moviesList) {
      let movies = [...moviesList];
      movies = this.filterByRating(movies);
      movies = this.filterByYear(movies);
      movies = this.filterByLength(movies);
      movies = this.applySearch(movies);
      return movies;
    },
  },
});
