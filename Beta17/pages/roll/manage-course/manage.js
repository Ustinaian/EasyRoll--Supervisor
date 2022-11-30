const app = getApp()
Page({
  data: {
    courses:[],
    code:'',
    flag:'',
    show: false,
    coursenum:0,
    curCourse:"",
    curClass:"",
    curPeriod:"",
    curweek:"",
    curTeacher:"",
    curclassroom:""
  },
  onLoad(){
    wx.request({
      url: 'https://nicklorry.top:8090/supervisor/base/course/getAll',
      header: {
        Authorization:app.token
      },
      method: "GET",
      success:(res)=>{
          // console.log(res)
          // console.log(res.data.data.courses)
          const data = res.data.data.courses
          const length = res.data.data.total
          this.setData({courses:data,coursenum:length})
      },
      fail:(err)=>{
        console.log(err)
      }
    })
  },
  showPopup(e) {
    const {index} = e.currentTarget.dataset
    const curCourse = this.data.courses[index].name
    const curPeriod = this.data.courses[index].period
    const curweek = `${this.data.courses[index].startWeek}-${this.data.courses[index].endWeek}`
    const curTeacher = this.data.courses[index].professorName
    const curclassroom = this.data.courses[index].classroom
    this.setData({curCourse,curPeriod,curweek,show: true,curTeacher,curclassroom })
    app.courseId=this.data.courses[index].id
  },
  addCourse(){
    wx.navigateTo({
      url:'./add-course/add-course'
    })
  },
  //跳到课程修改界面
  updateCourse(e){
    var index = e.currentTarget.dataset.index
    console.log(index)
    app.courseTemp = this.data.courses
    wx.navigateTo({
      url:'./update-course/update-course?index='+index
    })
  },
  onClose() {
    this.setData({ show: false });
  },
  //
  beginroll(){
    wx.navigateTo({
      url:'./choose-mode/choose-mode'
    })
  },
  // 返回
  returnindex(){
    this.setData({ show: false });
  },
  // 重新进入时重新进行请求数据
  onShow(){
    wx.request({
      url: 'https://nicklorry.top:8090/supervisor/base/course/getAll',
      header: {
        Authorization:app.token
      },
      method: "GET",
      success:(res)=>{
          // console.log(res)
          // console.log(res.data.data.courses)
          const data = res.data.data.courses
          const length = res.data.data.total
          this.setData({courses:data,coursenum:length})
      },
      fail:(err)=>{
        console.log(err)
      }
    })
  },
  onPullDownRefresh(){
    wx.request({
      url: 'https://nicklorry.top:8090/supervisor/base/course/getAll',
      header: {
        Authorization:app.token
      },
      method: "GET",
      success:(res)=>{
          // console.log(res)
          // console.log(res.data.data.courses)
          const data = res.data.data.courses
          const length = res.data.data.total
          this.setData({courses:data,coursenum:length})
      },
      fail:(err)=>{
        console.log(err)
      }
    })
   setTimeout(() => {
    wx.stopPullDownRefresh({
      success: (res) => {},
    })
   }, 1000);
  },
})