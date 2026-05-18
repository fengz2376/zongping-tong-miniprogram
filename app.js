App({
  globalData: {
    deepseekApiKey: '',
    deepseekBaseUrl: 'https://api.deepseek.com/v1',
    selectedUniId: '',
    apiReady: false
  },

  onLaunch: function () {
    try {
      var key = wx.getStorageSync('deepseekApiKey')
      if (key) {
        this.globalData.deepseekApiKey = key
      }
      wx.removeStorageSync('apiReady')
    } catch (e) {}
  }
})
