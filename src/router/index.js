import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/About.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  // DashBoard Pages
  {
    path: '/admin',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/Products.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/Orders.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/Coupons.vue'),
      },
    ],
  },
  {
    path: '/user',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'cart',
        component: () => import('../views/UserCart.vue'),
      },
      {
        path: 'checkout/:orderId',
        component: () => import('../views/UserCheckout.vue'),
      },
      {
        path: 'product/:productId',
        component: () => import('../views/UserProduct.vue'),
      },
    ],
  },
  {
    path: '/admin/:pathMatch(.*)*',
    redirect: { name: 'Login' },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
});

export default router;
