<template>
  <v-container>
    <AppSorting :sortingFunc="MovieStore.filterAllMovies" />
  </v-container>
  <MovieList/>
</template>

<script setup>
import MovieList from '@/components/MovieList.vue';
import { useMovieStore } from '@/stores/MovieStore';
import AppSorting from '@/components/AppSorting.vue';

const MovieStore = useMovieStore();
</script>
