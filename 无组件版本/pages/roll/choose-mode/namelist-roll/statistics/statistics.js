const app = getApp()
Page({
  data: {
    absenceList:[
    ],
    leaveList:[
     ],
    lateList:[],
    enrollNum:'',
    attendanceNum:'',
    absenceNum:'',
    leaveNum:'',
    lateNum:'',

  },
  onLoad(options) {
    this.setData({
      absenceList:app.coursedata.absenceList,
      leaveList:app.coursedata.leaveList,
      lateList:app.coursedata.lateList,
      enrollNum:app.coursedata.enrollNum,
      attendanceNum:app.coursedata.attendanceNum,
      absenceNum:app.coursedata.absenceNum,
      leaveNum:app.coursedata.leaveNum,
      lateNum:app.coursedata.lateNum
    })
  },
})