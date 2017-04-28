import lazyLoading from './lazyLoading'

export default {
  name: 'CRA info',
  path: '/cra',
  meta: {
    icon: 'fa-bar-chart-o',
    expanded: false,
    link: 'cra/index.vue'
  },
  component: lazyLoading('charts', true),

  children: [
    {
      name: 'CRAist',
      path: 'craist',
      component: lazyLoading('cra/Craist'),
      meta: {
        link: 'cra/Craist.vue'
      }
    }
  ]
}
