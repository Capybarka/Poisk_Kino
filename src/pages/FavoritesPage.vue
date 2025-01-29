<template>
  <v-sheet class="pa-4 mb-10 bg-background">
    <h2 class="text-md-h4 text-center text-primary font-weight-bold mb-5">
      Мои закладки
    </h2>
    <AppSorting :sortingFunc="FavoritesStore.sortFavoriteMovies" />
    <div v-if="FavoritesStore.sortedFavorites.length !== 0">
      <v-row justify="center">
        <v-col
          cols="12"
          md="3"
          sm="6"
          v-for="movie in FavoritesStore.sortedFavorites"
          :key="movie.id"
        >
          <MovieCard 
            class="mb-3"
            :movie="movie"
          />
          <v-btn
            class="mb-10 w-100 rounded-lg elevation-10 bg-primary"
            variant="tonal"
            @click="FavoritesStore.deleteFromFavorites(movie.id)"
          >
            Удалить
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <p
      v-else
      class="text-center">Ничего нет</p
    >
    <AppPagination :movieList="FavoritesStore.sortedFavorites"/>
  </v-sheet>
</template>

<script setup>
import { useFavoritesStore } from '@/stores/FavoritesStore';
import MovieCard from '@/components/MovieCard.vue';
import AppSorting from '@/components/AppSorting.vue';
import AppPagination from '@/components/AppPagination.vue';

const FavoritesStore = useFavoritesStore();
</script>
