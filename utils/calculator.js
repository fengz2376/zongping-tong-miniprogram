function calculateComprehensiveScore(gaokaoScore, interviewScore) {
  var gaokaoConverted = (gaokaoScore / 660) * 850
  var comprehensiveScore = gaokaoConverted + interviewScore

  return {
    comprehensiveScore: Math.round(comprehensiveScore * 100) / 100,
    gaokaoConverted: Math.round(gaokaoConverted * 100) / 100,
    interviewScoreRaw: interviewScore,
    formula: '(' + gaokaoScore + '÷660)×850 + ' + interviewScore
  }
}

function calculateRequiredInterviewScore(gaokaoScore, targetComprehensiveScore) {
  var gaokaoConverted = (gaokaoScore / 660) * 850
  var required = targetComprehensiveScore - gaokaoConverted
  return Math.max(0, Math.round(required * 100) / 100)
}

function calculateScoreGap(myGaokaoScore, targetGaokaoScore) {
  var gaokaoGap = targetGaokaoScore - myGaokaoScore
  var equivalentInterviewGap = Math.round((gaokaoGap / 660) * 850 / (850 / 150) * 100) / 100
  return { gaokaoGap: gaokaoGap, equivalentInterviewGap: equivalentInterviewGap }
}

module.exports = {
  calculateComprehensiveScore: calculateComprehensiveScore,
  calculateRequiredInterviewScore: calculateRequiredInterviewScore,
  calculateScoreGap: calculateScoreGap
}
