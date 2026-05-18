function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()

  return year + '年' + month + '月' + day + '日 ' + padZero(hour) + ':' + padZero(minute)
}

function padZero(num) {
  return num < 10 ? '0' + num : '' + num
}

function showToast(title, icon) {
  wx.showToast({
    title: title,
    icon: icon || 'none',
    duration: 2000
  })
}

function copyText(text) {
  wx.setClipboardData({
    data: text,
    success: function () {
      showToast('已复制到剪贴板', 'success')
    }
  })
}

module.exports = {
  formatTime: formatTime,
  padZero: padZero,
  showToast: showToast,
  copyText: copyText
}
