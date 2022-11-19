const app = getApp();
Page({
  data: {
    course:[],
    code:'',
    flag:''
  },
  onLoad(){
    this.setData({
      course:app.course,
      flag:app.flag
    })
  },
  onShow(){
    this.setData({
      flag:app.flag
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
  }
})