import Toast from '@vant/weapp/toast/toast';
var tempFiles;

const app = getApp()
Page({
  data: {
    value: '',
    loaction:0,
    locations:['西三','西二','西一','中楼','东一','东二','东三','文一','文二','文三','文四'],
    weeks: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
    grades:[2019,2020,2021,2022],
    show_startweek:false,
    show_endweek:false,
    show_grade:false,
    show_loaction:false,
    temp_loaction:'',
    temp_startweek:'',
    temp_endweek:'',
    temp_grade:'',
    startWeek:'',
    endWeek:'',
    grade:'',
    studentList:'',
    flag_list:false,
    courseName:'',
    professorName:'',
    classroomNo:'',
    courseArrangements:'',
    tempFilePaths:[],
    temp_index:'',
    Index:''
  },
  onLoad(){
    this.setData({
      flag_list:false
    })
  },
  onClose() {
    this.setData({ show: false });
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
  // 上传文件
  afterRead(event) {
    const { file } = event.detail;
    this.setData({
      flag_list:true,
      fileList:file,
      tempFilePaths:file.url
    })
    console.log(file.url)
  },
  upload(){
    wx.chooseMessageFile({
      count: 1,
      type: "file",
      success: (res) => {
        tempFiles = res.tempFiles[0].path;
        console.log(tempFiles)
        this.setData({
          flag_list:true,
          fileList:res.tempFiles[0]
        })
      }
    })
    
  },
  confirm(){
    var indexTemp = this.data.Index+1
    console.log(tempFiles)
    console.log(this.data.courseName)
    console.log(indexTemp+this.data.classroomNo)
    console.log(this.data.startWeek)
    console.log(this.data.endWeek)
    console.log(this.data.grade)
    console.log(this.data.courseArrangements)
    
    wx.uploadFile({
      url: 'https://nicklorry.top:8090/supervisor/base/course/upload',
      filePath: tempFiles,
      name: 'studentList',
      header:{
        Authorization:app.token
      },
      formData: {
        "courseName":this.data.courseName,
        "professorName":this.data.professorName,
        "classroomNo":indexTemp+this.data.classroomNo,
        "startWeek":this.data.startWeek,
        "endWeek":this.data.endWeek,
        "grade":this.data.grade,
        "courseArrangements":this.data.courseArrangements
      },
      success: function (res) {
        console.log(res)
        var status = JSON.parse(res.data).status
        if(status==200){
          Toast('添加成功')
          setTimeout(() => {
            wx.navigateBack({
                
            })
          }, 3000);
        }
        else{
          Toast('添加失败')
        }
      }
    })
  },
  cancel(){
    wx.navigateBack({

    })
  }
});