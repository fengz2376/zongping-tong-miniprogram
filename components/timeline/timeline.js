var dataUtil = require('../../utils/data')

Component({
  properties: {
    phases: {
      type: Array,
      value: []
    },
    currentPhaseId: {
      type: String,
      value: ''
    }
  },

  observers: {
    'phases': function (phases) {
      this.processPhases(phases)
    }
  },

  methods: {
    processPhases: function (phases) {
      var that = this
      var processed = phases.map(function (phase, index) {
        var status = dataUtil.getPhaseStatus(phase)
        var daysUntil = dataUtil.getDaysUntil(phase.startDate)
        var dateRange = dataUtil.formatDate(phase.startDate) + ' - ' + dataUtil.formatDate(phase.endDate)

        var checkedTasks = {}
        try {
          var saved = wx.getStorageSync('checkedTasks_' + phase.id)
          if (saved) {
            checkedTasks = JSON.parse(saved)
          }
        } catch (e) {}

        return {
          id: phase.id,
          title: phase.title,
          icon: phase.icon,
          color: phase.color,
          description: phase.description,
          tasks: phase.tasks,
          tips: phase.tips,
          status: status,
          daysUntil: daysUntil,
          dateRange: dateRange,
          isLast: index === phases.length - 1,
          checkedTasks: checkedTasks
        }
      })
      this.setData({ processedPhases: processed })
    },

    toggleTask: function (e) {
      var phaseId = e.currentTarget.dataset.phaseId
      var taskIndex = e.currentTarget.dataset.taskIndex
      var processedPhases = this.data.processedPhases

      for (var i = 0; i < processedPhases.length; i++) {
        if (processedPhases[i].id === phaseId) {
          var key = 'processedPhases[' + i + '].checkedTasks.' + taskIndex
          var newVal = !processedPhases[i].checkedTasks[taskIndex]
          this.setData({ [key]: newVal })

          try {
            wx.setStorageSync('checkedTasks_' + phaseId, JSON.stringify(processedPhases[i].checkedTasks))
          } catch (e) {}
          break
        }
      }
    }
  },

  data: {
    processedPhases: []
  }
})
