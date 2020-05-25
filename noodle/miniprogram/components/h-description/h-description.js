// components/h-description/h-description.js
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../store/store'
Component({
  behaviors: [storeBindingsBehavior],
  options:{
    addGlobalClass: true,
  },
  properties:{
    url:{
      type:String,
      value:"/pages/location/location"
    },
    color:{
      type:String,
      value:''
    },
    bgColor:{
      type:String,
      value:''
    }
    
  },
  storeBindings: {
    store,
    fields: ['description']
  },
  data:{
    maskShow:false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    showMaskEvent(){
        this.setData({
          maskShow: true
        })
    },

    navigate(){
      wx.navigateTo({
        url: this.data.url,
        // events: {
        //   acceptDataFromOpenedPage: function(data) {
        //   },
        //  事件监控
        // },
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          // res.eventChannel.emit('acceptDataFromOpenerPage', 111111) 
        },
        fail(res){
          console.log(res)
        }
      })
    }
  },
  lifetimes: {
    attached: function () {
    },
    moved: function () {},
    detached: function () {},
  },
})