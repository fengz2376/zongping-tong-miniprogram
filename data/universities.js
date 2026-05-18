var universities = [
  {
    id: "fudan", name: "复旦大学", shortName: "复旦", type: "985",
    logo: "🎓", motto: "博学而笃志，切问而近思",
    interviewMode: "五名专家独立打分，'三随机'分组",
    interviewForm: "1V1多轮", interviewDuration: "约15分钟/人",
    interviewWeight: 0.15, gaokaoWeight: 0.85, totalScore: 1000, interviewFullScore: 150,
    admissionLines: {
      "2025": { minScore: 593, avgScore: 608 },
      "2024": { minScore: 575, avgScore: 590 },
      "2023": { minScore: 572, avgScore: 588 },
      "2022": { minScore: 568, avgScore: 585 }
    },
    features: ["学术氛围浓厚", "注重批判性思维", "考察综合素质"],
    preferences: "偏重学术潜力与批判思维，关注课题研究经历",
    location: "上海市杨浦区邯郸路220号",
    website: "https://www.fudan.edu.cn",
    overview: "复旦大学是教育部直属全国重点大学，位列985/211/双一流，综合实力位居全国前列。综评批次是复旦在上海招生的主渠道之一，涵盖文理医工多个学科方向。",
    majorGroups: [
      {
        group: "专业组1（不限选科）", code: "01",
        majors: ["中国语言文学类", "新闻传播学类", "法学", "社会学类", "公共管理类", "经济学院", "外国语言文学类"],
        score2025: 593, score2024: 580, score2023: 577, score2022: 573
      },
      {
        group: "专业组2（物理+化学）", code: "02",
        majors: ["数学类", "物理学类", "化学类", "生物科学类", "计算机科学与技术", "软件工程", "微电子科学与工程", "人工智能"],
        score2025: 598, score2024: 583, score2023: 580, score2022: 576
      },
      {
        group: "专业组3（物理+化学·医学）", code: "03",
        majors: ["临床医学（8年制）", "临床医学（5年制）", "基础医学", "预防医学", "药学"],
        score2025: 593, score2024: 585, score2023: 582, score2022: 578
      }
    ]
  },
  {
    id: "sjtu", name: "上海交通大学", shortName: "交大", type: "985",
    logo: "⚙️", motto: "饮水思源，爱国荣校",
    interviewMode: "AB两轮面试，每轮约7分钟",
    interviewForm: "1V1两轮", interviewDuration: "约14分钟/人",
    interviewWeight: 0.15, gaokaoWeight: 0.85, totalScore: 1000, interviewFullScore: 150,
    admissionLines: {
      "2025": { minScore: 590, avgScore: 605 },
      "2024": { minScore: 578, avgScore: 593 },
      "2023": { minScore: 575, avgScore: 590 },
      "2022": { minScore: 570, avgScore: 587 }
    },
    features: ["工科实力强", "创新创业氛围浓", "重视实践能力"],
    preferences: "偏重逻辑思维与创新能力，关注科技类竞赛经历",
    location: "上海市东川路800号（闵行校区）",
    website: "https://www.sjtu.edu.cn",
    overview: "上海交通大学是教育部直属全国重点大学，985/211/双一流，工科实力全国顶尖。综评批次涵盖工科、理科、医学、经管等多个方向，是上海考生报考的热门选择。",
    majorGroups: [
      {
        group: "专业组1（不限选科）", code: "01",
        majors: ["经济管理试验班", "法学试验班", "外国语言文学类", "传播学", "行政管理", "人居设计"],
        score2025: 590, score2024: 578, score2023: 575, score2022: 571
      },
      {
        group: "专业组2（物理+化学）", code: "02",
        majors: ["工科试验班类", "机械类", "电子信息类", "计算机科学与技术", "人工智能", "自动化", "船舶与海洋工程", "航空航天工程"],
        score2025: 594, score2024: 582, score2023: 579, score2022: 574
      },
      {
        group: "专业组3（物理+化学·医学）", code: "03",
        majors: ["临床医学（8年制）", "临床医学（5年制）", "口腔医学", "预防医学", "生物医学工程"],
        score2025: 590, score2024: 584, score2023: 581, score2022: 577
      }
    ]
  },
  {
    id: "tongji", name: "同济大学", shortName: "同济", type: "985",
    logo: "🏗️", motto: "同舟共济，自强不息",
    interviewMode: "多对一面试，3-5位面试官",
    interviewForm: "多V1", interviewDuration: "约15分钟/人",
    interviewWeight: 0.15, gaokaoWeight: 0.85, totalScore: 1000, interviewFullScore: 150,
    admissionLines: {
      "2025": { minScore: 583, avgScore: 596 },
      "2024": { minScore: 565, avgScore: 578 },
      "2023": { minScore: 562, avgScore: 575 },
      "2022": { minScore: 558, avgScore: 572 }
    },
    features: ["工科见长", "国际化程度高", "注重工程实践"],
    preferences: "偏重工程思维与解决实际问题能力",
    location: "上海市四平路1239号",
    website: "https://www.tongji.edu.cn",
    overview: "同济大学是教育部直属全国重点大学，985/211/双一流，以土木建筑、城市规划、汽车工程等学科见长，国际化程度高。",
    majorGroups: [
      {
        group: "专业组1（不限选科）", code: "01",
        majors: ["经济管理试验班", "外国语言文学类", "新闻传播学类", "法学", "政治学与行政学"],
        score2025: 587, score2024: 565, score2023: 562, score2022: 558
      },
      {
        group: "专业组2（物理+化学）", code: "02",
        majors: ["工科试验班（信息与智能网联类）", "工科试验班（土木类）", "工科试验班（建筑类）", "工科试验班（机械类）", "车辆工程", "计算机科学与技术", "软件工程", "人工智能拔尖班", "临床医学", "口腔医学"],
        score2025: 583, score2024: 568, score2023: 565, score2022: 561
      }
    ]
  },
  {
    id: "ecnu", name: "华东师范大学", shortName: "华师大", type: "985",
    logo: "📚", motto: "求实创造，为人师表",
    interviewMode: "多对一综合面试+AI面试",
    interviewForm: "多V1+AI面试", interviewDuration: "约15分钟/人",
    interviewWeight: 0.15, gaokaoWeight: 0.85, totalScore: 1000, interviewFullScore: 150,
    admissionLines: {
      "2025": { minScore: 580, avgScore: 593 },
      "2024": { minScore: 562, avgScore: 575 },
      "2023": { minScore: 560, avgScore: 573 },
      "2022": { minScore: 555, avgScore: 570 }
    },
    features: ["师范教育领先", "文理基础扎实", "人文关怀"],
    preferences: "偏重表达能力与教育情怀，关注社会责任感",
    location: "上海市中山北路3663号",
    website: "https://www.ecnu.edu.cn",
    overview: "华东师范大学是教育部直属全国重点大学，985/211/双一流，师范教育全国领先，心理学、教育学、地理学等学科实力突出。2025年新增AI面试环节。",
    majorGroups: [
      {
        group: "专业组1（不限选科）", code: "01",
        majors: ["汉语言文学", "英语", "历史学", "哲学", "新闻传播学类", "社会学类", "公共管理类"],
        score2025: 582, score2024: 565, score2023: 563, score2022: 558
      },
      {
        group: "专业组2（不限选科）", code: "02",
        majors: ["学前教育", "特殊教育", "教育康复学", "艺术教育"],
        score2025: 580, score2024: 562, score2023: 560, score2022: 555
      },
      {
        group: "专业组3（物理+化学）", code: "03",
        majors: ["数学与应用数学", "物理学", "计算机科学与技术", "软件工程", "电子信息类", "统计学"],
        score2025: 585, score2024: 568, score2023: 566, score2022: 561
      },
      {
        group: "专业组4（物理+化学）", code: "04",
        majors: ["心理学", "生物科学", "化学", "地理科学", "生态学"],
        score2025: 580, score2024: 564, score2023: 562, score2022: 557
      }
    ]
  },
  {
    id: "ecust", name: "华东理工大学", shortName: "华东理工", type: "211",
    logo: "⚗️", motto: "勤奋求实，励志明德",
    interviewMode: "多对一面试",
    interviewForm: "多V1", interviewDuration: "约12分钟/人",
    interviewWeight: 0.15, gaokaoWeight: 0.85, totalScore: 1000, interviewFullScore: 150,
    admissionLines: {
      "2025": { minScore: 558, avgScore: 570 },
      "2024": { minScore: 545, avgScore: 558 },
      "2023": { minScore: 542, avgScore: 555 },
      "2022": { minScore: 538, avgScore: 552 }
    },
    features: ["化工特色", "工科实力强", "产学研结合"],
    preferences: "偏重学科基础与实验能力",
    location: "上海市梅陇路130号",
    website: "https://www.ecust.edu.cn",
    overview: "华东理工大学是教育部直属全国重点大学，211/双一流，化工学科全国顶尖，材料、生物、环境等学科实力突出。",
    majorGroups: [
      {
        group: "专业组1（物理+化学）", code: "01",
        majors: ["化学工程与工艺", "制药工程", "材料科学与工程", "计算机科学与技术", "信息工程", "机械设计制造及其自动化", "机器人工程"],
        score2025: 567, score2024: 548, score2023: 545, score2022: 541
      },
      {
        group: "专业组2（物理+化学）", code: "02",
        majors: ["应用化学", "生物工程", "食品科学与工程", "环境工程", "药学", "功能材料"],
        score2025: 571, score2024: 546, score2023: 543, score2022: 539
      },
      {
        group: "专业组3（物理+化学）", code: "03",
        majors: ["化学", "生物科学", "新能源材料与器件", "资源循环科学与工程"],
        score2025: 559, score2024: 544, score2023: 541, score2022: 537
      },
      {
        group: "专业组4（不限选科）", code: "04",
        majors: ["工商管理类", "经济学类", "外国语言文学类", "法学", "社会工作"],
        score2025: 558, score2024: 543, score2023: 540, score2022: 536
      }
    ]
  },
  {
    id: "dhu", name: "东华大学", shortName: "东华", type: "211",
    logo: "🧵", motto: "崇德博学，砺志尚实",
    interviewMode: "多对一面试",
    interviewForm: "多V1", interviewDuration: "约10分钟/人",
    interviewWeight: 0.15, gaokaoWeight: 0.85, totalScore: 1000, interviewFullScore: 150,
    admissionLines: {
      "2025": { minScore: 555, avgScore: 567 },
      "2024": { minScore: 535, avgScore: 548 },
      "2023": { minScore: 532, avgScore: 545 },
      "2022": { minScore: 528, avgScore: 542 }
    },
    features: ["纺织服装特色", "设计学科突出", "应用型"],
    preferences: "偏重创新思维与实践能力",
    location: "上海市延安西路1882号",
    website: "https://www.dhu.edu.cn",
    overview: "东华大学是教育部直属全国重点大学，211/双一流，纺织科学与工程全国第一，材料、设计等学科特色鲜明。",
    majorGroups: [
      {
        group: "专业组1（物理+化学）", code: "01",
        majors: ["纺织工程", "服装设计与工程", "材料类", "计算机科学与技术", "人工智能", "机械工程", "自动化"],
        score2025: 560, score2024: 538, score2023: 535, score2022: 531
      },
      {
        group: "专业组2（物理+化学）", code: "02",
        majors: ["生物工程", "功能材料", "环境工程", "电子信息类"],
        score2025: 557, score2024: 536, score2023: 533, score2022: 529
      },
      {
        group: "专业组3（不限选科）", code: "03",
        majors: ["经济管理试验班", "外国语言文学类", "新闻传播学类", "法学"],
        score2025: 555, score2024: 534, score2023: 531, score2022: 527
      }
    ]
  },
  {
    id: "shisu", name: "上海外国语大学", shortName: "上外", type: "211",
    logo: "🌍", motto: "格高志远，学贯中外",
    interviewMode: "多对一面试，含外语口语测试",
    interviewForm: "多V1+外语口试", interviewDuration: "约15分钟/人",
    interviewWeight: 0.15, gaokaoWeight: 0.85, totalScore: 1000, interviewFullScore: 150,
    admissionLines: {
      "2025": { minScore: 563, avgScore: 576 },
      "2024": { minScore: 555, avgScore: 568 },
      "2023": { minScore: 552, avgScore: 565 },
      "2022": { minScore: 548, avgScore: 562 }
    },
    features: ["外语优势", "国际化平台", "跨文化交流"],
    preferences: "偏重语言表达与跨文化理解能力",
    location: "上海市大连西路550号",
    website: "https://www.shisu.edu.cn",
    overview: "上海外国语大学是教育部直属全国重点大学，211/双一流，外语教育全国顶尖，是培养外语外交人才的重要基地。2025年新增数据科学与大数据技术专业。",
    majorGroups: [
      {
        group: "专业组1（不限选科）", code: "01",
        majors: ["英语", "翻译", "法语", "德语", "日语", "西班牙语", "俄语", "阿拉伯语", "国际政治", "外交学"],
        score2025: 565, score2024: 558, score2023: 555, score2022: 551
      },
      {
        group: "专业组2（不限选科）", code: "02",
        majors: ["新闻传播学类", "工商管理类", "汉语国际教育", "数据科学与大数据技术"],
        score2025: 563, score2024: 555, score2023: 552, score2022: 548
      },
      {
        group: "专业组3（政治必选）", code: "03",
        majors: ["国际政治", "政治学与行政学", "外交学"],
        score2025: 569, score2024: 557, score2023: 554, score2022: 550
      }
    ]
  },
  {
    id: "sufe", name: "上海财经大学", shortName: "上财", type: "211",
    logo: "💰", motto: "厚德博学，经济匡时",
    interviewMode: "多对一面试，含逻辑分析题",
    interviewForm: "多V1+逻辑测试", interviewDuration: "约15分钟/人",
    interviewWeight: 0.15, gaokaoWeight: 0.85, totalScore: 1000, interviewFullScore: 150,
    admissionLines: {
      "2025": { minScore: 574, avgScore: 588 },
      "2024": { minScore: 570, avgScore: 585 },
      "2023": { minScore: 568, avgScore: 582 },
      "2022": { minScore: 563, avgScore: 580 }
    },
    features: ["财经特色", "逻辑分析要求高", "务实导向"],
    preferences: "偏重逻辑思维与数据分析能力，关注时事经济",
    location: "上海市国定路777号",
    website: "https://www.sufe.edu.cn",
    overview: "上海财经大学是教育部直属全国重点大学，211/双一流，财经类学科全国顶尖，会计、金融、经济学等专业实力突出。2025年新设计算机与人工智能学院，新增人工智能本科专业。",
    majorGroups: [
      {
        group: "专业组1（不限选科）", code: "01",
        majors: ["会计学", "金融学", "经济学", "财政学", "工商管理", "国际经济与贸易", "法学", "新闻学", "外国语言文学类"],
        score2025: 574, score2024: 573, score2023: 571, score2022: 566
      },
      {
        group: "专业组2（物理必选）", code: "02",
        majors: ["金融科技", "数据科学与大数据技术", "计算机科学与技术", "统计学", "信息管理与信息系统"],
        score2025: 575, score2024: 572, score2023: 570, score2022: 565
      },
      {
        group: "专业组3（物理+化学）", code: "03",
        majors: ["人工智能", "计算机科学与技术（AI方向）", "统计学（数据科学）"],
        score2025: 577, score2024: 572, score2023: 570, score2022: 565
      }
    ]
  },
  {
    id: "shu", name: "上海大学", shortName: "上大", type: "211",
    logo: "🏛️", motto: "自强不息，先天下之忧而忧，后天下之乐而乐",
    interviewMode: "多对一面试",
    interviewForm: "多V1", interviewDuration: "约10分钟/人",
    interviewWeight: 0.15, gaokaoWeight: 0.85, totalScore: 1000, interviewFullScore: 150,
    admissionLines: {
      "2025": { minScore: 566, avgScore: 578 },
      "2024": { minScore: 540, avgScore: 552 },
      "2023": { minScore: 537, avgScore: 550 },
      "2022": { minScore: 533, avgScore: 548 }
    },
    features: ["综合性强", "学科门类齐全", "地方特色"],
    preferences: "偏重综合素质与学习潜力",
    location: "上海市上大路99号",
    website: "https://www.shu.edu.cn",
    overview: "上海大学是上海市属重点大学，211/双一流，学科门类齐全，社会学、美术学、机械工程等学科实力突出。实行按类招生与按专业招生结合的方式。",
    majorGroups: [
      {
        group: "专业组1（物理+化学）", code: "01",
        majors: ["计算机科学与技术", "电子信息工程", "通信工程", "机械工程", "材料科学与工程", "自动化", "土木工程", "环境工程", "化学工程与工艺"],
        score2025: 569, score2024: 545, score2023: 542, score2022: 538
      },
      {
        group: "专业组2（不限选科）", code: "02",
        majors: ["社会学类", "中国语言文学类", "新闻传播学类", "历史学类", "法学", "外国语言文学类", "经济学院", "管理学院"],
        score2025: 566, score2024: 543, score2023: 540, score2022: 536
      }
    ]
  },
  {
    id: "shutcm", name: "上海中医药大学", shortName: "上中医", type: "双一流",
    logo: "🌿", motto: "传承创新，济世利人",
    interviewMode: "多对一面试",
    interviewForm: "多V1", interviewDuration: "约10分钟/人",
    interviewWeight: 0.15, gaokaoWeight: 0.85, totalScore: 1000, interviewFullScore: 150,
    admissionLines: {
      "2025": { minScore: 572, avgScore: 582 },
      "2024": { minScore: 545, avgScore: 555 },
      "2023": { minScore: 542, avgScore: 552 },
      "2022": { minScore: 538, avgScore: 550 }
    },
    features: ["中医药特色", "传承创新", "人文关怀"],
    preferences: "偏重对中医药的兴趣与人文素养",
    location: "上海市蔡伦路1200号",
    website: "https://www.shutcm.edu.cn",
    overview: "上海中医药大学是上海市属重点大学，双一流，中医学、中药学全国顶尖，是中医药高等教育的重要基地。2025年新增智能医学工程（医工创新班）专业。",
    majorGroups: [
      {
        group: "专业组1（物理+化学）", code: "01",
        majors: ["中医学（5+3一体化）", "中医学", "针灸推拿学", "中药学", "药学", "康复学", "智能医学工程（医工创新班）"],
        score2025: 572, score2024: 548, score2023: 545, score2022: 541
      },
      {
        group: "专业组2（不限选科）", code: "02",
        majors: ["公共管理类", "外国语言文学类"],
        score2025: 558, score2024: 540, score2023: 537, score2022: 533
      }
    ]
  },
  {
    id: "zju", name: "浙江大学", shortName: "浙大", type: "985",
    logo: "🔬", motto: "求是创新",
    interviewMode: "多对一综合面试",
    interviewForm: "多V1", interviewDuration: "约15分钟/人",
    interviewWeight: 0.15, gaokaoWeight: 0.85, totalScore: 1000, interviewFullScore: 150,
    admissionLines: {
      "2025": { minScore: 580, avgScore: 595 },
      "2024": { minScore: 580, avgScore: 595 },
      "2023": { minScore: 578, avgScore: 592 },
      "2022": { minScore: 573, avgScore: 590 }
    },
    features: ["综合性顶尖高校", "学科实力强", "创新氛围"],
    preferences: "偏重综合能力与学科特长",
    location: "浙江省海宁市海州东路718号（海宁国际校区）",
    website: "https://www.zju.edu.cn",
    overview: "浙江大学是教育部直属全国重点大学，985/211/双一流，综合实力全国前三。上海综评通过海宁国际校区招生，含中外合作办学专业，是上海综评中唯一的非沪高校。",
    majorGroups: [
      {
        group: "专业组1（物理+化学）", code: "01",
        majors: ["机械工程（中外合作办学）", "生物信息学（中外合作办学）", "电气工程及其自动化（中外合作办学）"],
        score2025: 580, score2024: 580, score2023: 578, score2022: 573
      },
      {
        group: "专业组2（不限选科）", code: "02",
        majors: ["社会科学试验班（中外合作办学）", "人文科学试验班（中外合作办学）"],
        score2025: 580, score2024: 580, score2023: 578, score2022: 573
      }
    ]
  }
]

module.exports = universities
