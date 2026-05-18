var dataUtil = require('../../utils/data')
var deepseek = require('../../utils/deepseek')

Page({
  data: {
    tab: 'practice',
    tabs: [
      { id: 'practice', label: 'AI模拟面试' },
      { id: 'guide', label: '高校面试指南' },
      { id: 'questions', label: '面试题库' },
      { id: 'skills', label: '面试技巧' }
    ],
    universities: [],
    universityNames: [],
    selectedUni: '',
    selectedUniName: '',
    studentPS: '',
    chatMessages: [],
    input: '',
    isLoading: false,
    scrollToId: 'chat-bottom',
    categories: [],
    selectedCategory: 'all',
    filteredQuestions: [],
    skills: { forms: [], dimensions: [] }
  },

  onLoad: function () {
    var universities = dataUtil.getUniversities()
    var names = universities.map(function (u) { return u.name })
    var categories = dataUtil.getInterviewCategories()
    var questions = dataUtil.getInterviewQuestions()
    var skills = dataUtil.getInterviewSkills()

    var filteredQuestions = questions.map(function (q) {
      var cat = categories.find(function (c) { return c.id === q.category })
      q.categoryName = cat ? cat.name : q.category
      return q
    })

    this.setData({
      universities: universities,
      universityNames: names,
      categories: categories,
      filteredQuestions: filteredQuestions,
      skills: skills
    })
  },

  switchTab: function (e) {
    this.setData({ tab: e.currentTarget.dataset.tab })
  },

  onUniChange: function (e) {
    var index = e.detail.value
    var uni = this.data.universities[index]
    this.setData({
      selectedUni: uni.id,
      selectedUniName: uni.name
    })
  },

  onPSInput: function (e) {
    this.setData({ studentPS: e.detail.value })
  },

  handleStartInterview: function () {
    if (!this.data.selectedUni) {
      wx.showToast({ title: '请先选择目标高校', icon: 'none' })
      return
    }

    var that = this
    this.setData({ chatMessages: [], isLoading: true })

    var apiReady = deepseek.isApiReady()
    if (!apiReady) {
      that.setData({
        chatMessages: [{ role: 'assistant', content: '⚠️ 未配置 DeepSeek API Key，无法启动AI面试。\n\n请前往「我的」页面配置 API Key 后再试。未配置时面试模拟功能不可用，但你可以浏览面试指南、题库和技巧。' }],
        isLoading: false
      })
      return
    }

    var uni = this.data.universities.find(function (u) { return u.id === that.data.selectedUni })
    var promptInfo = deepseek.interviewPrompt(uni.name, this.data.studentPS || '')

    var userMessage = '请以面试官身份开始面试。先说开场白，然后提出第一个问题。'

    deepseek.deepseekChat({
      messages: [
        { role: 'system', content: promptInfo.system },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.8,
      max_tokens: 2000,
      timeout: 60000
    }).then(function (content) {
      that.setData({
        chatMessages: [{ role: 'assistant', content: content.trim() || '同学你好，欢迎参加综评面试。' }],
        isLoading: false,
        scrollToId: 'chat-bottom'
      })
    }).catch(function (err) {
      that.setData({
        chatMessages: [{ role: 'assistant', content: '❌ ' + (err.message || '面试系统暂不可用') + '\n\n请检查API Key是否正确，或前往「我的」页面重新配置。' }],
        isLoading: false
      })
    })
  },

  onChatInput: function (e) {
    this.setData({ input: e.detail.value })
  },

  handleSendAnswer: function () {
    if (!this.data.input.trim() || this.data.isLoading) return

    var userMsg = { role: 'user', content: this.data.input }
    var newMessages = this.data.chatMessages.concat([userMsg])
    this.setData({
      chatMessages: newMessages,
      input: '',
      isLoading: true,
      scrollToId: 'chat-bottom'
    })

    var that = this
    var uni = this.data.universities.find(function (u) { return u.id === that.data.selectedUni })
    var promptInfo = deepseek.interviewPrompt(uni.name, this.data.studentPS || '')

    var apiMessages = [{ role: 'system', content: promptInfo.system }]
    for (var i = 0; i < newMessages.length; i++) {
      apiMessages.push({ role: newMessages[i].role, content: newMessages[i].content })
    }
    apiMessages.push({ role: 'user', content: '考生已回答完毕，请根据ta的回答进行追问或提出下一个问题。如果面试接近15分钟，请准备总结。' })

    deepseek.deepseekChat({
      messages: apiMessages,
      temperature: 0.8,
      max_tokens: 2000,
      timeout: 60000
    }).then(function (content) {
      var assistantMsg = { role: 'assistant', content: content.trim() || '好的，我们继续。' }
      that.setData({
        chatMessages: that.data.chatMessages.concat([assistantMsg]),
        isLoading: false,
        scrollToId: 'chat-bottom'
      })
    }).catch(function (err) {
      var errorMsg = { role: 'assistant', content: '❌ ' + (err.message || '网络请求失败') + '\n\n请检查网络连接和API Key配置。' }
      that.setData({
        chatMessages: that.data.chatMessages.concat([errorMsg]),
        isLoading: false
      })
    })
  },

  selectCategory: function (e) {
    var cat = e.currentTarget.dataset.cat
    var questions = dataUtil.getInterviewQuestions(undefined, cat === 'all' ? undefined : cat)
    var categories = this.data.categories
    var filteredQuestions = questions.map(function (q) {
      var c = categories.find(function (c) { return c.id === q.category })
      q.categoryName = c ? c.name : q.category
      return q
    })
    this.setData({
      selectedCategory: cat,
      filteredQuestions: filteredQuestions
    })
  }
})
