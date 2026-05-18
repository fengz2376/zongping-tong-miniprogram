const universities = require('../data/universities')
const timeline = require('../data/timeline')
const interviewQuestions = require('../data/interview-questions')

function getUniversities() {
  return universities
}

function getUniversityById(id) {
  return universities.find(function (u) { return u.id === id })
}

function getTimelinePhases() {
  return timeline.phases
}

function getCurrentPhase() {
  var now = new Date()
  var phases = timeline.phases

  for (var i = 0; i < phases.length; i++) {
    var start = new Date(phases[i].startDate)
    var end = new Date(phases[i].endDate)
    end.setHours(23, 59, 59, 999)
    if (now >= start && now <= end) {
      return phases[i]
    }
  }

  for (var j = 0; j < phases.length; j++) {
    if (new Date(phases[j].startDate) > now) {
      return phases[j]
    }
  }

  return phases[phases.length - 1]
}

function getInterviewQuestions(universityId, category) {
  var questions = interviewQuestions.questions

  if (universityId && universityId !== 'all') {
    questions = questions.filter(function (q) {
      return q.universities.indexOf('all') !== -1 || q.universities.indexOf(universityId) !== -1
    })
  }

  if (category && category !== 'all') {
    questions = questions.filter(function (q) { return q.category === category })
  }

  return questions
}

function getInterviewCategories() {
  return interviewQuestions.categories
}

function getInterviewSkills() {
  return interviewQuestions.interviewSkills
}

function getDaysUntil(dateStr) {
  var now = new Date()
  now.setHours(0, 0, 0, 0)
  var target = new Date(dateStr)
  var diff = target.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

function formatDate(dateStr) {
  var d = new Date(dateStr)
  return (d.getMonth() + 1) + '/' + d.getDate()
}

function getPhaseStatus(phase) {
  var now = new Date()
  now.setHours(0, 0, 0, 0)
  var start = new Date(phase.startDate)
  start.setHours(0, 0, 0, 0)
  var end = new Date(phase.endDate)
  end.setHours(23, 59, 59, 999)

  if (now > end) return 'completed'
  if (now >= start && now <= end) return 'current'
  return 'upcoming'
}

module.exports = {
  getUniversities: getUniversities,
  getUniversityById: getUniversityById,
  getTimelinePhases: getTimelinePhases,
  getCurrentPhase: getCurrentPhase,
  getInterviewQuestions: getInterviewQuestions,
  getInterviewCategories: getInterviewCategories,
  getInterviewSkills: getInterviewSkills,
  getDaysUntil: getDaysUntil,
  formatDate: formatDate,
  getPhaseStatus: getPhaseStatus
}
