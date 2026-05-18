var app = getApp()
var _requestInFlight = false

function isApiReady() {
  return app.globalData.apiReady === true
}

function deepseekChat(options) {
  if (!isApiReady()) {
    return Promise.reject(new Error('API_NOT_READY'))
  }

  if (_requestInFlight) {
    return Promise.reject(new Error('上一个请求还在处理中，请稍后'))
  }

  var apiKey = app.globalData.deepseekApiKey
  var baseUrl = app.globalData.deepseekBaseUrl

  return new Promise(function (resolve, reject) {
    _requestInFlight = true
    var timeout = options.timeout || 60000
    var requestTask = wx.request({
      url: baseUrl + '/chat/completions',
      method: 'POST',
      timeout: timeout,
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey
      },
      data: {
        model: options.model || 'deepseek-chat',
        temperature: options.temperature || 0.7,
        max_tokens: options.max_tokens || 2048,
        messages: options.messages,
        stream: false
      },
      success: function (res) {
        _requestInFlight = false
        if (res.statusCode === 200 && res.data && res.data.choices && res.data.choices.length > 0) {
          resolve(res.data.choices[0].message.content || '')
        } else if (res.statusCode === 401) {
          app.globalData.apiReady = false
          reject(new Error('API Key 无效'))
        } else if (res.statusCode === 429) {
          reject(new Error('请求过于频繁'))
        } else if (res.statusCode === 402) {
          app.globalData.apiReady = false
          reject(new Error('API余额不足'))
        } else {
          reject(new Error('请求失败'))
        }
      },
      fail: function (err) {
        _requestInFlight = false
        var errMsg = (err && err.errMsg) || ''
        if (errMsg.indexOf('timeout') !== -1) {
          reject(new Error('请求超时，请重试'))
        } else {
          reject(new Error('网络不可用，已切换本地模式'))
        }
      }
    })
  })
}

function testApiConnection() {
  var apiKey = app.globalData.deepseekApiKey
  var baseUrl = app.globalData.deepseekBaseUrl

  if (!apiKey) {
    return Promise.reject(new Error('请先输入 API Key'))
  }

  return new Promise(function (resolve, reject) {
    wx.showLoading({ title: '测试连接中...', mask: true })

    var requestTask = wx.request({
      url: baseUrl + '/chat/completions',
      method: 'POST',
      timeout: 10000,
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey
      },
      data: {
        model: 'deepseek-chat',
        temperature: 0,
        max_tokens: 10,
        messages: [{ role: 'user', content: 'hi' }]
      },
      success: function (res) {
        wx.hideLoading()
        if (res.statusCode === 200 && res.data && res.data.choices) {
          app.globalData.apiReady = true
          resolve('连接成功')
        } else if (res.statusCode === 401) {
          app.globalData.apiReady = false
          reject(new Error('API Key 无效，请检查是否正确'))
        } else if (res.statusCode === 402) {
          reject(new Error('API余额不足，请前往 platform.deepseek.com 充值'))
        } else {
          reject(new Error('连接失败(状态码:' + (res.statusCode || '?') + ')'))
        }
      },
      fail: function (err) {
        wx.hideLoading()
        app.globalData.apiReady = false
        var errMsg = (err && err.errMsg) || ''
        if (errMsg.indexOf('timeout') !== -1) {
          reject(new Error('连接超时(10秒)，可能原因：\n1. 网络无法访问 api.deepseek.com\n2. 未在开发者工具勾选「不校验合法域名」\n3. 防火墙/代理拦截'))
        } else {
          reject(new Error('无法连接，请确认：\n1. 开发者工具→详情→本地设置→勾选「不校验合法域名」\n2. 网络可正常访问 api.deepseek.com'))
        }
      }
    })
  })
}

function personalStatementPrompt(data) {
  var styleGuide = getStyleGuide(data.style)
  return {
    system: '你是上海高考综评面试的资深专家，精通各高校综评个人陈述（自我介绍）的撰写。你必须严格遵守以下规则：\n\n' +
      '1. 字数不超过500字（含标点）\n' +
      '2. 必须突出：社会责任感、专业志向与才能、个性特点与个人爱好\n' +
      '3. 针对' + data.university + '的招生偏好撰写\n' +
      '4. 风格：' + styleGuide + '\n' +
      '5. 不要出现任何"尊敬的老师"之类的书信格式\n' +
      '6. 语言自然流畅，不要堆砌华丽辞藻\n' +
      '7. 内容必须真实可感，避免空洞套话\n' +
      '8. 开头要有吸引力，结尾要简洁有力'
  }
}

