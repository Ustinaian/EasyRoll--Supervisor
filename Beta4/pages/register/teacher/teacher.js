import Toast from '@vant/weapp/toast/toast';
const app = getApp()

Page({
  data:{
    grades:[2019,2020,2021,2022],
    roles:['教师','辅导员'],
    show_grade:false,
    temp_grade:'',
    show_role:false,
    temp_role:'',
    id:'',
    name:'',
    departmentName:'',
    role:'',
    role_num:''
  },

  // 学号相关方法
  onChange_id(event){
    this.setData({
      id:event.detail
    })
  },

  // 姓名相关方法
  onChange_name(event){
    this.setData({
      name:event.detail
    })
  },
  // 学院相关方法
  onChange_departmentName(event){
    this.setData({
      departmentName:event.detail
    })
  },
  // 角色相关方法
  showPopup_role(){
    this.setData({
      temp_role:this.data.roles[0],
      show_role:true
    })
  },
  onChange_role(event){
    this.setData({
      temp_role:event.detail.value
    })
  },
  confirm_role(){//确认方法
    this.setData({
      role:this.data.temp_role,
      show_role:false
    })
    if (this.data.temp_role=="教师") {
      this.setData({
        role_num:2
      })
    }
    else{
      this.setData({
        role_num:3
      })
    }
    console.log(this.data.role_num)
  },
  cancel_role(){//取消方法
    this.setData({
      show_role:false
    })
  },
  //注册按钮方法
  register(){
    if(this.data.id.trim()==""){
      Toast('请输入职工号')
    }
    else if (this.data.name.trim()=="") {
      Toast('请输入姓名')
    }
    else if (this.data.departmentName.trim()=="") {
      Toast('请选择学院')
    }
    else if (this.data.role.trim()=="") {
      Toast('请选择身份')
    }
    else{
      wx.login({
        success: (result) => {
          wx.request({
            url: 'https://nicklorry.top:8090/professor/base/register',
            data: {
              code:result.code,
              id:this.data.id,
              name:this.data.name,
              departmentName:this.data.departmentName,
              role:this.data.role_num
            },
            method: "POST",
            success: (result) => {
              if(result.data.status==200){
                Toast('注册成功')
              }
              setTimeout(() => {
                wx.reLaunch({
                  url: '/pages/mine/mine'
                })
              }, 2000);
            },
          })
        }
      })
    }
  },
  //取消按钮方法
  cancel(){
    wx.navigateBack({
    })
  },
  
})