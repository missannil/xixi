// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const {
    OPENID
  } = cloud.getWXContext()
  console.log(OPENID)

   const result =  await db.collection('userInfo').where({
    open_id: OPENID
  }).get()
  console.log(result)
  return result
}