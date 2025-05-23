const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    color: String,
    todolist: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    user: app.globalData.nickname,
    todolist:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    checkboxChange(e) {
      console.log(e)
      const length = e.detail.value.length
      const name = e.detail.value[length - 1]
      console.log(name)
      wx.cloud.callFunction({
        name: 'check',
        data: {
          user: app.globalData.nickname,
          name: name
        }
      }).then(
        wx.reLaunch({
          url: '/pages/todo/todo',
        })
      )
    },
  
    taskDetail: function (e) {
      const name = e._relatedInfo.anchorRelatedText
      wx.navigateTo({
        url: `/pages/taskDetail/taskDetail?name=${name}`
      })
    },
  }
})