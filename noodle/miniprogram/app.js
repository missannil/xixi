//app.js
import { store } from "./store/store";
import { createStoreBindings } from 'mobx-miniprogram-bindings'
App({
  onLaunch: function () {
    this.storeBindings = createStoreBindings(this, {
      store,
      actions: ['addUserInfo']
    })
    //登录
    //验证授权
    // wx.getSetting()
    //   .then(res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权 获取用户userInfo
    //       wx.getUserInfo()
    //         .then(res => {
    //           //获取到用户信息
    //           console.log('获取到用户信息:', res.userInfo)
    //           this.addUserInfo(res.userInfo)
    //           //云端同步用户信息
    //           wx.cloud.callFunction({
    //             name: "syncUserInfo",
    //             data: {
    //               userInfo: res.userInfo
    //             }
    //           }).then(res => {
    //             console.log(res)
    //           })
    //         })
    //     }
    //   })
    // console.log('app.js',this.globalData)
  },
  globalData: {}

})