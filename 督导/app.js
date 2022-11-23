// app.js
App({
  flag:200,
  course:[{
      name:'软件工程A',
      classroom:'旗山东3-307',
      teacher:'柯逍',
      time:'1-2节',
      week:'2-14周'
    },{
      name:'计算机操作系统',
      classroom:'旗山东3-406',
      teacher:'陈勃',
      time:'3-4节',
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
