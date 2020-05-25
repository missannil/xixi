import { observable, action, toJS } from 'mobx-miniprogram';
import { cloudInit } from "../utils/cloudInit/cloudInit"
console.log("初始化云端")
cloudInit('test1-lwhiu')
console.log("建立store全局状态管理") //log
export const store = observable({
  // 数据字段
  isLogin: false,
  cart: [],
  userInfo: {},
  tabbarList: {},
  categoryList: [],
  description: {},
  userInfo: [],
  get goodsCount() {
    let count = 0
    this.cart.slice().forEach(ele => {
      if (ele.selected) {
        count += ele.count
      }
    })
    return count
  },
  get totalPrice() {
    let price = 0;
    this.cart.slice().forEach(ele => {
      if (ele.selected) {
        price += ele.count * ele.price
      }
    })
    return price
  },
  get allSelected() {
    return this.cart.slice().every(ele => ele.selected)
  },
  //action函数
  setUserInfo: action(function (userInfo) {
    console.log(userInfo, this.userInfo, toJS(this.userInfo))
    this.userInfo = userInfo
    console.log(this.userInfo)
  }),
  changeItemSelected: action(function (allStatus = [], id, status) {
    let cart = this.cart.slice()
    console.log(allStatus, id, status)
    if (Array.isArray(allStatus)) {
      cart.find(ele => {
        ele.goods_id == id && (ele.selected = status)
      })
    } else {
      cart.forEach(ele => {
        ele.selected = allStatus
      })
    }
    this.cart = cart
  }),

  addCart: action(function (data) {
    const arr = this.cart.slice();
    const index = arr.findIndex(ele => {
      return ele.goods_id == data.goods_id
    })
    if (index == -1) {

      arr.push(data)
      arr[arr.length - 1].selected = true
      arr[arr.length - 1].count = 1
    } else {
      arr[index].count++
    }
    this.cart = arr
  }),
  reduceCart: action(function (goods_id) {
    const arr = this.cart.slice();
    const index = arr.findIndex(ele => ele.goods_id == goods_id)
    if (arr[index].count == 1) {
      arr.splice(index, 1)
    } else {
      arr[index].count--
    }
    this.cart = arr
  }),
  clearCart: action(function () {
    this.cart = [];

  }),
  clearHis: action(function () {
    const tempData = toJS(this.description)
    tempData.historyWords = []
    this.description = tempData
  }),
  addHistorySearch: action(function (searchName) {
    const tempData = toJS(this.description)
    console.log(searchName, tempData)
    tempData.historyWords.push(searchName)
    this.description = tempData

  }),
  addUserInfo: action(function (userInfo) {
    this.userInfo = userInfo;
    this.isLogin = true
    console.log("用户登录成功")
  })

})

//加载数据

async function checkData(storageTimestamp) {
  console.log("验证更新,发送请求")//验证更新
  const res = await wx.cloud.callFunction({
    name: "updateProjectData",
    data: {
      storageTimestamp
    }
  })
  console.log('返回验证数据', res)
  if (!res.result) {
    console.log('当前是最新版,不用更新缓存')
    return true
  } else {
    try {
      wx.setStorageSync('projectData', res.result)
      console.log('更新当地缓存完毕,提示有新的更新,点击确定')
      return false
    } catch (e) {
      console.log(e)
    }
  }
}
async function loadingData() {
  console.log('读取本地缓存')//log
  wx.showLoading({
    title: '数据加载中',
  })
  const projectData = wx.getStorageSync('projectData')
  if (projectData) {
    console.log('当地缓存存在,加载到store');
    store.categoryList = projectData.categoryList;
    store.description = projectData.description;
    store.tabbarList = projectData.tabbarList;
    wx.hideLoading()
    const res = await checkData(projectData.timestamp) //校验数据更新
    console.log(res)
    if (!res) {
      wx.showModal({
        title:'更新提示',
        content:"数据更新完毕,是否马上重启程序?",
        success:function(res){
          if(res.confirm){
            console.log(res,'点了重启')
          }else{
            console.log('点了取消')
          }
        }
      })
    }
  } else {
    console.log('没有当地缓存数据,发送请求云端')
    const res = await wx.cloud.callFunction({
      name: 'getProjectData'
    })
   
    const projectData = res.result.data
    
    console.log('云端返回数据结果:', projectData, '加入store状态管理')
    store.categoryList = projectData.categoryList;
    store.description = projectData.description;
    store.tabbarList = projectData.tabbarList;
    wx.hideLoading()
    console.log('缓存当前数据')
    try {
      wx.setStorageSync('projectData', projectData)
    } catch (e) {
      console.log(e)
    }
  }
}
loadingData()














  //   wx.cloud.callFunction({
  //     name: "updateProjectData",
  //     data: {
  //       userTimestamp: projectData.timestamp
  //     }
  //   }).then(res => {
  //     console.log('返回验证数据', res)
  //     if (!res.result) {
  //       console.log('当前是最新版,不用更新缓存')
  //     } else {
  //       try {
  //         wx.setStorageSync('projectData', res.result)
  //         console.log('更新当地缓存完毕,提示有新的更新,点击确定')
  //       } catch (e) {
  //         console.log(e)
  //       }
  //     }
  //   }).catch(res => {
  //     console.log(res)
  //   })
  // } else {
  //   console.log('没有当地缓存数据,发送请求云端')
  //   wx.cloud.callFunction({
  //     name: 'getProjectData'
  //   }).then(res => {
  //     const projectData = res.result.data
  //     console.log('云端返回数据结果:', projectData, '加入store状态管理')
  //     store.categoryList = projectData.categoryList;
  //     store.description = projectData.description;
  //     store.tabbarList = projectData.tabbarList;
  //     console.log('缓存当前数据')
  //     try {
  //       wx.setStorageSync('projectData', projectData)
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   }).catch(res => {
  //     console.log("请求云端projectData数据失败,错误信息:", res)
  //   })
  // }