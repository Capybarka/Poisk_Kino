<template>
  <v-row 
    v-if="movieList.length !== 0" 
    justify="center"
  >
    <v-col class="d-flex justify-center">
      <vue-awesome-paginate
        v-model="MovieStore.currentPage"
        :total-items="movieList.length"
        :items-per-page="MovieStore.moviePerPage"
        :show-ending-button="true"
        :show-breakpoint-buttons="false"
        @click="scrollToUp"
      />
    </v-col>
  </v-row>          
</template>

<script setup>
import {useMovieStore} from '@/stores/MovieStore';

defineProps({
  movieList: {
    type: Array,
    required: true
  }
});

const MovieStore = useMovieStore();

const scrollToUp = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
</script>