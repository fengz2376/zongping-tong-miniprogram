var deepseek = require('../../utils/deepseek')

Component({
  properties: {
    placeholder: {
      type: String,
      value: '输入你的问题...'
    },
    systemPrompt: {
      type: String,
      value: ''
    },
    showHeader: {
      type: Boolean,
      value: true
    },
    headerTitle: {
      type: String,
      value: 'AI 对话'
    }
  },

  data: {
    messages: [],
    input: '',
    isLoading: false,
    scrollToId: 'msg-bottom',
    apiReady: false
  },

  methods: {
    onInput: function (e) {
      this.setData({ input: e.detail.value })
    },

    onSend: function () {
      var text = this.data.input.trim()
      if (!text || this.data.isLoading) return

      var userMsg = {
        id: Date.now().toString(),
        role: 'user',
        content: text
      }

      var newMessages = this.data.messages.concat([userMsg])
      this.setData({
        messages: newMessages,
        input: '',
        isLoading: true,
        scrollToId: 'msg-bottom'
      })

      this.sendMessage(text, newMessages)
    },

    sendMessage: function (text, currentMessages) {
      var that = this
      var apiReady = deepseek.isApiReady()

      this.setData({ apiReady: apiReady })

      if (!apiReady) {
        setTimeout(function () {
          var answer = deepseek.getLocalAnswer(text)
          var localMsg = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: answer
          }
          that.setData({
            messages: that.data.messages.concat([localMsg]),
            isLoading: false,
            scrollToId: 'msg-bottom'
          })
        }, 300)
        return
      }

      var systemPrompt = this.data.systemPrompt
      var apiMessages = []
      if (systemPrompt) {
        apiMessages.push({ role: 'system', content: systemPrompt })
      }
      for (var i = 0; i < currentMessages.length; i++) {
        apiMessages.push({
          role: currentMessages[i].role,
          content: currentMessages[i].content
        })
      }

      deepseek.deepseekChat({
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 2048,
        timeout: 90000
      }).then(function (content) {
        var assistantMsg = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: content.trim() || '抱歉，我暂时无法回答这个问题。'
        }
        that.setData({
          messages: that.data.messages.concat([assistantMsg]),
          isLoading: false,
          scrollToId: 'msg-bottom'
        })
      }).catch(function (err) {
        var answer = deepseek.getLocalAnswer(text)
        var fallbackMsg = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: answer + '\n\n⚠️ AI增强模式暂时不可用：' + (err.message || '')
        }
        that.setData({
          messages: that.data.messages.concat([fallbackMsg]),
          isLoading: false,
          scrollToId: 'msg-bottom'
        })
      })
    },

    clearMessages: function () {
      this.setData({ messages: [], input: '', isLoading: false })
    },

    setInput: function (text) {
      this.setData({ input: text })
    }
  }
})
