// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
console.log('云函数getProjectData被调用')
exports.main = async (event, context) => {
  return  await db.collection('projectData').doc('projectData').get()
}
 
