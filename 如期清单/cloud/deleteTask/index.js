// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const { user, name } = event
  try {
    return await db.collection('todolist').where({
      user: user,
      name: name
    }).remove()
  } catch (e) {
    console.error(e)
    return e
  }
}