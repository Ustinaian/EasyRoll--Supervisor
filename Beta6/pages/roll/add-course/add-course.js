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
    grade:'',
    fileList:[],
    flag_list:false
  },
  onLoad(){
    this.setData({
      flag_list:false
    })
  },
  // 上传文件
  afterRead(event) {
    this.setData({
      flag_list:true,
      fileList:event.detail.file
    })
    console.log(event.detail)
  },
  onClose() {
    this.setData({ show: false });
  },
  onChange_name(e){

  },
  // 开课周数
  showPopup_startweek() {
    this.setData({
      temp_startweek:this.data.weeks[0],
      show_startweek: true
    });
  },
  onChange_startWeek(event) {
    this.setData({
      temp_startweek:event.detail.value
    })
  },
  confirm_startWeek(){
    this.setData({
      startWeek:this.data.temp_startweek,
      show_startweek:false
    })
  },
  cancel_startWeek(){
    this.setData({
      show_startweek:false
    })
  },
  // 结课周数
  showPopup_endweek() {
    this.setData({
      temp_startweek:this.data.weeks[0],
      show_endweek: true
    });
  },
  onChange_endWeek(event) {
    this.setData({
      temp_endweek:event.detail.value
    })
  },
  confirm_endWeek(){
    this.setData({
      endWeek:this.data.temp_endweek,
      show_endweek:false
    })
  },
  cancel_endWeek(){
    this.setData({
      show_endweek:false
    })
  },
  // 授课年级
  showPopup_grade() {
    this.setData({
      temp_grade:this.data.grades[0],
      show_grade: true
    });
  },
  onChange_grade(event) {
    this.setData({
      temp_grade:event.detail.value
    })
  },
  confirm_grade(){
    this.setData({
      grade:this.data.temp_grade,
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
    // wx.request({
    //   url: 'https://nicklorry.top:8090/supervisor/base/course/upload',
    //   data: {
    //     courseName:''
    //   },
    //   header: {
    //     Authorization:app.token
    //   },
    //   method: "POST",
    //   success: (result) => {}
    // })
  },
  cancel(){
    wx.navigateBack({

    })
  }
});
