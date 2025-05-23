// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { user,name, description, priority, deadline } = event
    const result = await db.collection("todolist").add({
      data: {
        user,
        name,
        description,
        priority,
        deadline,
        checked: false
      }
    })
    return {
      success: true,
      result: result,
      message: '保存成功'
    }
  } catch (e) {
    return {
      success: false,
      message: e.toString()
    }
  }
}