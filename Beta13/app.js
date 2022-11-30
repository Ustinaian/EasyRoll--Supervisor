// app.js
App({
  Hour:'',
  Minute:'',
  socketId:'',
  departmentName:'',
  majorName:'',
  flag:200,
  courseId:'',
  course:[{
      id:'1',
      name:'软件工程A',
      classroomNo:'旗山东3-307',
      professorName:'柯逍',
      period:'1-2节',
      week:'2-14周'
    },{
      id:'2',
      name:'计算机操作系统',
      classroomNo:'旗山东3-406',
      professorName:'陈勃',
      period:'3-4节',
      week:'1-9周'
    }],
    token:'',
    code:'',
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
