var dataUtil = require('../../utils/data')

Page({
  data: {
    currentPhase: null,
    currentPhaseId: ''
  },

  onLoad: function () {
    this.loadData()
  },

  onShow: function () {},

  loadData: function () {
    var currentPhase = dataUtil.getCurrentPhase()
    this.setData({
      currentPhase: currentPhase,
      currentPhaseId: currentPhase ? currentPhase.id : ''
    })
  },

  goToPage: function (e) {
    var url = e.currentTarget.dataset.url
    wx.navigateTo({ url: url })
  }
})
