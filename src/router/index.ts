import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './routes';


const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {

  next();


});


export default router;
