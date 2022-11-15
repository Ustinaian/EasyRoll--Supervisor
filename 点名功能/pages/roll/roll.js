// pages/roll/roll.js
Page({
  data: {

  },
  onReady(){
    this.popup_roll=this.selectComponent("#popup_roll");
  },
  course_btn(){
    this.popup_roll.showPopup();
    console.log('hello')
  }
})