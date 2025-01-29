<template>
  <div class="d-flex flex-wrap ga-5">
    <v-container>
      <span
        v-if="MovieStore.movies.length === 0"
        class="text-center mb-10"
      >
        Не найдено
      </span>

      <v-row justify="center">
        <v-col
          v-for="movie in MovieStore.PaginateMovies(MovieStore.sortedMovies)"
          cols="12"
          md="3"
          sm="6"
          class="mb-5"
          :key="movie.id"
        >
          <MovieCard :movie="movie" />
        </v-col>
      </v-row>
      <AppPagination :movieList="MovieStore.sortedMovies"/>
    </v-container>
  </div>
</template>

<script setup>
import MovieCard from '@/components/MovieCard.vue';
import { useMovieStore } from '@/stores/MovieStore';
import AppPagination from '@/components/AppPagination.vue';

const MovieStore = useMovieStore();
</script>
