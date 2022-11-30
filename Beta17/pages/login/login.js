import Toast from '@vant/weapp/toast/toast';
const app = getApp();
Page({
  data: {
    code:'',
    socketId:''
  },
  onLoad (query) {
    this.setData({
      socketId:query.scene
    })
    app.socketId=query.scene
  },
  Login(){
    // 调用wx.login，获取登录凭证code
    wx.login({
      success: (res) => {
        this.setData({code:res.code});
        app.code = res.code
        // 将登录凭证code以及小程序码中的参数传回服务器
        wx.request({
          url: 'https://nicklorry.top:8090/auth/login/professor',
          method:"POST",
          data:{
              socketId:this.data.socketId,
              code:res.code
          },
          success:(res)=>{
            console.log(res)
            if(res.data.status==200){
              wx.setStorage({
                key:'Authorization',
                data:res.header.Authorization
              })
              Toast('授权登录成功')
              setTimeout(() => {
                wx.switchTab({
                  url: '/pages/mine/mine'
                })
              }, 1000);
            }
            else if(res.data.status==201){
              Toast('您尚未注册')
              setTimeout(() => {
                wx.reLaunch({
                  url: '/pages/register/teacher/teacher'
                })
              }, 1000);
            }
            else if(res.data.status==500){
              // Toast('您尚未注册')
              // setTimeout(() => {
              //   wx.reLaunch({
              //     url: '/pages/register/teacher/teacher'
              //   })
              // }, 2000);
            }
          }
        })
      },
    })
  }
})