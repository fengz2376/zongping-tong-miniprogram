var dataUtil = require('../../utils/data')
var deepseek = require('../../utils/deepseek')
var util = require('../../utils/util')

var styles = [
  { id: 'sincere', name: '真诚朴实', desc: '用真实经历打动人', icon: '💝' },
  { id: 'academic', name: '学术深耕', desc: '突出科研与学术潜力', icon: '🔬' },
  { id: 'wellrounded', name: '全面发展', desc: '展示多维度成长', icon: '🌟' },
  { id: 'storytelling', name: '故事驱动', desc: '以叙事串联经历', icon: '📖' }
]

var subjectCombos = ['物化生', '物化地', '物化政', '物生地', '物生政', '物地政', '史政地', '史政生', '其他']

Page({
  data: {
    form: {
      universityId: '',
      university: '',
      major: '',
      majorGroup: '',
      subjectCombo: '',
      strongSubjects: '',
      keyAchievement: '',
      research: '',
      social: '',
      personality: '',
      story: '',
      hobbies: '',
      style: 'sincere'
    },
    styles: styles,
    subjectCombos: subjectCombos,
    universities: [],
    universityNames: [],
    majorGroupNames: [],
    selectedUni: null,
    result: '',
    isGenerating: false,
    refineInput: '',
    refineHistory: []
  },

  onLoad: function () {
    var universities = dataUtil.getUniversities()
    var names = universities.map(function (u) { return u.name })
    this.setData({
      universities: universities,
      universityNames: names
    })
  },

  onUniversityChange: function (e) {
    var index = e.detail.value
    var uni = this.data.universities[index]
    var groupNames = uni.majorGroups ? uni.majorGroups.map(function (g) { return g.group }) : []
    this.setData({
      selectedUni: uni,
      'form.universityId': uni.id,
      'form.university': uni.name,
      'form.majorGroup': '',
      majorGroupNames: groupNames
    })
  },

  onMajorGroupChange: function (e) {
    var index = e.detail.value
    var groupName = this.data.majorGroupNames[index]
    this.setData({ 'form.majorGroup': groupName })
  },

  onInput: function (e) {
    var field = e.currentTarget.dataset.field
    this.setData({ ['form.' + field]: e.detail.value })
  },

  selectStyle: function (e) {
    this.setData({ 'form.style': e.currentTarget.dataset.style })
  },

  selectSubject: function (e) {
    var value = e.currentTarget.dataset.value
    this.setData({
      'form.subjectCombo': this.data.form.subjectCombo === value ? '' : value
    })
  },

  handleGenerate: function () {
    if (!this.data.form.universityId) {
      wx.showToast({ title: '请先选择目标高校', icon: 'none' })
      return
    }

    var that = this
    var form = this.data.form
    var uni = this.data.selectedUni
    this.setData({ isGenerating: true, result: '' })

    var apiReady = deepseek.isApiReady()

    if (!apiReady) {
      wx.showToast({ title: '未配置API Key，使用模板生成', icon: 'none', duration: 2000 })
      var fallback = deepseek.generateFallbackStatement({
        university: form.university, major: form.major,
        awards: form.keyAchievement, research: form.research,
        social: form.social, hobbies: form.hobbies, style: form.style
      })
      setTimeout(function () {
        that.setData({ result: fallback, isGenerating: false })
      }, 500)
      return
    }

    var systemPrompt = '你是一位资深的高考综评个人陈述写作指导老师，不是AI助手。你的任务是根据学生的真实信息，撰写一篇面向' + form.university + '的个人陈述。\n\n' +
      '【硬性规则——必须遵守】\n' +
      '1. 总字数严格不超过500字（含标点）\n' +
      '2. 必须涵盖：社会责任感、专业志向与才能、个性特点与个人爱好\n' +
      '3. 针对' + form.university + '的招生偏好：' + (uni.preferences || '') + '\n' +
      '4. 不要出现"尊敬的老师""您好"等书信格式\n' +
      '5. 不要出现"我深信""我相信""综上所述""总而言之"等套话\n\n' +
      '【去AI化规则——至关重要】\n' +
      '- 禁止使用排比句式（如"不仅…更…还…"）\n' +
      '- 禁止使用空洞形容词堆砌（如"卓越""非凡""璀璨"）\n' +
      '- 禁止使用"在这个过程中""通过这次经历"等过渡句式\n' +
      '- 禁止每段都以"在XX方面"开头\n' +
      '- 禁止出现"我深知""我深刻认识到"等伪感悟句\n' +
      '- 语言要像一个真实的高中生写的，有青涩感，有个人口吻\n' +
      '- 允许口语化表达，允许短句，允许不完美的过渡\n' +
      '- 用具体细节代替抽象概括（不说"我热爱科学"，说"我花了一个月推导那个公式"）\n\n' +
      '【' + form.university + '个性化要求】\n' +
      '- 面试形式：' + (uni.interviewForm || '') + '，' + (uni.interviewMode || '') + '\n' +
      '- 校训：' + (uni.motto || '') + '（可自然融入，但不要生硬引用）\n' +
      '- 特色标签：' + (uni.features ? uni.features.join('、') : '') + '\n' +
      (form.majorGroup ? '- 专业组：' + form.majorGroup + '\n' : '') +
      '\n【风格要求】\n' +
      this._getStyleGuide(form.style) + '\n\n' +
      '请只输出个人陈述正文，不要包含标题、提示语或任何说明。'

    var userPrompt = '以下是我的真实信息，请据此撰写个人陈述：\n\n' +
      '【基本信息】\n' +
      '- 目标高校：' + form.university + '\n' +
      (form.major ? '- 目标专业：' + form.major + '\n' : '') +
      (form.majorGroup ? '- 专业组：' + form.majorGroup + '\n' : '') +
      (form.subjectCombo ? '- 选科：' + form.subjectCombo + '\n' : '') +
      (form.strongSubjects ? '- 优势学科：' + form.strongSubjects + '\n' : '') +
      '\n【核心经历】\n' +
      (form.keyAchievement ? '- 重要成就：' + form.keyAchievement + '\n' : '') +
      (form.research ? '- 课题/科创：' + form.research + '\n' : '') +
      (form.social ? '- 社会实践：' + form.social + '\n' : '') +
      '\n【个人特质】\n' +
      (form.personality ? '- 自我形容：' + form.personality + '\n' : '') +
      (form.story ? '- 个人故事：' + form.story + '\n' : '') +
      (form.hobbies ? '- 兴趣爱好：' + form.hobbies + '\n' : '')

    if (!form.keyAchievement && !form.research && !form.social && !form.story) {
      userPrompt += '\n注意：学生没有填写具体经历，请基于"综合素质优秀的高中生"方向，生成一个有框架感但不空洞的个人陈述，留出让学生补充具体内容的空间。'
    }

    deepseek.deepseekChat({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.85,
      max_tokens: 1500,
      timeout: 120000
    }).then(function (content) {
      that.setData({
        result: content.trim(),
        isGenerating: false
      })
    }).catch(function (err) {
      wx.showToast({ title: err.message || 'AI生成失败', icon: 'none', duration: 2000 })
      var fallback = deepseek.generateFallbackStatement({
        university: form.university, major: form.major,
        awards: form.keyAchievement, research: form.research,
        social: form.social, hobbies: form.hobbies, style: form.style
      })
      that.setData({ result: fallback, isGenerating: false })
    })
  },

  handleRefine: function () {
    if (!this.data.refineInput.trim() || this.data.isGenerating) return

    var that = this
    var form = this.data.form
    var currentContent = this.data.result
    var instruction = this.data.refineInput

    this.setData({ isGenerating: true })

    var systemPrompt = '你是一位个人陈述精修老师。根据学生的修改要求，调整个人陈述内容。\n\n' +
      '【硬性规则】\n' +
      '1. 总字数严格不超过500字\n' +
      '2. 保持去AI化：不用排比、不用空洞形容词、不用"通过这次经历"等套话\n' +
      '3. 语言像真实高中生写的，有个人口吻\n' +
      '4. 只输出修改后的完整个人陈述，不要解释\n' +
      '5. 针对' + form.university + '的招生偏好：' + (this.data.selectedUni.preferences || '')

    var userPrompt = '【当前版本】\n' + currentContent + '\n\n【修改要求】\n' + instruction + '\n\n请输出修改后的完整个人陈述。'

    deepseek.deepseekChat({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.8,
      max_tokens: 1500,
      timeout: 90000
    }).then(function (content) {
      var newContent = content.trim() || currentContent
      that.setData({
        result: newContent,
        isGenerating: false,
        refineInput: '',
        refineHistory: that.data.refineHistory.concat([instruction])
      })
    }).catch(function () {
      wx.showToast({ title: '精修失败，请重试', icon: 'none' })
      that.setData({ isGenerating: false })
    })
  },

  _getStyleGuide: function (style) {
    var guides = {
      sincere: '真诚朴实型：用朴实的语言讲述真实经历，像跟朋友聊天一样自然。少用大词，多用细节。让面试官感受到这是一个真实的人，不是一份包装过的简历。',
      academic: '学术深耕型：重点突出科研经历和学术思维，用具体的研究过程和发现说话。展现对学科的理解深度，不是简单罗列成果。',
      wellrounded: '全面发展型：平衡展示学习、实践、兴趣各方面，用一条内在主线串联。不是面面俱到的流水账，而是让每个方面都指向同一个成长主题。',
      storytelling: '故事驱动型：以一个核心故事或场景为线索，串联起关键经历。开头用场景切入，中间用叙事推进，结尾自然收束。让面试官记住你的故事。'
    }
    return guides[style] || guides.sincere
  },

  onRefineInput: function (e) {
    this.setData({ refineInput: e.detail.value })
  },

  handleCopy: function () {
    util.copyText(this.data.result)
  },

  handleDownload: function () {
    var content = this.data.result
    var form = this.data.form
    var filename = '个人陈述_' + form.university + '_' + (form.major || '未定专业') + '.txt'
    var fs = wx.getFileSystemManager()
    var filePath = wx.env.USER_DATA_PATH + '/' + filename

    try {
      fs.writeFileSync(filePath, content, 'utf8')
      wx.shareFileMessage({
        filePath: filePath,
        success: function () {},
        fail: function () {
          wx.showToast({ title: '分享失败', icon: 'none' })
        }
      })
    } catch (e) {
      wx.showToast({ title: '保存失败', icon: 'none' })
    }
  },

  resetForm: function () {
    this.setData({
      result: '',
      refineHistory: [],
      refineInput: ''
    })
  }
})
