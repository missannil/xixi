import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { store } from '../../store/store'
Page({
  data: {
    active: 0,
  },
  navigateTo(){
   wx.navigateTo({
     url: '/pages/login/login',
   })
  },
  changeActive(event) {
    // event.detail 的值为当前选中项的索引
    const active = event.detail.active;
    console.log(active)
    this.setData({
      active
    })
  },
onLoad(){
  this.storeBindings = createStoreBindings(this, {
    store,
    fields: ['tabbarList'],
  })
  this.storeBindings.updateStoreBindings()
  },
  onUnload() {
    this.storeBindings.destroyStoreBindings()//离开页面要解绑，不然内存溢出
  }

});
