export default {
  component: () => import('layouts/MainLayout.vue'),
  children: [
    {
      path: ':id',
      name: 'issue-view',
      component: () => import('src/issues/pages/IssuePage.vue'),
    },
    {
      path: '',
      name: 'issues-list',
      component: () => import('src/issues/pages/ListPage.vue'),
    },
  ],
};
