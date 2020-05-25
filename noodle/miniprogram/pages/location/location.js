// miniprogram/pages/location/location.js
import {
  createStoreBindings
} from 'mobx-miniprogram-bindings'
import {
  store
} from '../../store/store'
Page({
  onLoad: function (options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ["description"]
    })
  },
  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {
    this.storeBindings.destroyStoreBindings()
  },


  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})