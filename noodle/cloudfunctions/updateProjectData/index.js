// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const storageTimestamp = event.storageTimestamp;//当前缓存时间戳
  const result = await db.collection('projectData').field({  timestamp: true}).get();//服务器时间戳
  console.log(storageTimestamp,result.data[0].timestamp)
  if (storageTimestamp === result.data[0].timestamp) {//时间戳相等 返回false 不更新当地缓存
    return 
  } else {//时间戳不等，发送请求getProjectData并返回结果，结果有值，客户端会更新当地缓存。
    const result = await cloud.callFunction({
      name: "getProjectData"
    })
    return result.result.data
  }
}