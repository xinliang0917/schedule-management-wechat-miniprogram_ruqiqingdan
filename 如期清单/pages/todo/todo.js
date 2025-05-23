const app = getApp()

Page({
  data: {
    todolist1: "",
    todolist2: "",
    todolist3: "",
    todolist4: "",
  },

  addTask: function (e) {
    wx.navigateTo({
      url: '/pages/newTask/newTask',
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
    if (app.globalData.isLogin) {
      const priorities = ["重要且紧急", "重要不紧急", "紧急不重要", "不重要不紧急"]
      const todolists = ["todolist1", "todolist2", "todolist3", "todolist4"]
      priorities.forEach((priority, index) => {
        wx.cloud.callFunction({
          name: "showList",
          data: {
            user: app.globalData.nickname,
            priority: priority
          }
        }).then(res => {
          console.log(res)
          this.setData({
            [todolists[index]]: res.result.data
          })
        })
      })
    }
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