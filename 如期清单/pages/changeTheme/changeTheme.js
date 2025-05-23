const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeList: [
      { index: 0, name: "山水", image: 'cloud://lty-1goehl3i0f9005e4.6c74-lty-1goehl3i0f9005e4-1330872052/theme/山水.jpg' },
      { index: 1, name: "海岸", image: 'cloud://lty-1goehl3i0f9005e4.6c74-lty-1goehl3i0f9005e4-1330872052/theme/海岸.jpg' },
      { index: 2, name: "星空", image: 'cloud://lty-1goehl3i0f9005e4.6c74-lty-1goehl3i0f9005e4-1330872052/theme/星空.jpg' },
      { index: 3, name: "晚霞", image: 'cloud://lty-1goehl3i0f9005e4.6c74-lty-1goehl3i0f9005e4-1330872052/theme/晚霞.jpg' },
      { index: 4, name: "森林", image: 'cloud://lty-1goehl3i0f9005e4.6c74-lty-1goehl3i0f9005e4-1330872052/theme/森林.jpg' },
      { index: 5, name: "橘子", image: 'cloud://lty-1goehl3i0f9005e4.6c74-lty-1goehl3i0f9005e4-1330872052/theme/橘子.jpg' },
    ],
    currentIndex: 0
  },
  changeTheme(e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    })
    app.globalData.theme = this.data.themeList[this.data.currentIndex].image
    wx.showToast({
      title: '切换成功',
      duration: 1000,
      complete: () => {
        setTimeout(function () {
          wx.switchTab({
            url: '/pages/user/user',
          })
        }, 1000)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})