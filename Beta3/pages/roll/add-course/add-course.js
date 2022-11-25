import Toast from '@vant/weapp/toast/toast';

// 自定义加载图标


const app = getApp()
Page({
  data: {
    value: '',
    weeks: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
    grades:[2019,2020,2021,2022],
    show_startweek:false,
    show_endweek:false,
    show_grade:false,
    temp_startweek:'',
    temp_endweek:'',
    temp_grade:'',
    startWeek:'',
    endWeek:'',
    grade:''
  },
  showPopup_startweek() {
    this.setData({ show_startweek: true });
  },
  showPopup_endweek() {
    this.setData({ show_endweek: true });
  },
  showPopup_grade() {
    this.setData({ show_grade: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  onChange_name(e){

  },
  onChange_startWeek(event) {
    this.temp_startweek = event.detail.value
  },
  confirm_startWeek(){
    this.setData({
      startWeek:this.temp_startweek,
      show_startweek:false
    })
  },
  cancel_startWeek(){
    this.setData({
      show_startweek:false
    })
  },
  onChange_endWeek(event) {
    this.temp_endweek=event.detail.value
  },
  confirm_endWeek(){
    this.setData({
      endWeek:this.temp_endweek,
      show_endweek:false
    })
  },
  cancel_endWeek(){
    this.setData({
      show_endweek:false
    })
  },
  onChange_grade(event) {
    this.temp_grade=event.detail.value
  },
  confirm_grade(){
    this.setData({
      grade:this.temp_grade,
      show_grade:false
    })
  },
  cancel_grade(){
    this.setData({
      show_grade:false
    })
  },
  confirm(){
    Toast.loading({
      message: '添加中...',
      forbidClick: true,
      duration:0,
    });
    wx.request({
      url: 'https://nicklorry.top:8090/supervisor/base/course/upload',
      data: {
        courseName:''
      },
      header: {
        Authorization:app.token
      },
      method: "POST",
      success: (result) => {}
    })
  },
  cancel(){
    wx.navigateBack({

    })
  }
});
