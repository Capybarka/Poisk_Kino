<template>
  <div class="mb-5">
    <VTextField
      v-model="filters.searchingValue"
      variant="solo"
      bg-color="background-light"
      rounded="xl"
      prepend-inner-icon="mdi-magnify"
      label="Поиск..."
      type="text"
    />
    <v-sheet class="pa-5 rounded-lg elevation-5 bg-background-light">
      <div class="d-sm-flex flex-wrap justify-center align-center ga-10">
        <VSelect
          v-model="filters.ratingSortValue"
          variant="solo-filled"
          bg-color="background-light"
          label="Рейтинг выше"
          clearable
          :items="[9, 8, 7, 6, 5]"
        />
        <v-select
          v-model="filters.yearSortValue"
          variant="solo-filled"
          label="Год выпуска"
          bg-color="background-light"
          multiple
          clearable
          :items="MovieStore.getAllYears"
        >
          <template v-slot:selection="{ item, index }">
            <v-chip v-if="index < 2">
              <span>{{ item.title }}</span>
            </v-chip>
            <span
              v-if="index === 2"
              class="text-grey text-caption align-self-center"
            >
              (+{{ filters.yearSortValue.length - 2 }} другие)
            </span>
          </template>
        </v-select>
        <VSelect
          clearable
          variant="solo-filled"
          bg-color="background-light"
          label="Длительность более (мин)"
          :items="[30, 60, 90, 120, 160, 'Менее 30']"
          v-model="filters.lengthSortValue"
        />
      </div>
    </v-sheet>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';
import { useMovieStore } from '@/stores/MovieStore';
import { useFilterStore } from '@/stores/FilterStore';
import { VTextField } from 'vuetify/components';

const props = defineProps({
  sortingFunc: {
    type: Function,
    required: true,
  },
});

const MovieStore = useMovieStore();
const FilterStore = useFilterStore();

const filters = reactive({
  ratingSortValue: '',
  yearSortValue: [],
  lengthSortValue: '',
  searchingValue: '',
});

watch(
  filters,
  (newFilters) => {
    FilterStore.ratingSortValue = newFilters.ratingSortValue;
    FilterStore.yearSortValue = newFilters.yearSortValue;
    FilterStore.lengthSortValue = newFilters.lengthSortValue;
    FilterStore.searchingValue = newFilters.searchingValue;
    props.sortingFunc();
  },
  { deep: true },
);
</script>
