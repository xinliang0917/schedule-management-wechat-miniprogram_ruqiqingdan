// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const { user,name } = event
  const res = await db.collection('todolist').where({
    user: user,
    name: name
  }).get()
  console.log(res)
  const checked = res.data[0].checked
  await db.collection('todolist').doc(res.data[0]._id).update({
    data: {
      checked: !checked
    }
  })
  return {
    success: true,
    message: '任务状态更新成功'
  }
}