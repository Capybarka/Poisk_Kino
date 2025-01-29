<template>
  <div>
    <v-card class=" rounded-lg elevation-10 text-center bg-background">
      <VImg
        cover
        lazy-src="https://img.freepik.com/premium-vector/loading-icon-vector_942802-5401.jpg"
        :src="movie.poster.previewUrl"
        :alt="movie.name"
        :aspect-ratio="10 / 15"
      />
      <div class="background-gradient">
        <v-card-title class="font-weight-bold">
          {{ movie.name }}
        </v-card-title>
        <v-card-subtitle>
          <div>
            Год выпуска: <span class="font-weight-bold">{{ movie.year }}</span>
          </div>
          <div>
            Кинопоиск:
            <v-chip class="font-weight-bold">{{
              movie.rating.kp.toPrecision(2)
            }}</v-chip>
          </div>
        </v-card-subtitle>
        <div class="d-flex flex-wrap justify-center ga-3">
          <v-btn
            variant="tonal"
            size="small"
            @click="showMoreInfo = true"
          >
            Подробнее
          </v-btn>

          <v-btn
            variant="outlined"
            class="mb-5"
            size="small"
            @click="showDetail">
            Смотреть
          </v-btn>
        </div>
      </div>
    </v-card>

    <v-dialog
      v-model="showMoreInfo"
      max-width="400px">
      <v-sheet
        class="elevation-10 rounded-lg text-center bg-background-light pa-10"
      >
        <VImg
          cover
          lazy-src="https://img.freepik.com/premium-vector/loading-icon-vector_942802-5401.jpg"
          class="postion-relative mb-4 rounded elevation-10"
          :src="movie.poster.previewUrl"
          :alt="movie.name"
          :aspect-ratio="10 / 15"
        />
        <div class="mb-4">
          {{ movie.shortDescription }}
        </div>
        <v-btn
          v-if="!FavoritesStore.isMovieInFavorites(movie.id)"
          class="mb-5 elevation-2 text-primary block"
          variant="tonal"
          @click="FavoritesStore.addToFavorites(movie)"
        >
          <span> Добавить в избранное </span>
        </v-btn>
        <v-btn
          v-else
          class="mb-5 elevation-2 text-primary block"
          variant="tonal"
          @click="FavoritesStore.deleteFromFavorites(movie.id)"
        >
          <span> Удалить из избранного </span>
        </v-btn>
        <v-btn
          class="text-primary w-100 d-block"
          variant="outlined"
          @click="showMoreInfo = false"
        >
          Закрыть
        </v-btn>
      </v-sheet>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMovieStore } from '@/stores/MovieStore';
import { useFavoritesStore } from '@/stores/FavoritesStore';

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});
const showMoreInfo = ref(false);

const router = useRouter();
const MovieStore = useMovieStore();
const FavoritesStore = useFavoritesStore();

const showDetail = () => {
  MovieStore.setDetailedMovie(props.movie);
  router.push(`/movies/${props.movie.id}`);
};
</script>
