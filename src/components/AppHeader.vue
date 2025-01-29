<template>
  <v-container>
    <div class="d-flex justify-space-between">
      <div class="d-flex align-center justify-center">
        <v-img
          class="mr-3 d-block"
          min-width="50px"
          src="../../src/assets/logo.png"
        />
        <h1 class="text-primary">ПоискКино</h1>
      </div>
      <div class="d-flex ga-5">
        <v-btn
          class="bg-primary"
          variant="tonal"
          icon="mdi-home"
          @click="router.push('/')"
        />
        <v-btn
          variant="tonal"
          icon="mdi-heart"
          class="bg-primary"
          @click="router.push('/Favorites')"
        />
        <v-btn
          variant="tonal"
          icon="mdi-star"
          class="bg-primary"
          @click="router.push('/Rated')"
        />
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
