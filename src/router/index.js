import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/page/home'
import workPage from '@/page/workPage'
import loanPage from '@/page/loanPage'
import propertyPage from '@/page/propertyPage'
import successPage from '@/page/successPage'
import exam1 from '@/page/exam1'
import result from '@/page/result'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld,
      redirect: '/home'
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/loanPage',
      name: 'loanPage',
      component: loanPage,
      props: (route) => {id: route.query.id}
    },
    {
      path: '/workPage',
      name: 'workPage',
      component: workPage,
      props: (route) => {id: route.query.id}
    },
    {
      path: '/propertyPage',
      name: 'propertyPage',
      component: propertyPage,
      props: (route) => {id: route.query.id}
    },
    {
      path: '/successPage',
      name: 'successPage',
      component: successPage,
      props: (route) => {id: route.query.id}
    },
    {
      name: 'Result',
      path: '/result',
      component: result
    }
  ]
})
