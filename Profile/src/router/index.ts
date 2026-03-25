import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

/* 集中定义站点的页面路由、滚动行为与标题同步逻辑。 */

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    /* 切换页面后回到顶部，并保留轻微的平滑过渡感。 */

    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Home' },
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: () => import('../views/PortfolioView.vue'),
      meta: { title: 'Portfolio' },
    },
    {
      path: '/photography',
      name: 'photography',
      component: () => import('../views/PhotographyView.vue'),
      meta: { title: 'Photography' },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { title: 'About / Contact' },
    },
  ],
})

router.afterEach((to) => {
  /* 根据当前路由的元信息更新浏览器标签标题。 */

  const pageTitle = typeof to.meta.title === 'string' ? to.meta.title : 'Portfolio'
  document.title = `${pageTitle} | LENS / CODE`
})

export default router
