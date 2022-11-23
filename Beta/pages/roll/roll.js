const app = getApp();
Page({
  data: {
    show:false,
    course:[
      {
        name:'',
        classroom:'',
        period:''
      }
    ],
    code:'',
    flag:''
  },
  onLoad(){
    //获取当天课程
    // wx.request({
    //   url: 'https://nicklorry.top:8090/supervisor/base/course/getAll',
    //   header: {
    //     Authorization:app.token
    //   },
    //   method: "GET",
    //   success: (result) => {
    //     app.course = result.data.courses
    //     this.setData({
    //       app:result.data.courses
    //     })
    //   }
    // })
    this.setData({
      course:app.course
    })
  },
  onShow(){
    this.setData({

    })
  },
  onReady(){
    this.popup_roll=this.selectComponent("#popup_roll");
  },
  course_btn(){
    this.popup_roll.showPopup();
    getApp().token='1'
  },
  _close() {
      this.popup_roll.hidePopup();
  },
  change_course(){
    wx.navigateTo({
      url: './add-course/add-course'
    })
  },
})