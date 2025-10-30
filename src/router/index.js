import { createRouter, createWebHistory } from 'vue-router'

import PublicLayouts from '@/layouts/PublicLayouts.vue'
import LandingPageView from '@/view/public/LandingPageView.vue'
import RegisterView from '@/view/public/RegisterView.vue'
import LoginView from '@/view/public/LoginView.vue'
import AboutView from '@/view/public/AboutView.vue'
import DonationView from '@/view/public/DonationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: PublicLayouts,
      redirect: { name: 'Home' },
      children: [
        {
          path: 'landingPage',
          name: 'Home',
          component: LandingPageView,
          meta: { layout: 'hero' }, // Tambahkan meta untuk hero layout
        },
        {
          path: 'about',
          name: 'About',
          component: AboutView,
          meta: { layout: 'tentang' }, // Default layout
        },
        {
          path: 'donation',
          name: 'Donation',
          component: DonationView,
          meta: { layout: 'default' },
        },
        {
          path: 'login',
          name: 'Login',
          component: LoginView,
          meta: { layout: 'default' },
        },
        {
          path: 'register',
          name: 'Register',
          component: RegisterView,
          meta: { layout: 'default' },
        },
      ],
    },
  ],
})

export default router
