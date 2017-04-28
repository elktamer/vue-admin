import lazyLoading from './lazyLoading'

export default {
  meta: {
    label: 'UI Features',
    icon: 'fa-laptop',
    expanded: false
  },

  children: [
    {
      name: 'Form',
      path: '/form',
      meta: {
        link: 'ui/Form.vue'
      },
      component: lazyLoading('ui/Form')
    }
  ]
}
