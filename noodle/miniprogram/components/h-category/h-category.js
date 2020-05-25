// components/h-category/h-category.js
import { storeBindingsBehavior} from 'mobx-miniprogram-bindings'
import { store } from '../../store/store'

Component({
  options: {
    addGlobalClass: true,
  },
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: ['description','categoryList']
  },

  data: {
    curIndex: 0,
  },

  methods: {
    getIndex(e) {
      const tempIndex = e.detail;
      this.setData({
        curIndex: tempIndex
      })
    },
  },
  lifetimes: {
    attached: function () {

    },
    moved: function () {},
    detached: function () {

    },
  },
})