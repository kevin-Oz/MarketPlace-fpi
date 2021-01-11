import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from "@/views/Dashboard";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Dashboard
  },
  {
    path: '/charts',
    name: 'charts',
    component: () => import(/* webpackChunkName: "charts" */ '../views/Charts.vue')
  },
  {
    path: '/detail/:ads',
    name: 'detail',
    component: () => import(/* webpackChunkName: "detail" */ '../views/PhoneDetail')
  },
  {
    path: '/new',
    name: 'new',
    component: () => import(/* webpackChunkName: "detail" */ '../components/NuevoAnuncio')
  }
]

const router = new VueRouter({
  routes
})

export default router
