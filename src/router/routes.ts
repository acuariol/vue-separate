const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/pages/home.vue'),
    meta: {
      title: '登录首页'
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('@/pages/not-found.vue'),
    meta: {
      title: '页面丢失'
    }
  }
];

export default routes;
