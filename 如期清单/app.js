App({
  globalData: {
    avatarUrl: "",
    nickname: "",
    isLogin: false,
    openid: "",
    theme: "cloud://lty-1goehl3i0f9005e4.6c74-lty-1goehl3i0f9005e4-1330872052/theme/山水.jpg"
  },
  onLaunch: function () {
    wx.cloud.init({
      env: 'lty-1goehl3i0f9005e4',
      traceUser: true,
    })
    const isLogin = wx.getStorageSync('isLogin');
    const nickname = wx.getStorageSync('nickname');
    const avatarUrl = wx.getStorageSync('avatarUrl');
    if (isLogin) {
      this.globalData.isLogin = isLogin;
      this.globalData.nickname = nickname;
      this.globalData.avatarUrl = avatarUrl;
    } else {
      wx.showModal({
        title: '提示',
        content: '登录以使用完整功能',
        complete: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }
      })
    }
  }
})