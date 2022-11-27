const app = getApp()
Page({
  //data定义
  data: {
    startPageX: 0,
    flag:0,
    active: 0,
    courseId:'58302774',
    enrollNum:'',
    Authorization:'',
    student_id:200000001,
    state:1
  },
  onLoad(){
    // 创建长连接
    wx.connectSocket({
      url: 'wss://nicklorry.top:8090/supervisor/roll/call/'+this.data.courseId+'/'+'10'+'/'+app.token,
    })
  },
  sendMsg(){
    console.log(this.data.student_id+','+this.data.state)
    wx.sendSocketMessage({
      data: 200000001+',0',
    })
  },
  revMsg(){
    wx.onSocketMessage((result) => {
      
    })
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
        flag:1
      })
    } else {
      // 左滑
      this.setData({
        flag:1
      })
      console.log(this.flag)
    }
  },
  onChange(event) {
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.name}`,
    //   icon: 'none',
    // });
  },
})