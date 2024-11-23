import { RouteRecordRaw } from 'vue-router';
import issuesRoute from 'src/issues/router/routes';

const routes: RouteRecordRaw[] = [
  {
    path: '/issues',
    ...issuesRoute,
  },
  {
    path: '/',
    redirect: '/issues',
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
