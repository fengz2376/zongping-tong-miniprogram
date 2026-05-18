var dataUtil = require('../../utils/data')
var calculator = require('../../utils/calculator')

Page({
  data: {
    gaokaoScore: '',
    interviewScore: '',
    universities: [],
    universityNames: [],
    selectedUni: null,
    selectedUniName: '',
    result: null,
    analysis: null,
    showComparison: false,
    comparisonData: []
  },

  onLoad: function () {
    var universities = dataUtil.getUniversities()
    var names = universities.map(function (u) { return u.name })
    this.setData({
      universities: universities,
      universityNames: names
    })
  },

  onGaokaoInput: function (e) {
    this.setData({ gaokaoScore: e.detail.value })
    this.calculate()
  },

  onInterviewInput: function (e) {
    this.setData({ interviewScore: e.detail.value })
    this.calculate()
  },

  calculate: function () {
    var score = this.data.gaokaoScore ? Number(this.data.gaokaoScore) : 0
    var interview = this.data.interviewScore ? Number(this.data.interviewScore) : 0

    if (score > 0 && interview >= 0 && this.data.interviewScore !== '') {
      var result = calculator.calculateComprehensiveScore(score, interview)
      this.setData({ result: result })
      this.updateAnalysis(score, result)
      this.updateComparison(score)
    } else if (score > 0) {
      this.updateAnalysis(score, null)
      this.updateComparison(score)
    } else {
      this.setData({ result: null, analysis: null })
    }
  },

  onTargetUniChange: function (e) {
    var index = e.detail.value
    var uni = this.data.universities[index]
    this.setData({
      selectedUni: uni,
      selectedUniName: uni.name
    })
    var score = this.data.gaokaoScore ? Number(this.data.gaokaoScore) : 0
    if (score > 0) {
      this.updateAnalysis(score, this.data.result)
    }
  },

  updateAnalysis: function (score, result) {
    var selectedUni = this.data.selectedUni
    if (!selectedUni || score <= 0) {
      this.setData({ analysis: null })
      return
    }

    var lines = selectedUni.admissionLines
    var years = Object.keys(lines).sort().reverse()
    var latest = lines[years[0]]
    var targetScore = latest.avgScore + 10
    var requiredInterview = calculator.calculateRequiredInterviewScore(score, targetScore)

    this.setData({
      analysis: {
        latestYear: years[0],
        minScore: latest.minScore,
        avgScore: latest.avgScore,
        targetScore: targetScore,
        requiredInterview: requiredInterview.toFixed(1),
        requiredInterviewNum: requiredInterview
      }
    })
  },

  updateComparison: function (score) {
    var universities = this.data.universities
    var comparisonData = []

    for (var i = 0; i < universities.length; i++) {
      var uni = universities[i]
      var lines = uni.admissionLines['2024']
      if (!lines) continue

      var required = calculator.calculateRequiredInterviewScore(score, lines.avgScore + 10)
      var requiredText = required > 0 ? required.toFixed(1) + '分' : '已达标'
      var difficulty = '非常难'
      var difficultyTag = 'difficulty-hard'

      if (required <= 90) {
        difficulty = '稳妥'
        difficultyTag = 'difficulty-safe'
      } else if (required <= 120) {
        difficulty = '有机会'
        difficultyTag = 'difficulty-chance'
      } else if (required <= 140) {
        difficulty = '挑战'
        difficultyTag = 'difficulty-hard'
      }

      comparisonData.push({
        id: uni.id,
        shortName: uni.shortName,
        type: uni.type,
        minScore: lines.minScore,
        requiredText: requiredText,
        difficulty: difficulty,
        difficultyTag: difficultyTag
      })
    }

    this.setData({ comparisonData: comparisonData })
  },

  toggleComparison: function () {
    this.setData({ showComparison: !this.data.showComparison })
  }
})
