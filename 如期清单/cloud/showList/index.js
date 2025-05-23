// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const { user, priority } = event
  try {
    const res = await db.collection('todolist').where({
      user: user,
      priority: priority
    }).get()
    return res
  } catch (e) {
    console.error(e)
    return { errMsg: '查询失败', error: e }
  }
}
