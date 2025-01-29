<template>
  <v-row class="mb-10">
    <v-col
      cols="12"
      md="6"
      class="d-flex justify-center">
      <v-img
        :aspect-ratio="1"
        :src="movie.poster.url" />
    </v-col>
    <v-col>
      <div class="pt-5 text-center text-md-left">
        <div class="mb-5">
          <h1 class="text-primary">{{ movie.name }}</h1>
          <h2
            v-if="movie.alternativeName"
            class="text-primary mb-2">
            {{ movie.alternativeName }}
          </h2>
        </div>
        <h4 class="my-4">
          <span class="text-primary">Год выпуска:</span> {{ movie.year }}
        </h4>
        <h4 class="mb-4">
          <span class="text-primary">Длительность:</span>
          {{ calculateLength }}
        </h4>
        <h4 сlass="mb-4">
          <span class="text-primary">Описание:</span>
        </h4>
        <p class="mb-4">{{ movie.description }}</p>
        <v-btn
          v-if="!FavoritesStore.isMovieInFavorites(movie.id)"
          class="mr-2 mb-4 background-gradient"
          size="small"
          prepend-icon="mdi-bookmark"
          @click="FavoritesStore.addToFavorites(movie)"
        >
          В избранное
        </v-btn>
        <v-btn
          v-else
          class="mr-2 mb-4 background-gradient"
          size="small"
          prepend-icon="mdi-bookmark-check"
          @click="FavoritesStore.deleteFromFavorites(movie.id)"
        >
          Удалить из избранного
        </v-btn>
      </div>
    </v-col>
  </v-row>
  <div>
    <v-sheet class="mb-10 bg-background-light rounded-xl elevation-5">
      <v-row>
        <v-col class="text-center d-flex flex-column ga-7">
          <div>
            <h3 class="mb-3">Рейтинг</h3>
            <v-chip
              v-for="(value, rating) in getRatings"
              :key="rating"
              variant="elevated"
              class="mr-2 mb-4 background-gradient font-weight-bold"
            >
              {{ rating }}: {{ value }}
            </v-chip>
          </div>

          <div>
            <h3 class="mb-3">Количество голосов</h3>
            <div class="d-flex justify-center">
              <div 
                v-for="(value, key) in movie.votes"
                :key="key"
              >
                <v-chip
                  v-if="key !== '_id' && key !== 'await'"
                  variant="elevated"
                  class="mr-2 mb-4 background-gradient font-weight-bold"
                  :key="key"
                >
                  {{ key }}: {{ value }}
                </v-chip>
              </div>
            </div>
          </div>

          <div>
            <h3>
              {{
                personalRating > 0
                  ? "Ваша оценка: " + personalRating
                  : "Оцените фильм:"
              }}
            </h3>
            <v-rating
              half-increments
              hover
              class="mb-4 d-block"
              active-color="primary"
              color="primary"
              :size="35"
              v-model="personalRating"
            />
          </div>
        </v-col>
      </v-row>
    </v-sheet>
    <div
      v-if="movie.watchability.items"
      class="mb-10"
    >
      <h2 class="text-center mb-5">Где посмотреть</h2>
      <v-row justify="center">
        <v-col
          v-for="watch in movie.watchability.items"
          :key="watch.logo._id"
          cols="6"
          sm="3"
          md="2"
        >
          <VImg
            max-width="70%"
            rounded="lg"
            class="ma-auto mb-4"
            :src="watch.logo.url"
          />
          <div class="d-flex justify-center">
            <v-btn
              :href="watch.url"
              variant="outlined"> Перейти </v-btn>
          </div>
        </v-col>
      </v-row>
    </div>

    <v-sheet class="rounded-lg elevation-8 bg-background-secondary">
      <v-row>
        <v-col>
          <h3 class="text-center text-primary mb-5">Рекомендуем посмотреть</h3>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useMovieStore } from '@/stores/MovieStore';
import { useFavoritesStore } from '@/stores/FavoritesStore';
import { useRatingStore } from '@/stores/RatingStore';

const MovieStore = useMovieStore();
const FavoritesStore = useFavoritesStore();
const RatingStore = useRatingStore();

const movie = computed(() => MovieStore.getDetailedMovie());

const getRatings = computed(() => {
  const rating = {};
  const ratingList = ['kp', 'imdb', 'filmCritics', 'russianFilmCritics'];
  for (let key in movie.value.rating) {
    if (ratingList.includes(key) && movie.value.rating[key] !== 0) {
      rating[key] = movie.value.rating[key];
    }
  }
  return rating;
});

const calculateLength = computed(() => {
  const hours = Math.floor(movie.value.movieLength / 60);
  const remainingMinutes = movie.value.movieLength % 60;
  return remainingMinutes > 0
    ? `${hours} ч ${remainingMinutes} мин`
    : `${hours} ч`;
});

let personalRating = ref(0);

watch(personalRating, (newRating) => RatingStore.setRating(movie.value.id, newRating));

onMounted(() => {
  personalRating.value = RatingStore.getRating(movie.value.id);
});
</script>
