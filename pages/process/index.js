var dataUtil = require('../../utils/data')

Page({
  data: {
    phases: [],
    currentPhase: null,
    currentPhaseId: ''
  },

  onLoad: function () {
    this.loadData()
  },

  loadData: function () {
    var phases = dataUtil.getTimelinePhases()
    var currentPhase = dataUtil.getCurrentPhase()
    this.setData({
      phases: phases,
      currentPhase: currentPhase,
      currentPhaseId: currentPhase ? currentPhase.id : ''
    })
  },

  onShow: function () {
    this.loadData()
  }
})
