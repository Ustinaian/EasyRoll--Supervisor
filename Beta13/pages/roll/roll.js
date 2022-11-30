import Dialog from '@vant/weapp/dialog/dialog';

const app = getApp();
Page({
  data: {
    show:false,
    show2:false,
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
    this.setData({
      course:app.course
    })
  },
  onShow(){
    console.log('1')
  },
  confirm(){
    wx.navigateTo({
      url: './choose-mode/location-roll/location-roll'
    })
  },
  onPullDownRefresh() {

  },
  course_btn:function(e){
    console.log(e.currentTarget.dataset)
    this.setData({
      show2:true,
      id:e.detail.id,
      name:e.detail.name,
      classroomNo:e.detail.classroomNo,
      professorName:e.detail.professorName,
      period:e.detail.period,
      week:e.detail.week
    })
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