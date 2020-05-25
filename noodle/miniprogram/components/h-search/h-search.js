// components/h-search/h-search.js
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../store/store'

Component({
  options: {
    addGlobalClass: true,
  },

  properties: {
    width: {
      type: String,
      value: '100%'
    },
    height: {
      type: String,
      value: '100rpx'
    },
    borderColor: {
      type: String,
      value: 'theme'
    },
    bgColor: {
      type: String,
      value: 'var(--theme-color)'
    },
    onfoucs: {
      type: Boolean,
      value: false
    },
    inputValue: {
      type: String,
      value: ''
    }

  },
  /**
   * 组件的初始数据
   */
  data: {
    channel: false,
    result: false,
    searchResult: []
  },
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: ['description',"categoryList"],
    actions:['clearHis','addHistorySearch']
  },
  /**
   * 组件的方法列表
   */
  methods: {
    focus(e) {
      console.log("focus")
      this.setData({
        onfoucs: true,
        channel: true,
        result: false,
      })
    },
    clearHis() {
      console.log('clearHis')
      this.clearHis()
    },
    channelHandle(e) {
      this.data.channel=false;
      this.setData({
        inputValue:'',
        onfoucs:false,
        channel:false,
        result:false
      })
      wx.hideKeyboard()
    },
    addSearch(e) {//foucs的时候点击热门搜索词，要添加到为input输入框的value
      const searchName = e.currentTarget.dataset.name
      console.log("searchName")
      this.setData({
        inputValue: searchName
      })
    },
    confirm(e) {
      console.log("confirm", e.detail.value)
      const searchValue = e.detail.value
      if (searchValue.length) {
        const historyWords = this.data.description.historyWords;
        const findWords = historyWords.find(ele=>ele == searchValue)
        if(!findWords){
          this.addHistorySearch(searchValue)
        }
        this.setData({
          onfoucs: false,
          inputValue:searchValue,
        })
         this.search(searchValue)
      }
     
    },
    search(word) {
      let searchResult = []//模拟组件需求的格式
      this.data.categoryList.forEach(ele => {
        ele.children.forEach(item => {
          if (item.name.indexOf(word) != -1) {
            searchResult.push(item)
          }
        })
      })
      console.log("搜索结果是:",searchResult)
      this.setData({
        result: true,
        searchResult,
      })
      
    }

  }
})