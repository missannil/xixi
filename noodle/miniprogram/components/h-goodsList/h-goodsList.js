// components/h-goodsShow/h-goodsShow.js
import {
  storeBindingsBehavior
} from 'mobx-miniprogram-bindings';
import {
  store
} from "../../store/store"
Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    goodsList:{
      type:Array,
      value:[]
    },
    showSelected:{
      type:Boolean,
      value:false,
    },
    column: {
      type: Boolean,
      value: false
    },
    bgColor: {
      type: String,
      value: 'white'
    },
    color: {
      type: String,
      value: '#000'
    },
    curIndex: {
      type: Number,
      value: 0
    }
  },
  /**
   * 组件的初始数据
   */
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: {
      cart:"cart",
    },
    actions: ['addCart','reduceCart','changeItemSelected',]
  },
  data: {
    scrollTop: 0,
    scrollLeft: 0,
    top: 0
  },
  observers: {
    curIndex(newIndex) { //当side组件点击不同选项时，根据传过来的index来计算这个组件应该top多少距离
      let goodsCount = 0;
      for (let i = 0; i < newIndex; i++) { //计算newIndex之前的类别中商品数量的和
        goodsCount += this.data.goodsList[i].children.length
      }
      const top = `${goodsCount* 200}rpx` //和乘以每个高度 + 搜索栏高度就是应该top到的距离使用rpx
      this.setData({
        top,
      })
    },
    cart(data){
       const cart_arr = data.slice()
       const cart_obj = {};
       cart_arr.forEach(ele=>{
         cart_obj[ele.goods_id] = ele
       })
       this.setData({
         cart_obj:cart_obj
       })
    }
  },
  methods: {
    add(e) {
      const goodsData = e.currentTarget.dataset.goodsdata;
      this.addCart(goodsData)
    },
    reduce(e) {
      const goods_id = e.currentTarget.dataset.goods_id
      this.reduceCart(goods_id )
    },
    changeHandle(e){
        const goods_id = e.currentTarget.dataset.goods_id
        const selected = e.detail.value
        console.log(goods_id,selected)
        this.changeItemSelected([],goods_id,selected)
    }
  },
  lifetimes: {
    attached: function () {
      // this.updateStoreBindings()
      // console.log(this.data.top,this.data.cart)
    },
    detached: function () {

      // 在组件实例被从页面节点树移除时执行
    },
  },
})