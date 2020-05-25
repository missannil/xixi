// components/sidebar/sidebar.js
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../store/store'
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true
  },
  properties: {
    column: {
      type: Boolean,
      value: false
    },
    height: {
      type: String,
      value: '100%'
    },
    activeBgColor: {
      type: String,
      value: 'white'
    },
    activeColor: {
      type: String,
      value: '#18b357'
    },
    bgColor: {
      type: String,
      value: '#eee'
    },
    color: {
      type: String,
      value: '#aaa'
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    curIndex: 0,
  },
  behaviors: [storeBindingsBehavior],
  storeBindings:{
    store,
    fields:['categoryList']
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeIndex(e) {
      const tempIndex = e.currentTarget.dataset.index
      this.setData({
        curIndex: tempIndex
      })
      this.triggerEvent("getIndex",tempIndex)
    }
  }
})