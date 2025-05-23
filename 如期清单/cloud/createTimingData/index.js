// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { user, date, time } = event
    const updateResult = await db.collection("timingData").where({
      user: user,
      date: date
    }).update({
      data: {
        duration: db.command.inc(time),
        frequency: db.command.inc(1)
      }
    })

    // 如果没有找到同一天的数据，则创建新记录
    if (updateResult.stats.updated === 0) {
      await db.collection("timingData").add({
        data: {
          user: user,
          date: date,
          duration: time,
          frequency: 1
        }
      })
    }

    return {
      success: true,
      message: '更新成功',
      updateResult
    }
  } catch (e) {
    return {
      success: false,
      message: '更新失败',
      error: e
    }
  }
}
