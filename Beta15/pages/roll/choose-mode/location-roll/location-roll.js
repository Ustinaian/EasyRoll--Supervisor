const app = getApp();

Page({
  data: {
    course:[],
    token:'1'
  },
  onLoad(options) {
    this.setData({
      token:app.token,
      course:app.course[0]
    })
  },
  release(){
    // wx.request({
    //   url: 'https://nicklorry.top:8090/supervisor/roll/publish',
    //   data: {
    //     startTime:'',
    //     endTime:'',
    //     courseId:''
    //   },
    //   header: {'Authorization':token},
    //   method: "POST",
    //   success: (result) => {},
    //   fail: (res) => {},
    //   complete: (res) => {},
    // })
    wx.navigateTo({
      url: './test/test'
    })
  },
  back(){
    wx.navigateBack({
      delta: 0
    })
  }
})