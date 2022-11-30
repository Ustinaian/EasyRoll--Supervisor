const app = getApp();

Page({
  data: {
    code:''
  },
  onLoad (query) {
  },
  Login(){
    wx.login({
      success: (result) => {
        this.setData({
          code:result.code,
        })
        app.code = result.code
        wx.request({
          url: 'https://nicklorry.top:8090/auth/login/supervisor',
          method: "POST",
          data:{
            code:result.code
          },
          success: (result) => {
            if(result.data.status==200){
              wx.switchTab({
                url: '/pages/roll/roll'
              })
            }
          },
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
  Register(){
    wx.reLaunch({
      url: '/pages/register/register'
    })
  }
})