// components/h-selected/h-selected.js
Component({
  /**
   * 组件的属性列表
   */
	options: {
    addGlobalClass: true
  },
  properties: {
    color:{
      type:String,
      value:"theme"
    },
    selected: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
turnHandle(){
  	this.setData({
    selected:!this.data.selected
    })
    this.triggerEvent('change',{value:this.data.selected})
}
  }
})