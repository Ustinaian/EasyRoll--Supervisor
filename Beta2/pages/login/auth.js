const app = getApp();
Page({
  code:'',
  data: {
    q:2
  },
  onLoad (query) {
    // 调用wx.login，获取登录凭证code
    wx.login({
      success: (res) => {
        this.setData({code:res.code});
        let that = this
        app.code = that.code
        // 将登录凭证code以及小程序码中的参数传回服务器
        wx.request({
            url: 'https://nicklorry.top:8090/auth/login/professor',
            method:"POST",
            data:{
                socketId:'ws:13942796',
                code:res.code
            },
            success:(res)=>{
              console.log(res)
              if(res.data.status==200){
                wx.switchTab({
                  url: '/pages/roll/roll'
                })
              }
          }
        })
      },
    })
  },
  onShow(){
    this.setData({
      q:'1'
    })
  }, 
  confirm(){

    
  },
  cancel(){
    
  }
})