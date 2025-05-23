const app = getApp()
const year = new Date().getFullYear()
const month = new Date().getMonth() + 1 < 10 ? '0' + new Date().getMonth() + 1 : new Date().getMonth() + 1
const day = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()
Page({
  data: {
    dayStyle: [
      { month: 'current', day: new Date().getDate(), color: 'white', background: '#AAD4F5' },
      { month: 'current', day: new Date().getDate(), color: 'white', background: '#AAD4F5' }
    ],
    date: `${year}-${month}-${day}`,
    todolist: '',
    unfinished: '',
    finished: '',
    _frequency: 0,
    _duration: 0
  },
  //监听点击下个月事件
  next: function (e) {
    console.log(e.detail)
  },
  //监听点击上个月事件
  prev: function (e) {
    console.log(e.detail)
  },

  // 监听点击日历标题日期选择器事件
  dateChange: function (e) {
    console.log(e.detail)
  },

  //监听点击日历改变颜色,获取数据
  dayClick: function (e) {
    let yearClick = e.detail.year
    let monthClick = e.detail.month < 10 ? '0' + e.detail.month : e.detail.month
    let dayClick = e.detail.day < 10 ? '0' + e.detail.day : e.detail.day
    this.data.date = `${yearClick}-${monthClick}-${dayClick}`
    let changeBgColor = 'dayStyle[0].color'
    let changeBg = 'dayStyle[0].background'
    let changeDay = 'dayStyle[1].day'
    let changeEndBg = 'dayStyle[1].background'
    this.setData({
      [changeDay]: dayClick,
      [changeBg]: "white",
      [changeBgColor]: "black",
      [changeEndBg]: "#AAD4F5"
    })
    console.log(this.data.date)
    if (app.globalData.isLogin) {
      wx.cloud.callFunction({
        name: 'showCalendar',
        data: {
          user: app.globalData.nickname,
          date: this.data.date
        },
        success: res => {
          console.log(res.result)
          if (res.result.success) {
            this.setData({
              unfinished: res.result.unfinished,
              finished: res.result.finished,
              _frequency: res.result.frequency,
              _duration: res.result.duration
            })
          } else {
            this.setData({
              unfinished: '',
              finished: '',
              _frequency: 0,
              _duration: 0
            })
          }
        }
      })
    }
  },

  checkboxChange(e) {
    console.log(e)
    const length = e.detail.value.length
    const name = e.detail.value[length - 1]
    wx.cloud.callFunction({
      name: 'check',
      data: {
        user: app.globalData.nickname,
        name: name
      }
    }).then(
      wx.reLaunch({
        url: '/pages/calendar/calendar',
      })
    )
  },

  taskDetail: function (e) {
    console.log(e)
    let name = e._relatedInfo.anchorTargetText
    console.log(name)
    wx.navigateTo({
      url: `/pages/taskDetail/taskDetail?name=${name}`
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
    console.log(this.data.date)
    if (app.globalData.isLogin) {
      wx.cloud.callFunction({
        name: 'showCalendar',
        data: {
          user: app.globalData.nickname,
          date: this.data.date
        },
        success: res => {
          console.log(res.result)
          this.setData({
            unfinished: res.result.unfinished,
            finished: res.result.finished,
            _frequency: res.result.frequency,
            _duration: res.result.duration
          })
        }
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