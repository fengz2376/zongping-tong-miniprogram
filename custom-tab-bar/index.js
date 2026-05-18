Component({
  data: {
    selected: 0,
    list: [
      {
        pagePath: '/pages/index/index',
        text: '综评流程',
        icon: '📋'
      },
      {
        pagePath: '/pages/personal-statement/index',
        text: 'AI工具',
        icon: '⚡'
      },
      {
        pagePath: '/pages/resources/index',
        text: '资料库',
        icon: '📚'
      },
      {
        pagePath: '/pages/ai-chat/index',
        text: '问AI',
        icon: '🤖'
      },
      {
        pagePath: '/pages/profile/index',
        text: '我的',
        icon: '👤'
      }
    ]
  },

  methods: {
    switchTab: function (e) {
      var data = e.currentTarget.dataset
      var url = data.path
      wx.switchTab({ url: url })
    }
  }
})
