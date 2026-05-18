var app = getApp()
var deepseek = require('../../utils/deepseek')

Page({
  data: {
    apiKey: '',
    showKey: false,
    hasKey: false,
    apiReady: false,
    isTesting: false,
    testResult: null
  },

  onLoad: function () {
    this.loadApiKey()
  },

  onShow: function () {
    this.loadApiKey()
  },

  loadApiKey: function () {
    try {
      var key = wx.getStorageSync('deepseekApiKey')
      var ready = deepseek.isApiReady()
      this.setData({
        apiKey: key || '',
        hasKey: !!key,
        apiReady: ready,
        testResult: null
      })
    } catch (e) {}
  },

  onApiKeyInput: function (e) {
    this.setData({ apiKey: e.detail.value, testResult: null })
  },

  toggleShowKey: function () {
    this.setData({ showKey: !this.data.showKey })
  },

  saveApiKey: function () {
    var key = this.data.apiKey.trim()
    if (!key) {
      wx.showToast({ title: '请输入 API Key', icon: 'none' })
      return
    }

    try {
      wx.setStorageSync('deepseekApiKey', key)
      app.globalData.deepseekApiKey = key
      app.globalData.apiReady = false
      try { wx.setStorageSync('apiReady', false) } catch (e) {}
      this.setData({ hasKey: true, apiReady: false, testResult: null })
      wx.showToast({ title: '保存成功，请测试连接', icon: 'none' })
    } catch (e) {
      wx.showToast({ title: '保存失败', icon: 'none' })
    }
  },

  testConnection: function () {
    var that = this
    this.setData({ isTesting: true, testResult: null })

    deepseek.testApiConnection().then(function () {
      that.setData({
        isTesting: false,
        apiReady: true,
        testResult: {
          success: true,
          message: '✅ 连接成功！AI增强模式已开启，所有AI功能可正常使用。'
        }
      })
    }).catch(function (err) {
      that.setData({
        isTesting: false,
        apiReady: false,
        testResult: {
          success: false,
          message: '❌ ' + (err.message || '连接失败')
        }
      })
    })
  },

  clearAllData: function () {
    wx.showModal({
      title: '确认清除',
      content: '将清除所有本地缓存数据（API Key不会被清除），确定继续？',
      confirmColor: '#dc2626',
      success: function (res) {
        if (res.confirm) {
          try {
            var info = wx.getStorageInfoSync()
            var keys = info.keys
            for (var i = 0; i < keys.length; i++) {
              if (keys[i] !== 'deepseekApiKey') {
                wx.removeStorageSync(keys[i])
              }
            }
            app.globalData.apiReady = false
            wx.showToast({ title: '清除成功', icon: 'success' })
          } catch (e) {
            wx.showToast({ title: '清除失败', icon: 'none' })
          }
        }
      }
    })
  }
})
