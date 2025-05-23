// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { user, name, priority, deadline, description} = event
    const res = await db.collection('todolist').doc(event._id).update({
      data: {
        user: user,
        name: name,
        priority: priority,
        deadline: deadline,
        description: description
      }
    })
    return { success: true, res }
  } catch (e) {
    console.error(e)
    return { success: false, error: e }
  }
}