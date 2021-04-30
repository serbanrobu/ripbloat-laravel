import { h } from 'vue';
import {
  createRouter,
  createWebHistory,
  NavigationGuard,
  RouteRecordRaw,
} from 'vue-router';
import { startCase } from 'lodash';
import { Breadcrumbs } from '@/views/components';
import { loggedIn } from '@/scripts/auth';

const authGuard: NavigationGuard = (to, _from, next) => {
  if (!loggedIn.value) {
    return next({ name: 'Login', query: { redirect: to.fullPath } });
  }

  return next();
};

const guestGuard: NavigationGuard = (_to, _from, next) => {
  if (loggedIn.value) {
    return next('/');
  }

  return next();
};

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "Layout" */ '@/views/Layout.vue'),
    beforeEnter: authGuard,
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "Dashboard" */ '@/views/Dashboard.vue'),
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import(/* webpackChunkName: "Profile" */ '@/views/Profile.vue'),
      },
      {
        path: '/users',
        name: 'Users',
        component: () => import(/* webpackChunkName: "Users" */ '@/views/Users.vue'),
      },
      {
        path: '/users/create',
        name: 'CreateUser',
        components: {
          Breadcrumbs: h(Breadcrumbs, { pages: ['Users'] }),
          default: () => import(
            /* webpackChunkName: "CreateUser" */ '@/views/CreateUser.vue'
          ),
        },
      },
      {
        path: '/users/:id',
        props: true,
        components: {
          Breadcrumbs: h(Breadcrumbs, { pages: ['Users'] }),
          default: () => import(/* webpackChunkName: "User" */ '@/views/User.vue'),
        },
        children: [
          {
            path: '',
            name: 'UserDetails',
            component: () => import(
              /* webpackChunkName: "UserDetails" */ '@/views/UserDetails.vue'
            ),
          },
          {
            path: 'edit',
            name: 'EditUser',
            component: () => import(/* webpackChunkName: "EditUser" */ '@/views/EditUser.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/Login.vue'),
    meta: { guestOnly: true },
    beforeEnter: guestGuard,
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "Register" */ '@/views/Register.vue'),
    beforeEnter: guestGuard,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "NotFound" */ '@/views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.afterEach((to) => {
  const title = import.meta.env.VITE_APP_NAME as string;
  const pageTitle = startCase(to.name as string);
  document.title = (pageTitle && `${pageTitle} - `) + title;
});

export default router;
