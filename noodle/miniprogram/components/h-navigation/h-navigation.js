// components/cu-navigation/cu-navigation.js
// 系统信息参数
const capsule = wx.getMenuButtonBoundingClientRect();//右上胶囊位置信息
const statusBarHeight = wx.getSystemInfoSync().statusBarHeight;//系统状态栏高度
const navigationBarHeight = capsule.top + capsule.bottom - statusBarHeight;//组件上导航组件高度
console.log("获取系统信息,计算出上部navigation的高度为:", navigationBarHeight)
Component({
  options: {
    addGlobalClass: true,
  },
  data:{
    statusBarHeight,
    navigationBarHeight,
  },
  properties: { 
    back: {  
      type: Boolean,
      value:false
    },
    size:{
      type:Number,
      value:40
    },
    title:{
      type:String,
      value:''
    },
    titleColor:{
      type:String,
      value:''
    },
    bgColor:{
      type:String,
      value:''
    },
    backColor:{
      type:String,
      value:''
    }
  },
  methods: {
    navigateBack() {
        wx.navigateBack({
          delta: 1,
          success(){
            //make something
          }
        });
    }
  }
})