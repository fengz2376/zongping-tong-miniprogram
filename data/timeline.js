const timeline = {
  phases: [
    {
      id: "registration",
      title: "综评报名期",
      startDate: "2026-05-12",
      endDate: "2026-05-30",
      description: "登录阳光高考平台或各校报名系统，完成综评批次网上报名",
      tasks: [
        "登录阳光高考平台选择综评批次",
        "选择目标高校（可报多所）",
        "填写个人基本信息",
        "上传综合素质评价材料",
        "撰写并上传个人陈述（自我介绍）",
        "确认报名信息并提交"
      ],
      icon: "📝",
      color: "blue",
      tips: "建议同时报名2-3所高校，不要只报一所"
    },
    {
      id: "review",
      title: "初审结果公布",
      startDate: "2026-06-03",
      endDate: "2026-06-05",
      description: "各高校发布综评报名初审结果，考生查询是否通过",
      tasks: [
        "登录报名系统查询初审结果",
        "确认入围高校名单",
        "准备校测面试"
      ],
      icon: "🔍",
      color: "purple",
      tips: "初审通过率约60-80%，关键看综合素质评价材料的完整性"
    },
    {
      id: "gaokao",
      title: "全国统一高考",
      startDate: "2026-06-07",
      endDate: "2026-06-09",
      description: "参加全国统一高考，这是综评综合成绩的基础（占85%）",
      tasks: [
        "参加语文、数学、外语统一考试",
        "参加等级考（选考科目）",
        "保持良好心态，正常发挥"
      ],
      icon: "✏️",
      color: "red",
      tips: "高考成绩占综评总分的85%，每1分都很关键"
    },
    {
      id: "gaokao-score",
      title: "高考出分",
      startDate: "2026-06-23",
      endDate: "2026-06-23",
      description: "高考成绩公布，考生查询分数及位次",
      tasks: [
        "查询高考成绩",
        "对比历年各校入围分数线",
        "确定综评志愿填报策略"
      ],
      icon: "📊",
      color: "orange",
      tips: "出分后立即使用综合分计算器，评估各校录取概率"
    },
    {
      id: "volunteer",
      title: "综评志愿填报",
      startDate: "2026-06-27",
      endDate: "2026-07-01",
      description: "在高考志愿填报系统中填报综评批次志愿",
      tasks: [
        "登录志愿填报系统",
        "填报综评批次志愿（限1所高校）",
        "确认志愿信息"
      ],
      icon: "🎯",
      color: "green",
      tips: "综评批次只能填报1所高校，需慎重选择"
    },
    {
      id: "interview",
      title: "校测面试",
      startDate: "2026-07-06",
      endDate: "2026-07-07",
      description: "入围考生参加高校组织的校测面试，面试满分150分",
      tasks: [
        "提前熟悉面试形式和流程",
        "准备自我介绍（1-2分钟版本）",
        "模拟练习常见面试问题",
        "注意着装和礼仪",
        "携带必要证件材料"
      ],
      icon: "🎤",
      color: "yellow",
      tips: "面试1分≈高考5.7分，面试是真正的决胜场！务必充分准备"
    },
    {
      id: "admission",
      title: "综评录取公布",
      startDate: "2026-07-10",
      endDate: "2026-07-15",
      description: "各高校公布综评批次录取结果",
      tasks: [
        "登录查询录取结果",
        "确认录取信息",
        "未被录取则进入普通批次"
      ],
      icon: "🎉",
      color: "pink",
      tips: "综评批次录取在普通批次之前，未被录取不影响后续批次"
    }
  ]
}

module.exports = timeline
