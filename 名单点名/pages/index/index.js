const app = getApp();

Page({
  data: {
    code:''
  },
  Login(){
    wx.login({
      success: (result) => {
        this.setData({
          code:result.code,
        })
        app.code = result.code
        wx.request({
          url: 'https://nicklorry.top:8090/professor/login/auth',
          method: "POST",
          data:{
            code:this.code
          },
          success: (result) => {},
          fail: (res) => {
            console.log('登录失败')
          },
          complete: (res) => {
            console.log(res)
          }
        })
      }
    })
  },
  enter(){
    wx.switchTab({
      url: '/pages/roll/roll'
    })
  }
})
