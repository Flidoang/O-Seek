import { createRouter, createWebHistory } from 'vue-router'

// Public Views
import PublicLayouts from '@/layouts/PublicLayouts.vue'
import LandingPageView from '@/view/public/LandingPageView.vue'
import RegisterView from '@/view/public/RegisterView.vue'
import LoginView from '@/view/public/LoginView.vue'
import AboutView from '@/view/public/AboutView.vue'
import DonationView from '@/view/public/DonationView.vue'

// Admin Views
import AdminLayouts from '@/layouts/AdminLayouts.vue'
import DashboardView from '@/view/admin/DashboardView.vue'
import ManagementView from '@/view/admin/ManagementView.vue'
import InfoDonasiView from '@/view/admin/InfoDonasiView.vue'
import CatatanAktivitasView from '@/view/admin/CatatanAktivitasView.vue'

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
          meta: { layout: 'login' },
        },
        {
          path: 'register',
          name: 'Register',
          component: RegisterView,
          meta: { layout: 'register' },
        },
      ],
    },
    {
      path: '/admin',
      component: AdminLayouts,
      redirect: { name: 'Dashboard' },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: DashboardView,
        },
        {
          path: 'management',
          name: 'Management',
          component: ManagementView,
        },
        {
          path: 'info-donasi',
          name: 'InfoDonasi',
          component: InfoDonasiView,
        },
        {
          path: 'catatan-aktivitas',
          name: 'CatatanAktivitas',
          component: CatatanAktivitasView,
        },
      ],
    },
  ],
})

export default router
