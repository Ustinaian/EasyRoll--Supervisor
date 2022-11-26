import Toast from '@vant/weapp/toast/toast';
import Dialog from '@vant/weapp/dialog/dialog';

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp()

Page({
  data: {
    nickname:'',
    avatarUrl: defaultAvatarUrl,
    login_flag: 0,
    motto: 'Hello World',
  },
  onLoad() {
    let that = this
    wx.getStorage({
      key:'nickname',
      success (res) {
        that.setData({
          nickname:res.data
        })
      }
    })
    wx.getStorage({
      key:'avatarUrl',
      success (res) {
        that.setData({
          avatarUrl:res.data
        })
      }
    })
    // wx.login({
    //   success: (result) => {
    //     this.setData({
    //       code:result.code,
    //     })
    //     app.code = result.code
    //     wx.request({
    //       url: 'https://nicklorry.top:8090/auth/login/supervisor',
    //       method: "POST",
    //       data:{
    //         code:result.code
    //       },
    //       success: (result) => {
    //         if (result.data.status==200) {
    //           Toast('登录成功')
    //           this.setData({
    //             login_flag:1
    //           })
    //           app.token=result.header.Authorization
    //         }
    //       }
    //     })
    //   }
    // })
  },
  //登录注册方法
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
            if (result.data.status==201) {
              Toast('您尚未注册')
              setTimeout(
                function(){
                  wx.navigateTo({
                    url: '/pages/register/register'
                  })
                },2000)
            }
            else{
              Toast('登录成功')
              this.setData({
                login_flag:1
              })
              app.token=result.header.Authorization
            }
          }
        })
      }
    })
  },
  // 头像方法
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })
    wx.setStorage({
      key:'avatarUrl',
      data:this.data.avatarUrl
    })
  },
})

