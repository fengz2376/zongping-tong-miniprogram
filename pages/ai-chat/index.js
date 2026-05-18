var deepseek = require('../../utils/deepseek')

Page({
  data: {
    systemPrompt: deepseek.CHAT_SYSTEM_PROMPT
  },

  onLoad: function () {},

  onShow: function () {},

  onQuickQuestion: function (e) {
    var question = e.currentTarget.dataset.q
    var chatBox = this.selectComponent('#chatBox')
    if (chatBox && question) {
      chatBox.setData({ input: question })
      chatBox.onSend()
    }
  }
})
