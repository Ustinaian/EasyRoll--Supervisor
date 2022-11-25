import Toast from '@vant/weapp/toast/toast';
import Dialog from '@vant/weapp/dialog/dialog';

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp()

Page({
  data: {
    avatarUrl: defaultAvatarUrl,
    login_flag: 0,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    // wx.login({
    //   success: (result) => {
    //     this.setData({
    //       code:result.code,
    //     })
    //     app.code = result.code
    //   }
    // })
    // wx.getUserProfile({
    //   lang: "zh_CN",
    //   desc: "获取你的昵称、头像、地区及性别",
    //   success: res => {
    //     wx.setStorageSync('userInfoData', res.userInfo)
    //     wx.showToast({
    //       title: "授权成功",
    //       icon: "none"
    //     });
    //     setTimeout(() => {
    //       wx.navigateBack({
    //         //登陆完返回
    //         delta: 1
    //       });
    //     }, 1000);
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //     console.log(res.userInfo);

    //   },
    //   // 失败回调
    //   fail: err => {
    //     reject(err);
    //   }
    // });
  },
  onLoad() {
    
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
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
            console.log(result)
            
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
              this.setData({
                login_flag:1
              })
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
  },
})

