// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { nickname, password, avatarUrl } = event
  try {
    // 先查询数据库中是否存在指定昵称的用户
    const res = await db.collection('user').where({
      nickname: nickname
    }).get()

    // 如果查询结果为空，即数据库中不存在该用户，则新建一条数据
    if (res.data.length === 0) {
      const addRes = await db.collection('user').add({
        data: {
          nickname: nickname,
          password: password,
          avatar: avatarUrl
        }
      })
      return addRes
    } else {
      // 如果用户已存在，返回查询结果
      return res
    }
  } catch (e) {
    console.error(e)
    return { errMsg: '查询或添加失败', error: e }
  }
}