const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    priorityList: ['重要且紧急', '重要不紧急', '紧急不重要', '不重要不紧急'],
    index: -1,
    _id: "",
    name: "",
    priority: "",
    deadline: "",
    description: ""
  },

  getName: function (res) {
    this.setData({
      name: res.detail.value
    }, () => {
      console.log(this.data.name)
    })
  },

  choosePriority: function (e) {
    console.log(e.detail)
    this.setData({
      index: e.detail.value,
      priority: this.data.priorityList[e.detail.value]
    })
  },

  chooseDate: function (e) {
    console.log(e.detail.value)
    this.setData({
      deadline: e.detail.value
    })
  },

  getDescription: function (res) {
    this.setData({
      description: res.detail.value
    }, () => {
      console.log(this.data.description)
    })
  },

  delete: function (e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除这项任务吗？',
      complete: (res) => {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'deleteTask',
            data: {
              user: app.globalData.nickname,
              name: this.data.name
            }
          }).then(res => {
            console.log(res)
            wx.showToast({
              title: '删除成功',
              duration: 1000,
              complete: () => {
                setTimeout(function () {
                  wx.switchTab({
                    url: '/pages/todo/todo',
                  })
                }, 1000)
              }
            })
          })
        }
      }
    })
  },

  update: function (e) {
    wx.cloud.callFunction({
      name: 'updateTask',
      data: {
        user: app.globalData.nickname,
        _id: this.data._id,
        name: this.data.name,
        priority: this.data.priority,
        deadline: this.data.deadline,
        description: this.data.description
      }
    }).then(res => {
      console.log(res)
    })
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    wx.cloud.callFunction({
      name: "showTask",
      data: {
        name: options.name
      }
    }).then(res => {
      console.log(res.result.data)
      this.setData({
        _id: res.result.data[0]._id,
        name: res.result.data[0].name,
        priority: res.result.data[0].priority,
        deadline: res.result.data[0].deadline,
        description: res.result.data[0].description
      })
    })
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