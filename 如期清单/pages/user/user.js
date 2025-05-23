const app = getApp()

Page({
  data: {
    avatarUrl: "",
    nickname: "",
    isLogin: false,
  },

  changeTheme: function (e) {
    wx.navigateTo({
      url: "/pages/changeTheme/changeTheme"
    })
  },

  guidance: function (e) {
    wx.navigateTo({
      url: "/pages/guidance/guidance"
    })
  },

  policy: function (e) {
    wx.navigateTo({
      url: "/pages/policy/policy"
    })
  },

  login: function (e) {
    wx.navigateTo({
      url: "/pages/login/login"
    })
  },

  logout: function (e) {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      complete: (res) => {
        if (res.confirm) {
          app.globalData.isLogin = false
          app.globalData.avatarUrl = '/images/defaultAvatar.png'
          app.globalData.nickname = "微信用户"
          wx.removeStorageSync('isLogin')
          wx.removeStorageSync('nickname')
          wx.removeStorageSync('avatarUrl')
          wx.reLaunch({
            url: '/pages/user/user',
          })
        }
      }
    })
  },

  onReady(options) {
    let that = this
    let userAvatarUrl = app.globalData.avatarUrl
    let userNickname = app.globalData.nickname
    let userIsLogin = app.globalData.isLogin
    that.setData({
      avatarUrl: userAvatarUrl,
      nickname: userNickname,
      isLogin: userIsLogin
    })
  },

  onShow(options) {
    wx.setNavigationBarTitle({
      title: '我的'
    })
    let that = this
    let userAvatarUrl = app.globalData.avatarUrl
    let userNickname = app.globalData.nickname
    let userIsLogin = app.globalData.isLogin
    that.setData({
      avatarUrl: userAvatarUrl,
      nickname: userNickname,
      isLogin: userIsLogin
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})