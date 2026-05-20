var dataUtil = require('../../utils/data')

var stripeColors = ['indigo', 'purple', 'amber', 'emerald', 'rose', 'cyan', 'indigo', 'purple', 'amber', 'emerald', 'rose']

var faqData = [
  { q: '什么是上海高考综合评价批次？', a: '综合评价批次是上海高考招生的一种特殊方式，在普通批次之前进行。2026年共有11所高校（含浙大）通过综评录取学生，招生计划约2200+人。录取规则：综合成绩 = 高考成绩÷660×850 + 校测成绩（满分150分），高考占85%，面试占15%。', open: false },
  { q: '2026年综评报名时间是什么时候？', a: '2026年综评报名时间为5月12日至5月30日。考生需登录教育部阳光高考特殊类型招生信息服务平台（bm.chsi.com.cn）完成网上报名，打印申请表经中学审核盖章后上传，无需邮寄纸质材料。初审结果6月3日公布。', open: false },
  { q: '综评报名需要什么条件？', a: '具有上海市2026年高考报名资格、高中学业水平合格性考试全部合格的考生均可报名。高考成绩须达到上海市特殊类型招生控制分数线方可填报综评志愿。各校对选考科目有不同要求，具体以各校招生简章为准。', open: false },
  { q: '综评和普通批次有什么区别？', a: '综评在普通批次之前录取，未被综评录取不影响后续普通批次。综评增加了校测面试环节（占15%），是进入复交等名校的主渠道——复旦和交大每年在上海录取的学生中，超过90%通过综评批次。从性价比看：复旦、交大、浙大综评分数明显低于普通批；同济、华师大、上财差距不大；而上外、华理、东华、上大综评分数反而可能高于普通批，需权衡选择。', open: false },
  { q: '综评志愿可以填几个？', a: '2026年综评批次设置4个平行志愿，即考生可填报4个院校专业组。各校按专业组招生计划的1.5倍确定入围名单（末位同分全投）。报名阶段可同时报多所高校，建议报名2-3所增加入围机会。', open: false },
  { q: '面试1分 = 高考多少分？', a: '综合成绩中，高考转换分 = 高考成绩÷660×850，即高考每1分约等于1.29分综合分。面试满分150分，直接计入总分。因此面试1分 ≈ 高考(660÷850)×1 ≈ 0.78分。但从竞争角度，面试分差影响远大于高考分差——入围考生中至少三分之一无法被录取，面试是真正的决胜场。', open: false },
  { q: '2026年各校校测面试什么时候？', a: '2026年校测面试集中在7月初：复旦常规组7月7日前完成，数学英才班6月26-30日单独校测；交大、同济、华师大、上财、上外、华理7月6-7日；东华、上大7月7日；浙大7月6日（需赴海宁校区）。已被强基计划或香港高校录取的考生不再参加综评面试。', open: false },
  { q: '2026年复旦综评有什么新变化？', a: '2026年复旦综评最大变化是新增"数学英才班"专业组：具备数学学科特长的考生可报考，6月26-30日单独组织校测，重点考察数学思维与能力，按校测成绩确定入围名单。常规组仍分文社组、理工组、医学组，实行"三随机"配对（专家、考生、考场随机），5名专家独立打分排序。同分排序规则：校测成绩→高考总分→语文→数学→外语。', open: false },
  { q: '2026年交大综评有什么新变化？', a: '2026年交大综评专业布局大升级：首次新增"具身智能（拔尖英才试点班）""机器人工程（自主智能领军班）""机器人工程（智能系统拔尖班）"，以及"电气工程及其自动化（思源试点班）""海洋智能与无人技术""生物医学工程"等AI前沿方向。浦江国际学院（原密西根学院）依托张江国际理工学院全英语授课，新增机械工程、计算机、数据科学等中外合作方向。同分排序规则调整：2025年为高考→数学→面试，2026年改为高考→数学→外语→语文→面试。', open: false },
  { q: '华师大2026年综评面试有什么特点？', a: '华师大2026年继续采用AI面试+线下面试双重考核模式。AI面试结果作为校测参考，入围考生需在指定时间通过微信小程序完成AI面试（仅限一次）。线下校测7月6日在普陀校区进行。特别注意：色弱、色盲及颜色识别障碍考生，化学、心理学、生物科学、地理科学、计算机、经济学等相关专业不予录取。', open: false },
  { q: '2026年其他高校综评有哪些变化？', a: '上大：专业组调整为1个，取消社会学专业招生。上外：高考外语为英语可报所有专业组，非英语语种仅可报专业组2、3；报名阶段无需填报具体专业志愿。东华：综评录取学生入学后第一、第二学年各有1次全校范围内转专业资格。浙大：仅招5人，海宁国际校区就读，学费16万/学年，毕业获浙大与爱丁堡大学双学位。', open: false },
  { q: '个人陈述有什么要求？', a: '个人陈述（自我介绍）需突出社会责任感、专业志向与才能、个性特点与个人爱好，字数不超过500字。这是面试专家的重要参考材料，务必认真准备。建议针对目标高校的办学特色和面试风格进行个性化撰写，避免空话套话。', open: false },
  { q: '2025年综评入围分数线是多少？', a: '2025年各校入围线普遍上涨：复旦物化组598分（暴涨11分）、文社组587分；交大物化组590+；同济、华师大580+；上财574-577分；东华555-560分。2025年最低入围分为555分（东华不限组），对应全市排位约9302名，建议排名前1万名的考生重点关注。入围≠录取，各校入围比例约1.5倍，至少三分之一入围者无法被录取。', open: false },
  { q: '2026年高考招生有哪些大趋势？', a: '①大类招生被严控：教育部要求逐步回归按专业招生，"先进大类再分流"的机会减少，选专业要更慎重。②高校专项计划取消校测：2026年起凭高考成绩录取，竞争更公平也更激烈。③平行志愿"一轮投档"规则更严格：不服从调剂可能直接退档，只能等征集志愿。④体检标准细化：色觉异常等限制更严格，务必提前核查体检报告。', open: false }
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
