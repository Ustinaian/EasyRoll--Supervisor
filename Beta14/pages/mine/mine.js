import Toast from '@vant/weapp/toast/toast';
import Dialog from '@vant/weapp/dialog/dialog';

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp()

Page({
  data: {
    nickname:'',//昵称
    name:'',//姓名
    departmentId:'',//专业Id
    id:'',//学号或职工号
    departmentName:'',//专业名称
    role:'',//身份
    currentWeek:'',//当前周数
    avatarUrl: defaultAvatarUrl,
    login_flag: false,//false为未登录
    hu:'hh',//hh为未登录
    motto: 'Hello World',
  },
  onLoad() {
    console.log(this.data.hu)
    let that = this
    wx.login({
      success: (result) => {
        console.log(this.data.hu)
        //进行登录
        wx.request({
          url: 'https://nicklorry.top:8090/auth/login/supervisor',
          method: "POST",
          data:{
            code:result.code
          },
          success: (result) => {
            console.log(result)
            if (result.data.status==200) {
              Toast('登录成功')
              this.setData({
                hu:'1',
                name:result.data.data.name,
                departmentId:result.data.data.departmentId,
                departmentName:result.data.data.departmentName,
                id:result.data.data.id,
                role:result.data.data.role,
                currentWeek:result.data.data.currentWeek
              })
              app.token=result.header.Authorization
            }

          }
        })
      }
    })
    // 获取昵称
    wx.getStorage({
      key:'nickname',
      success (res) {
        that.setData({
          nickname:res.data
        })
      }
    })
    // 获取头像
    wx.getStorage({
      key:'avatarUrl',
      success (res) {
        that.setData({
          avatarUrl:res.data
        })
      }
    })
    // 获取凭证
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
              wx.setStorage({
                key:'nickname',
                data:result.data.data.name
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
