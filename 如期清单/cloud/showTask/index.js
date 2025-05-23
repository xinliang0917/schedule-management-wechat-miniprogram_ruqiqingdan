// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { name } = event
    const res = await db.collection('todolist').where({
      name: name
    }).get()
    return res
  } catch (e) {
    console.error(e)
    return { errMsg: '查询失败', error: e }
  }
}