// pages/statistics/statistics.js
Page({
  data: {
    absenceList:[
      {
        "studentId": "200000010",
        "studentName": " 小华"
    }
    ],
    leaveList:[{
      "studentId": "200000006",
      "studentName": " 小红"
  },
  {
      "studentId": "200000007",
      "studentName": " 小军"
  }],
    lateList:[{
      "studentId": "200000008",
      "studentName": " 小兰"
  },
  {
      "studentId": "200000009",
      "studentName": " 小玉"
  }]
  },
  onLoad(options) {
    wx.onSocketMessage((result) => {

    })
  },
})