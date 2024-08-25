// router/index.js 或你的路由配置文件
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import LoginView from '../views/LoginView.vue';
import { Alert } from 'bootstrap';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      window.alert("Please login first")
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
