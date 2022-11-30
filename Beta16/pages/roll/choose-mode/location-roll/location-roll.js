import Toast from '@vant/weapp/toast/toast';
const app = getApp();

Page({
  data: {
    Course:'',
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
    classroom:'',
    courseArrangements:'',
    Index:'',//楼号的索引
    startTime:'',
    endTime:'',
    period:''
  },
  onShow(){
    this.setData({
      Course:app.coursedata,
      name:app.coursedata.name,
      professorName:app.coursedata.professorName,
      classroom:app.coursedata.classroom,
      startWeek:app.coursedata.startWeek,
      endWeek:app.coursedata.endWeek,
      period:app.coursedata.period
    })
    
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
    wx.request({
      url: 'https://nicklorry.top:8090/supervisor/roll/publish',
      data:{
        startTime:this.data.startTime,
        endTime:this.data.endTime,
        courseId:this.data.Course.id
      },
      header: {
        Authorization:app.token
      },
      method: "POST",
      success: (result) => {
        if(result.data.status==200){
          wx.showToast({
            title: '发布定位签到成功',
            icon:'none'
          })
        }
        else{
          wx.showToast({
            title: '发布定位签到失败',
            icon:'none'
          })
        }
      }
    })
  },
  cancel(){
    wx.navigateBack({

    })
  }
});
