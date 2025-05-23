const app = getApp()

Page({
  data: {
    theme: '',
    clockShow: false,
    clockHeight: 0,
    time: 5,
    timer: null,
    mTime: 300000,
    eTime: 290000,
    timeStr: '05:00',
    rate: '',
    year: '',
    month: '',
    day: '',
    date: '',
    cateArr: [
      { icon: 'work', text: '工作' },
      { icon: 'study', text: '学习' },
      { icon: 'think', text: '冥想' },
      { icon: 'write', text: '写作' },
      { icon: 'sport', text: '运动' },
      { icon: 'read', text: '阅读' }
    ],
    cateActive: '0',
    clockText: "工作",
    isPlay: true,
    okShow: false,
    pauseShow: true,
    continueCancleShow: false
  },

  onLoad: function () {
    let res = wx.getWindowInfo()
    let rate = 750 / res.windowWidth
    this.setData({
      rate: rate,
      clockHeight: rate * res.windowHeight
    })
  },

  onShow: function () {
    let theme = app.globalData.theme
    this.setData({
      theme: theme
    })
  },

  slideChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },

  clickCate: function (e) {
    this.setData({
      cateActive: e.currentTarget.dataset.index,
      clockText: this.data.cateArr[e.currentTarget.dataset.index].text
    })
  },

  playMusic: function (e) {
    this.audioContext = wx.createInnerAudioContext()
    this.audioContext.src = 'cloud://lty-1goehl3i0f9005e4.6c74-lty-1goehl3i0f9005e4-1330872052/inanotebook.mp3'
    this.audioContext.loop = true
    this.audioContext.play()
  },

  isPlay: function (e) {
    this.setData({
      isPlay: !this.data.isPlay
    })
    if (this.data.isPlay && this.data.pauseShow) {
      this.audioContext.play()
    } else {
      this.audioContext.stop()
    }
  },


  drawBg: function () {
    const lineWidth = 10 / this.data.rate
    const query = wx.createSelectorQuery()
    query.select('#progress-bg')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        const dpr = wx.getWindowInfo().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)
        ctx.lineWidth = lineWidth
        ctx.strokeStyle = '#666666'
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.arc(400 / this.data.rate / 2, 400 / this.data.rate / 2, 350 / this.data.rate / 2 + 2 * lineWidth, 0, 2 * Math.PI, false)
        ctx.stroke()
      })
  },

  drawActive: function () {
    let _this = this
    let timer = setInterval(() => {
      let angle = 1.5 + 2 * (_this.data.time * 60 * 1000 - _this.data.eTime) / (_this.data.time * 60 * 1000)
      let currentTime = _this.data.mTime - 1000
      let currentTime1 = _this.data.eTime - 1000
      _this.setData({
        mTime: currentTime,
        eTime: currentTime1
      })
      if (angle < 3.5) {
        if (currentTime % 1000 === 0) {
          let timeStr1 = parseInt(currentTime / 1000)
          let timeStr2 = parseInt(timeStr1 / 60)
          let timeStr3 = (timeStr1 - timeStr2 * 60) >= 10 ? (timeStr1 - timeStr2 * 60) : '0' + (timeStr1 - timeStr2 * 60).toString()
          let timeStr4 = timeStr2 >= 10 ? timeStr2 : '0' + timeStr2.toString()
          _this.setData({
            timeStr: timeStr4 + ':' + timeStr3
          })
        }
        let lineWidth = 10 / _this.data.rate
        const query = wx.createSelectorQuery()
        query.select('#progress-active')
          .fields({ node: true, size: true })
          .exec((res) => {
            const canvas = res[0].node
            const ctx = canvas.getContext('2d')
            const dpr = wx.getWindowInfo().pixelRatio
            canvas.width = res[0].width * dpr
            canvas.height = res[0].height * dpr
            ctx.scale(dpr, dpr)
            ctx.lineWidth = lineWidth
            ctx.strokeStyle = '#FFFFFF'
            ctx.lineCap = 'round'
            ctx.beginPath()
            ctx.arc(400 / _this.data.rate / 2, 400 / _this.data.rate / 2, 350 / _this.data.rate / 2 + 2 * lineWidth, 1.5 * Math.PI, angle * Math.PI, false)
            ctx.stroke()
          })
      } else {
        let lineWidth = 6 / _this.data.rate
        const query = wx.createSelectorQuery()
        query.select('#progress-active').fields({ node: true, size: true }).exec((res) => {
          const canvas = res[0].node
          const ctx = canvas.getContext('2d')
          const dpr = wx.getWindowInfo().pixelRatio
          canvas.width = res[0].width * dpr
          canvas.height = res[0].height * dpr
          ctx.scale(dpr, dpr)
          ctx.lineWidth = lineWidth
          ctx.strokeStyle = '#666666'
          ctx.lineCap = 'round'
          ctx.beginPath()
          ctx.arc(400 / _this.data.rate / 2, 400 / _this.data.rate / 2, 350 / _this.data.rate / 2 + 2 * lineWidth, 1.5 * Math.PI, angle * Math.PI, false)
          ctx.stroke()
        })
        _this.setData({
          timeStr: '00:00',
          okShow: true,
          pauseShow: false,
          continueCancleShow: false
        })
        wx.showToast({
          title: '专注已完成',
          complete: () => {
            wx.cloud.callFunction({
              name: "createTimingData",
              data: {
                user: app.globalData.nickname,
                date: _this.data.date,
                time: _this.data.time
              },
              success: function (res) {
                console.log(res)
              },
              fail: function (err) {
                console.log(err)
              }
            })
          }
        })
        clearInterval(timer)
      }
    }, 1000)
    _this.setData({
      timer: timer
    })
  },

  start: function () {
    let date = new Date()
    let year = date.getFullYear()
    let month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    this.data.date = `${year}-${month}-${day}`
    this.setData({
      year: year,
      month: month,
      day: day,
      clockShow: true,
      mTime: this.data.time * 60 * 1000,
      eTime: this.data.time * 60 * 1000 - 1000,
      timeStr: parseInt(this.data.time) >= 10 ? this.data.time + ':00' : '0' + this.data.time + ':00'
    })
    this.drawBg()
    this.drawActive()
    this.playMusic()
  },

  pause: function () {
    clearInterval(this.data.timer)
    this.setData({
      pauseShow: false,
      continueCancleShow: true,
      okShow: false,
    })
    this.audioContext.pause()
  },

  continue: function () {
    this.drawActive()
    this.setData({
      pauseShow: true,
      continueCancleShow: false,
      okShow: false,
    })
    if (this.data.isPlay) {
      this.audioContext.play()
    }
  },

  cancle: function () {
    let _this = this
    wx.showModal({
      title: '温馨提示',
      content: '确定要结束专注吗？',
      success(res) {
        if (res.confirm) {
          clearInterval(_this.data.timer)
          _this.setData({
            pauseShow: true,
            continueCancleShow: false,
            okShow: false,
            clockShow: false,
          })
          _this.audioContext.stop()
        }
      }
    })
  },

  ok: function () {
    clearInterval(this.data.timer)
    this.setData({
      pauseShow: true,
      continueCancleShow: false,
      okShow: false,
      clockShow: false
    })
    this.audioContext.stop()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})
