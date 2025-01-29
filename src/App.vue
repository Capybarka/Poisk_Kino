<template>
  <v-app class="pa-3">
    <v-main>
      <AppHeader />
      <v-container>
        <RouterView/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue';
import { onMounted } from 'vue';
import { useMovieStore } from '@/stores/MovieStore';
import { RouterView } from 'vue-router';

const MovieStore = useMovieStore();

onMounted(async () => {
  await MovieStore.fetchMovie();
  MovieStore.filterAllMovies();
});

</script>
