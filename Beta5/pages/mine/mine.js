import Toast from '@vant/weapp/toast/toast';
import Dialog from '@vant/weapp/dialog/dialog';

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp()

Page({
  data: {
    nickname:'',
    departmentId:'',
    id:'',
    departmentName:'',
    role:'',
    currentWeek:'',
    avatarUrl: defaultAvatarUrl,
    login_flag: false,//false为未登录
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
    wx.getStorage({
      key:'Authorization',
      success (res) {
        if(res.data!=""){
          that.setData({
            login_flag:true
          })
        }
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
    //         console.log(result)
    //         if (result.data.status==200) {
    //           Toast('登录成功')
    //           this.setData({
    //             login_flag:true
    //           })
    //           wx.setStorage({
    //             key:'Authorization',
    //             data:result.header.Authorization
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
                },1000)
            }
            else{
              Toast('登录成功')
              this.setData({
                login_flag:true,
                nickname:result.data.data.name,
                departmentId:result.data.data.departmentId,
                departmentName:result.data.data.departmentName,
                id:result.data.data.id,
                role:result.data.data.role,
                currentWeek:result.data.data.currentWeek
              })
              wx.setStorage({
                key:'Authorization',
                data:result.header.Authorization
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

