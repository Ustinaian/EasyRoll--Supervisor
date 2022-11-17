// pages/roll/choose-mode/namelist-roll/namelist-roll.js
Page({
  //data定义
  data: {
    startPageX: 0,
    flag:1
  },
  // 滑动手势开始事件
  startEvent(event) {
    if (event.changedTouches[0].pageX) {
      this.data.startPageX = event.changedTouches[0].pageX
    } else {
      this.data.startPageX = event.changedTouches[0].x
    }
  },
  // 滑动手势结束事件
  endEvent(event) {
    let endPageX = 0
    if (event.changedTouches[0].pageX) {
      endPageX = event.changedTouches[0].pageX
    } else {
      endPageX = event.changedTouches[0].x
    }
    const moveX = endPageX - this.data.startPageX
    if (Math.abs(moveX) < 30) return
    if (moveX > 0) {
      // 右滑
      this.setData({
        flag:0
      })
    } else {
      // 左滑
      wx.switchTab({
        url: '/pages/roll/roll'
      })
    }
  },
})