const app = getApp()
Page({
  data: {
    priorityList: ['重要且紧急', '重要不紧急', '紧急不重要', '不重要不紧急'],
    index: -1,
    name: '',
    priority: '',
    deadline: '',
    description: '',
    isSubmitting:false
  },

  getName: function (res) {
    this.setData({
      name: res.detail.value
    }, () => {
      console.log(this.data.name)
    })
  },

  choosePriority: function (e) {
    this.setData({
      index: e.detail.value,
      priority: this.data.priorityList[e.detail.value]
    })
  },

  chooseDate: function (e) {
    this.setData({
      deadline: e.detail.value
    }, () => {
      console.log(this.data.deadline)
    })
  },

  getDescription: function (res) {
    this.setData({
      description: res.detail.value
    }, () => {
      console.log(this.data.description)
    })
  },

  addTask: function () {
    this.setData({ 
      isSubmitting: true 
    })
    wx.cloud.callFunction({
      name: 'addTask',
      data: {
        user: app.globalData.nickname,
        name: this.data.name,
        description: this.data.description,
        priority: this.data.priority,
        deadline: this.data.deadline,
      },
      fail: function (err) {
        console.error(err)
      },
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: '保存成功',
          duration: 1000,
          complete: () => {
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/todo/todo',
              })
            }, 1000)
          }
        })
      },
    })
  },

  cancel: function (e) {
    wx.switchTab({
      url: '/pages/todo/todo',
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