// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { user, date } = event
    const todolist = await db.collection("todolist").where({
      user: user,
      deadline: date
    }).get()
    const finished = todolist.data.filter(item => item.checked)
    const unfinished = todolist.data.filter(item => !item.checked)

    const timingData = await db.collection("timingData").where({
      user: user,
      date: date
    }).get()

      const frequency = timingData.data[0].frequency
      const duration = timingData.data[0].duration
      return {
        success: true,
        unfinished: unfinished,
        finished: finished,
        frequency: frequency,
        duration: duration
    }
  } catch (e) {
    console.error(e)
    return {
      success: false,
      message: e.toString()
    }
  }
}