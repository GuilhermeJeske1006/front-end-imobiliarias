import adminMiddleware from '@/middleware/adminMiddleware'; // Importe o middleware
import authMiddleware from '@/middleware/authMiddleware'; // Importe o middleware

import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/dashboard' },
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: 'dashboard',
          component: () => import('../pages/dashboard.vue'),
          beforeEnter: authMiddleware,
        },
        {
          path: 'perfil',
          component: () => import('../pages/usuario/perfil.vue'),
          beforeEnter: authMiddleware,
        },
        {
          path: 'account-settings',
          component: () => import('../pages/account-settings.vue'),
        },
        {
          path: 'blogs/listar',
          component: () => import('../pages/blog/listar.vue'),
          beforeEnter: authMiddleware,
        },
        {
          path: 'blog/cadastro',
          component: () => import('../pages/blog/cadastro.vue'),
          beforeEnter: authMiddleware,
        },

        {
          path: 'sobre/edicao',
          component: () => import('../pages/sobre/index.vue'),
          beforeEnter: authMiddleware,
        },
        {
          path: 'blog/edicao/:id',
          component: () => import('../pages/blog/edicao/_id.vue'),
          beforeEnter: authMiddleware,
        },
        {
          path: 'empresa',
          component: () => import('../pages/empresa/editarEmpresa.vue'),
          beforeEnter: authMiddleware,
        },
        {
          path: 'empresa/cadastro',
          component: () => import('../pages/empresa/cadastrarEmpresa.vue'),
          beforeEnter: adminMiddleware,
        },
        // {
        //   path: 'typography',
        //   component: () => import('../pages/typography.vue'),
        // },
        // {
        //   path: 'icons',
        //   component: () => import('../pages/icons.vue'),
        // },
        // {
        //   path: 'cards',
        //   component: () => import('../pages/cards.vue'),
        // },

        {
          path: 'imoveis/listar',
          component: () => import('../pages/Imoveis/listar.vue'),
          beforeEnter: authMiddleware,
        },
        {
          path: 'imoveis/cadastro',
          component: () => import('../pages/Imoveis/cadastro.vue'),
          beforeEnter: authMiddleware,
        },
        {
          path: 'imoveis/edicao/:id',
          component: () => import('../pages/Imoveis/edicao/_id.vue'),
          beforeEnter: authMiddleware,
        },

        {
          path: 'usuarios/listar',
          component: () => import('../pages/usuarios/listar.vue'),
          beforeEnter: adminMiddleware,
        },
        {
          path: 'usuarios/edicao/:id',
          component: () => import('../pages/usuarios/_id.vue'),
          beforeEnter: authMiddleware,
        },

        {
          path: 'form-layouts',
          component: () => import('../pages/form-layouts.vue'),
        },
        {
          path: 'register',
          component: () => import('../pages/usuarios/register.vue'),
          beforeEnter: authMiddleware,
        },
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/blank.vue'),
      children: [
        {
          path: 'login',
          component: () => import('../pages/login.vue'),
        },
        
        {
          path: '/:pathMatch(.*)*',
          component: () => import('../pages/[...all].vue'),
        },
      ],
    },
  ],
})

export default router
