const app = getApp()
Page({
  data: {
    Data:[{
      "statisticsId":"1",
      "courseId":"1",
      "courseName":"软件工程",
      "period":"1-2节",
      "date":"2022-11-24",
      "enrollNum":139,
      "attendanceNum":135,
      "absenceNum":1,
      "leaveNum":1,
      "lateNum":2,
      "attendanceRate":0.971,
      "supervisorId":"1",
      "supervisorName":"aaa"
    }]
  },
  onShow() {
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var Year = date.getFullYear()
    var Month = date.getMonth()+1
    var Day = date.getDate()
    var d = Year+'-'+Month+'-'+Day
    // wx.request({
    //   url: 'https://nicklorry.top:8090/supervisor/roll/statistics',
    //   data: {
    //     weekDay:d
    //   },
    //   header: {
    //     Authorization:app.token
    //   },
    //   method: "GET",
    //   success: (result) => {
    //     this.setData({
    //       Data:result.data.data.statisticsRecords
    //     })
    //   }
    // })
  },
  click(e){
    var index = e.currentTarget.dataset.index
    app.historyTemp = this.data.Data[index]

  }
})