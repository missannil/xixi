// components/h-cart/h-cart.js

import {
  storeBindingsBehavior
} from 'mobx-miniprogram-bindings';
import {
  store
} from "../../store/store"
Component({
  behaviors: [storeBindingsBehavior],
  /**
   * 组件的属性列表
   */
  storeBindings: {
    store,
    fields: ["description", "cart", "goodsCount", "totalPrice", "allSelected"],
    actions: ['addCart', 'reduceCart', "clearCart", "changeItemSelected"]
  },
  options: {
    addGlobalClass: true,
  },
  observers: {
    cart(data) {
      if (data.slice().length == 0) {
        this.setData({
          showList: false
        })
      }
    }
  },
  data: {
    showList: false,
    goodsList: []
  },

  methods: {
    changeHandle(e) {
      const status = e.detail.value;
      console.log(status)
      this.changeItemSelected(status)
    },
    navigatorTo(e) {
      wx.navigateTo({
        url: "/pages/pay/pay?id=12345",
        events: {
          sendData(data) { },
        },
        success: (res) => {
          const goodsList = this.data.goodsList
          res.eventChannel.emit('sendData', {
            data: goodsList
          })
        }
      })
    },
    stopBubble() {
      //为了事件阻止冒泡，无需动作
    },
    cartClear() {
      this.clearCart()
    },
    showGoodsList(e) {
      const goodsList = this.data.cart.slice()
      if (goodsList.length !== 0) {
        this.setData({
          showList: !this.data.showList
        })
      }
    },
  }
})