import { defineStore } from 'pinia';
import { useFavoritesStore } from '@/stores/FavoritesStore';
import { useMovieStore } from '@/stores/MovieStore';
import { useRatingStore } from '@/stores/RatingStore';

export const useRecomendationStore = defineStore('RecomendationStore', {
  state: () => ({
    preferMovies: [],
  }),
  actions: {
    async getPreferMovies() {
      const RatingStore = useRatingStore();
      const MovieStore = useMovieStore();
      const FavoritesStore = useFavoritesStore();
      await MovieStore.fetchMovie();

      if (RatingStore.ratedMovies.length > 0) {
        RatingStore.ratedMovies.forEach((movie) => {
          if (movie.personalRating >= 4) {
            this.preferMovies.unshift(MovieStore.movies.find((m) => m.id === movie.movieId));
          }
        });
      }

      if (FavoritesStore.favoriteMovies.length > 0) {
        FavoritesStore.favoriteMovies.forEach((movie) => {
          this.preferMovies.push(movie);
        });
      }
    },

    getRandomRecomended() {
      // return 10 random movies
    },

    getAvg(keyValue, count) {
      let sum = 0;
      this.preferMovies.forEach((movie) => {
        for (let key in movie) {
          if (key === keyValue) {
            for (let ratingKey in movie[key]) {
              if (ratingKey !== 'await' && ratingKey !== '_id') {
                sum += movie[key][ratingKey];
              }
            }
          }
        }
      });
      return sum / count;
    },

    async getTopRecomended() {
      await this.getPreferMovies();
      const preferMovieLength = this.preferMovies.length;

      if (preferMovieLength > 0) {
        let yearsAvg = 0;
        const yearsSum = this.preferMovies.reduce((acc, movie) => acc + movie.year, 0);
        yearsAvg = yearsSum / preferMovieLength;

        const ratingAvg = this.getAvg('rating', preferMovieLength);
        const votesAvg = this.getAvg('votes', preferMovieLength);

        let movieLengthsAvg = 0;
        const movieLengthsSum = this.preferMovies.reduce(
          (acc, movie) => acc + movie.movieLength,
          0,
        );
        movieLengthsAvg = movieLengthsSum / preferMovieLength;

        console.log(yearsAvg, ratingAvg, votesAvg);

        // recomending
        const result = [];
        const MovieStore = useMovieStore();
        MovieStore.movies.forEach((movie) => {
          // коэффициент сравнения на основе кол-ва предпочитаемых фильмов
          const votes_k = 10000 / preferMovieLength;
          const ratings_k = 1000 / preferMovieLength;
          const length_k = 30;
          const years_k = 5;
          
          movie.
        });
      }
    },
  },
});
