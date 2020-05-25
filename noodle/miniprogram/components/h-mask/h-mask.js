// components/h-mask/h-mask.js
const capsule = wx.getMenuButtonBoundingClientRect(); //右上胶囊位置信息
const statusBarHeight = wx.getSystemInfoSync().statusBarHeight; //系统状态栏高度
const navigationBarHeight = capsule.top + capsule.bottom - statusBarHeight; //组件上导航组件高度
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  properties: {
    width: {
      type: String,
      value: "750",
    },
    height: {
      type: String,
      value: `calc(1334rpx - ${navigationBarHeight}px)`
    },
    show: {
      type: Boolean,
      value: false
    },
    top: {
      type: String,
      value: `${navigationBarHeight}`
    },
    innerWidth: {
      type: String,
      value: "550"
    },
    innerHeight: {
      type: String,
      value: '650'
    }
  },

  data: {
    navigationBarHeight,

  },

  methods: {
    hidMask() {
      this.setData({
        show: false
      })
    },
    stopBubble() {
      //uk
    },
  }
})