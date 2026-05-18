var dataUtil = require('../../utils/data')

Page({
  data: {
    uni: null,
    expandedGroups: {},
    admissionLinesList: []
  },

  onLoad: function (options) {
    if (options.id) {
      var uni = dataUtil.getUniversityById(options.id)
      if (uni) {
        var lines = uni.admissionLines
        var admissionLinesList = Object.keys(lines).sort().reverse().map(function (year) {
          return { year: year, minScore: lines[year].minScore, avgScore: lines[year].avgScore, note: lines[year].note || '' }
        })

        var expandedGroups = {}
        if (uni.majorGroups) {
          uni.majorGroups.forEach(function (_, idx) {
            expandedGroups[idx] = false
          })
        }

        this.setData({
          uni: uni,
          admissionLinesList: admissionLinesList,
          expandedGroups: expandedGroups
        })

        wx.setNavigationBarTitle({
          title: uni.name
        })
      }
    }
  },

  toggleGroup: function (e) {
    var idx = e.currentTarget.dataset.idx
    var key = 'expandedGroups.' + idx
    this.setData({
      [key]: !this.data.expandedGroups[idx]
    })
  },

  openWebsite: function () {
    if (this.data.uni && this.data.uni.website) {
      wx.setClipboardData({
        data: this.data.uni.website,
        success: function () {
          wx.showToast({ title: '链接已复制', icon: 'success' })
        }
      })
    }
  },

  copyLocation: function () {
    if (this.data.uni && this.data.uni.location) {
      wx.setClipboardData({
        data: this.data.uni.location,
        success: function () {
          wx.showToast({ title: '地址已复制', icon: 'success' })
        }
      })
    }
  }
})
