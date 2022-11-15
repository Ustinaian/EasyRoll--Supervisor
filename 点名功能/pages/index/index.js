Page({
  data: {
    
  },
  enter(){
    wx.switchTab({
      url: '/pages/roll/roll'
    })
  },
  Login(){
    wx.login({
      timeout: 0,
      success: (result) => {
        wx.request({
          url: 'https://nicklorry.top:8090/auth/login/supervisor',
          data: {
            code:result.code
          },
          method: "POST",
          timeout: 0,
          success: (result) => {},
          fail: (res) => {
            console.log('登录失败')
          },
          complete: (res) => {
            console.log(res)
          },
        })
      },
      fail: (res) => {
        console.log('res:')
        console.log(res)
        console.log('获取code失败')
      },
      complete: (res) => {},
    })
  }
})
