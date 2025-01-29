<template>
  <v-sheet class="pa-4 mb-10 bg-background">
    <h2 class="text-md-h4 text-center text-primary font-weight-bold mb-5">
      Мои оценки
    </h2>
    <AppSorting :sortingFunc="RatingStore.sortRatedMovies" />
    <div v-if="RatingStore.sortedRated.length !== 0">
      <v-row justify="center">
        <v-col
          cols="12"
          md="3"
          sm="6"
          v-for="movie in RatingStore.sortedRated"
          :key="movie.id"
        >
          <MovieCard 
            class="mb-3" 
            :movie="movie" 
          />
          <v-sheet class="pa-3 mb-7 bg-background-light elevation-10 rounded-lg">
            <p class="text-center mb-2">
              Ваша оценка:
              <span class="text-primary">
                {{ RatingStore.getRating(movie.id) }}
              </span>
            </p>
            <v-btn 
              color="primary"
              variant="outlined"
              class="w-100"
              size="small"
              @click="RatingStore.deleteFromRated(movie.id)"
            >
              Удалить оценку
            </v-btn>
          </v-sheet>
        </v-col>
      </v-row>
    </div>
    <p
      v-else
      class="text-center"
    >
      Ничего нет
    </p>
    <AppPagination :movieList="RatingStore.sortedRated"/>
  </v-sheet>
</template>

<script setup>
import { onMounted } from 'vue';
import { useMovieStore } from '@/stores/MovieStore.js';
import { useRatingStore } from '@/stores/RatingStore';
import AppPagination from '@/components/AppPagination.vue';
import MovieCard from '@/components/MovieCard.vue';
import AppSorting from '@/components/AppSorting.vue';

const MovieStore = useMovieStore();
const RatingStore = useRatingStore();

onMounted(async () => {
  await MovieStore.fetchMovie();
  const ratedList = JSON.parse(localStorage.getItem('ratedMovies') || '[]');
  if (ratedList.length > 0) {
    const movieIds = ratedList.map((movie) => movie.movieId);
    RatingStore.sortedRated = [...MovieStore.movies.filter((movie) => movieIds.includes(movie.id))];
  }
});
</script>
