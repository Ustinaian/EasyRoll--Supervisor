import Toast from '@vant/weapp/toast/toast';
const app = getApp();

Page({
  data: {
    value: '',
    loaction:0,
    Hour:'',
    Minute:'',
    locations:['西三','西二','西一','中楼','东一','东二','东三','文一','文二','文三','文四'],
    weeks: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
    times:[
      {
        values: ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
        className: 'hours',
        defaultIndex:''
      },
      {
        values: ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'],
        className: 'minutes',
        defaultIndex:''
      },
    ],

    show_startweek:false,
    show_endweek:false,
    show_loaction:false,
    show_startTime:false,
    show_endTime:false,

    temp_loaction:'',
    temp_startweek:'',
    temp_endweek:'',
    tempFilePaths:[],
    temp_index:'',
    temp_startTime:'',
    temp_endTime:'',

    startWeek:'',
    endWeek:'',
    studentList:'',
    flag_list:false,
    courseName:'',
    professorName:'',
    classroomNo:'',
    courseArrangements:'',
    Index:'',//楼号的索引
    startTime:'',
    endTime:''
  },
  onShow(){
  },
  onLoad(){
    this.setData({
      flag_list:false
    })
  },
  onClose() {
    this.setData({
      show: false,
    });
  },
  // 课程名称
  onChange_name(e){
    this.setData({
      courseName:e.detail
    })
  },
  // 教师名称
  onChange_professorName(e){
    this.setData({
      professorName:e.detail
    })
  },
  // 教室楼号
  showPopup_location() {
    this.setData({
      temp_location:this.data.locations[0],
      temp_index:0,
      show_location:true
    });
  },
  onChange_location(event) {
    this.setData({
      temp_location:event.detail.value,
      temp_index:event.detail.index
    })
  },
  confirm_location(){
    console.log(this.data.temp_index)
    this.setData({
      location:this.data.temp_location,
      Index:this.data.temp_index,
      show_location:false
    })
  },
  cancel_location(){
    this.setData({
      show_location:false
    })
  },
  // 教室编号
  onChange_classroomNo(e){
    this.setData({
      classroomNo:e.detail
    })
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
      temp_endweek:this.data.weeks[0],
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
  // 开始时间
  showPopup_startTime() {
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取当前小时
    var Hour = date.getHours()
    var Minute = date.getMinutes()
    this.setData({
      temp_startTime:this.data.times[0].values[Hour]+':'+this.data.times[1].values[Minute],
      show_startTime: true,
      ['times[0].defaultIndex']:Hour,
      ['times[1].defaultIndex']:Minute
    });
  },
  onChange_startTime(event) {
    var value = event.detail.value
    this.setData({
      temp_startTime:value[0]+':'+value[1]
    })
  },
  confirm_startTime(){
    this.setData({
      startTime:this.data.temp_startTime,
      show_startTime:false
    })
  },
  cancel_startTime(){
    this.setData({
      show_startTime:false
    })
  },
  // 结束时间
  showPopup_endTime() {
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取当前小时
    var Hour = date.getHours()
    var Minute = date.getMinutes()
    this.setData({
      temp_endTime:this.data.times[0].values[Hour]+':'+this.data.times[1].values[Minute],
      show_endTime: true,
      ['times[0].defaultIndex']:Hour,
      ['times[1].defaultIndex']:Minute
    });
  },
  onChange_endTime(event) {
    var value = event.detail.value
    this.setData({
      temp_endTime:value[0]+':'+value[1]
    })
  },
  confirm_endTime(){
    this.setData({
      endTime:this.data.temp_endTime,
      show_endTime:false
    })
  },
  cancel_endTime(){
    this.setData({
      show_endTime:false
    })
  },
  // 发布签到按钮
  confirm(){
    var indexTemp = this.data.Index+1
    wx.request({
      url: 'https://nicklorry.top:8090/supervisor/roll/publish',
      data: {
        startTime:this.data.startTime,
        endTime:this.data.endTime,
        courseId:app.courseId
      },
      header: {
        Authorization:app.token
      },
      method: "POST",
      success: (result) => {
        console.log(result)
        if(result.data.status==200){
          Toast('发布定位签到成功')
          wx.navigateBack({
          })
        }
        else{
          Toast('发布定位签到失败')
        }
      }
    })
    
  },
  cancel(){
    wx.navigateBack({

    })
  }
});