function interviewPrompt(university, studentPS) {
  return {
    system: '你是' + university + '综评面试的资深面试官，具有多年招生面试经验。请严格遵循以下规则：\n\n' +
      '1. 用适度的压力面试风格，但保持专业和礼貌\n' +
      '2. 每次只问一个问题，等待考生回答后再追问\n' +
      '3. 追问要有深度，基于考生回答内容深入挖掘\n' +
      '4. 考察维度：理想信念、逻辑推理、理解表达、创新思维、学科基础、沟通反应\n' +
      '5. 面试时长约15分钟，合理分配问题数量\n' +
      '6. 开场先说"同学你好，欢迎参加' + university + '的综评面试，请坐。"\n' +
      '7. 结束时要给考生总结反馈和建议\n' +
      '8. 如果学生提供了个人陈述，基于其内容针对性提问\n' +
      '9. 使用自然的口语化表达，不要像在念稿\n' +
      '10. 适当制造一些压力情境，考察应变能力\n' +
      (studentPS ? '考生个人陈述：\n' + studentPS : '')
  }
}

function getStyleGuide(style) {
  var guides = {
    academic: '学术科研型：重点突出科研经历和学术潜力，用数据和事实说话，展现严谨的学术思维',
    wellrounded: '全面发展型：平衡展示学习、实践、兴趣各方面，体现综合素质和多维度发展',
    specialty: '特长突出型：集中笔墨描写最突出的特长和成就，打造鲜明的个人标签',
    sincere: '真诚朴实型：用朴实无华的语言讲述真实经历和感悟，以真诚打动人心'
  }
  return guides[style] || guides.sincere
}

var CHAT_SYSTEM_PROMPT = '你是"综评通"的AI智能问答助手，专为上海高考综合评价批次考生服务。\n\n' +
  '你的知识范围：\n' +
  '1. 上海综评政策：报名条件、选拔流程、录取规则等\n' +
  '2. 11所高校信息：复旦、交大、同济、华师大、华东理工、东华、上外、上财、上大、上中医、浙大\n' +
  '3. 各校面试形式、面试技巧、历年真题\n' +
  '4. 综合分计算公式：综合成绩 = 高考成绩÷660×850 + 校测成绩（满分150分）\n' +
  '5. 2026年关键时间节点：报名5月12-30日、初审6月3日、高考6月7-9日、出分6月23日、志愿填报6月27日-7月1日、面试7月6-7日\n' +
  '6. 个人陈述撰写指导，500字以内\n' +
  '7. 面试准备策略和应对技巧\n\n' +
  '回答要求：\n' +
  '- 回答要准确、专业、简洁\n' +
  '- 优先基于你掌握的知识回答\n' +
  '- 涉及分数线的要说明以各校官方公布为准\n' +
  '- 不要建议考生放弃或消极对待\n' +
  '- 保持鼓励和积极的态度\n' +
  '- 如果有不确定的信息，诚实说明'

