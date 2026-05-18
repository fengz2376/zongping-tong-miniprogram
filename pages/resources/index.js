var dataUtil = require('../../utils/data')

var stripeColors = ['indigo', 'purple', 'amber', 'emerald', 'rose', 'cyan', 'indigo', 'purple', 'amber', 'emerald', 'rose']

var faqData = [
  { q: '什么是上海高考综合评价批次？', a: '综合评价批次是上海高考招生的一种特殊方式，在普通批次之前进行。11所沪上顶尖高校（含浙大）通过综评录取学生。录取规则：综合成绩 = 高考成绩÷660×850 + 校测成绩（满分150分）。', open: false },
  { q: '综评报名需要什么条件？', a: '具有上海市高考报名资格的考生均可报名综评批次。各校对高中学业水平考试成绩等有基本要求，具体以各校招生简章为准。', open: false },
  { q: '综评和普通批次有什么区别？', a: '综评在普通批次之前录取，未被综评录取不影响后续普通批次。综评增加了校测面试环节，面试成绩占总分的15%。', open: false },
  { q: '可以同时报名多所高校吗？', a: '报名阶段可以同时报多所高校，但志愿填报时综评批次只能选1所。建议报名2-3所，增加入围机会。', open: false },
  { q: '面试1分 = 高考多少分？', a: '综合成绩中，高考转换分 = 高考成绩÷660×850，即高考每1分约等于1.29分综合分。面试满分150分，直接计入总分。因此面试1分 ≈ 高考(660÷850)×1 ≈ 0.78分。但从竞争角度，面试分差影响远大于高考分差，是真正的决胜场。', open: false },
  { q: '个人陈述有什么要求？', a: '个人陈述（自我介绍）需突出社会责任感、专业志向与才能、个性特点与个人爱好，字数不超过500字。这是面试专家的重要参考材料，务必认真准备。', open: false },
  { q: '什么时间出初审结果？', a: '2026年初审结果预计在6月3日公布，各校具体时间略有差异，请关注各校招生网通知。', open: false },
  { q: '校测面试是什么时候？', a: '2026年校测面试预计在7月6-7日进行，各校具体安排将在入围名单公布后通知。', open: false }
]

Page({
  data: {
    tab: 'universities',
    tabs: [
      { id: 'universities', label: '高校速查' },
      { id: 'policies', label: '政策解读' },
      { id: 'lines', label: '历年分数线' },
      { id: 'faq', label: '常见问题' }
    ],
    universities: [],
    filteredUnis: [],
    searchTerm: '',
    filterUni: 'all',
    faqData: faqData,
    filteredFAQ: faqData
  },

  onLoad: function (options) {
    var universities = dataUtil.getUniversities()
    var processedUnis = universities.map(function (uni, idx) {
      var lines = uni.admissionLines
      var admissionLinesList = Object.keys(lines).sort().reverse().map(function (year) {
        return { year: year, minScore: lines[year].minScore, avgScore: lines[year].avgScore }
      })
      uni.admissionLinesList = admissionLinesList
      uni.stripeColor = stripeColors[idx % stripeColors.length]
      return uni
    })

    this.setData({
      universities: processedUnis,
      filteredUnis: processedUnis
    })

    if (options && options.uni) {
      this.setData({ filterUni: options.uni })
      this.filterUniversities(options.uni, this.data.searchTerm)
    }
  },

  onShow: function () {
    var selectedUniId = getApp().globalData.selectedUniId
    if (selectedUniId) {
      this.setData({ filterUni: selectedUniId })
      this.filterUniversities(selectedUniId, this.data.searchTerm)
      getApp().globalData.selectedUniId = ''
    }
  },

  switchTab: function (e) {
    this.setData({ tab: e.currentTarget.dataset.tab })
  },

  onSearch: function (e) {
    var term = e.detail.value
    this.setData({ searchTerm: term })
    this.filterUniversities(this.data.filterUni, term)
    this.filterFAQ(term)
  },

  setFilterUni: function (e) {
    var uni = e.currentTarget.dataset.uni
    this.setData({ filterUni: uni })
    this.filterUniversities(uni, this.data.searchTerm)
  },

  filterUniversities: function (filterUni, searchTerm) {
    var universities = this.data.universities
    var filtered = universities.filter(function (u) {
      var matchUni = filterUni === 'all' || u.id === filterUni
      var matchSearch = !searchTerm ||
        u.name.indexOf(searchTerm) !== -1 ||
        u.shortName.indexOf(searchTerm) !== -1 ||
        u.interviewForm.indexOf(searchTerm) !== -1
      return matchUni && matchSearch
    })
    this.setData({ filteredUnis: filtered })
  },

  filterFAQ: function (searchTerm) {
    if (!searchTerm) {
      this.setData({ filteredFAQ: faqData })
      return
    }
    var filtered = faqData.filter(function (f) {
      return f.q.indexOf(searchTerm) !== -1 || f.a.indexOf(searchTerm) !== -1
    })
    this.setData({ filteredFAQ: filtered })
  },

  toggleFAQ: function (e) {
    var index = e.currentTarget.dataset.index
    var key = 'filteredFAQ[' + index + '].open'
    this.setData({ [key]: !this.data.filteredFAQ[index].open })
  },

  goToDetail: function (e) {
    var id = e.currentTarget.dataset.id
    if (id) {
      wx.navigateTo({
        url: '/pages/university-detail/index?id=' + id
      })
    }
  }
})
