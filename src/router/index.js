import { createWebHistory, createRouter } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import MoviePage from '@/pages/MoviePage.vue';
import FavoritesPage from '@/pages/FavoritesPage.vue';
import RatedPage from '@/pages/RatedPage.vue';

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/movies/:id',
    component: MoviePage,
  },
  {
    path: '/Favorites',
    component: FavoritesPage,
  },
  {
    path: '/Rated',
    component: RatedPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