var LOCAL_QA = {
  '报名': '2026年综评报名时间为5月12日-30日，登录阳光高考平台完成报名。可同时报多所高校，但志愿填报时综评批次只能选1所。建议报2-3所增加入围机会。',
  '面试': '综评面试满分150分，直接计入综合成绩。面试1分≈高考5.7分，是真正的决胜场。各校面试形式不同：复旦1V1多轮、交大AB两轮、同济多V1等。建议提前模拟练习。',
  '综合分': '综合成绩 = 高考成绩÷660×850 + 校测成绩（满分150分），总分1000分。高考占85%，校测占15%。面试1分≈高考5.7分。',
  '个人陈述': '个人陈述不超过500字，需突出：社会责任感、专业志向与才能、个性特点与个人爱好。这是面试官的重要参考材料，务必认真准备。',
  '时间': '2026年关键节点：报名5月12-30日、初审6月3日、高考6月7-9日、出分6月23日、志愿填报6月27日-7月1日、面试7月6-7日、录取7月10-15日。',
  '复旦': '复旦大学综评面试采用五名专家独立打分的"三随机"分组模式，1V1多轮形式，约15分钟/人。偏重学术潜力与批判思维，2024年最低入围线575分。',
  '交大': '上海交通大学综评面试采用AB两轮，每轮约7分钟，1V1两轮形式。偏重逻辑思维与创新能力，2024年最低入围线578分。',
  '同济': '同济大学综评面试为多V1形式，3-5位面试官，约15分钟/人。偏重工程思维与解决实际问题能力，2024年最低入围线565分。',
  '华师大': '华东师范大学综评面试为多V1形式，约15分钟/人。偏重表达能力与教育情怀，2024年最低入围线562分。',
  '志愿': '综评批次志愿填报时只能选1所高校，在普通批次之前录取。未被综评录取不影响后续普通批次。',
  '流程': '综评全流程：①报名(5.12-5.30)→②初审(6.3)→③高考(6.7-6.9)→④出分(6.23)→⑤志愿填报(6.27-7.1)→⑥面试(7.6-7.7)→⑦录取(7.10-7.15)',
  '准备': '面试准备建议：1.熟悉目标高校面试形式 2.准备1-2分钟自我介绍 3.用STAR法则组织回答 4.关注时事热点 5.模拟练习常见问题',
  '分数线': '2024年各校最低入围线：复旦575、交大578、同济565、华师大562、上财570、上外555、华东理工545、上大540、东华535、上中医545、浙大580。仅供参考，以各校公布为准。'
}

function getLocalAnswer(question) {
  var keys = Object.keys(LOCAL_QA)
  for (var i = 0; i < keys.length; i++) {
    if (question.indexOf(keys[i]) !== -1) {
      return LOCAL_QA[keys[i]]
    }
  }
  return '我是综评通AI助手，可以回答上海综评报名、面试、综合分计算、个人陈述等问题。\n\n目前AI增强模式未开启。如需更智能的回答，请在「我的」页面配置DeepSeek API Key并测试连接。\n\n你可以问我：报名流程、面试技巧、综合分怎么算、各校面试形式等。'
}

function generateFallbackStatement(data) {
  var majorName = data.major || '心仪专业'

  var content = '我是来自上海的一名高三学生，怀着对' + data.university + '的向往和对' + majorName + '的热爱，我满怀信心地递交这份个人陈述。\n\n' +
    '在学习方面，我始终保持优异的学业成绩，各科均衡发展。' +
    (data.awards ? '我曾在' + data.awards + '中取得好成绩，这些经历锻炼了我的学习能力和毅力。' : '我注重知识的系统学习和思维能力的培养，形成了良好的学习习惯。') + '\n\n' +
    '在研究性学习方面，' +
    (data.research ? '我参与了' + data.research + '，这个过程培养了我的科学思维和研究能力。' : '我积极参与课题研究，通过独立探究和团队协作，提升了发现问题和解决问题的能力。') + '\n\n' +
    '在社会实践方面，' +
    (data.social ? '我积极投身' + data.social + '，在服务他人中体会到社会责任的意义。' : '我积极参加志愿者服务和社会实践，在实践中理解了个人与社会的关系，增强了社会责任感。') + '\n\n' +
    '在个人兴趣方面，' +
    (data.hobbies ? '我热爱' + data.hobbies + '，这些爱好丰富了我的课余生活，也塑造了我积极向上的性格。' : '我兴趣广泛，热爱阅读和运动，这些爱好让我保持了积极乐观的生活态度。') + '\n\n' +
    data.university + '作为一所优秀的高等学府，其深厚的学术底蕴和优良的育人传统深深吸引着我。我相信，凭借我的学习能力、综合素质和进取精神，我能够在这里实现更大的成长。\n\n' +
    '我将以饱满的热情投入大学生活，在专业领域深耕，同时全面发展，努力成为对社会有用的人才。'

  if (content.length > 500) {
    content = content.substring(0, 497) + '...'
  }

  return content
}

module.exports = {
  deepseekChat: deepseekChat,
  testApiConnection: testApiConnection,
  isApiReady: isApiReady,
  personalStatementPrompt: personalStatementPrompt,
  interviewPrompt: interviewPrompt,
  getStyleGuide: getStyleGuide,
  CHAT_SYSTEM_PROMPT: CHAT_SYSTEM_PROMPT,
  generateFallbackStatement: generateFallbackStatement,
  getLocalAnswer: getLocalAnswer
}
