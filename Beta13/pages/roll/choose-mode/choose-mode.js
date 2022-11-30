const app = getApp()
Page({
  data: {
    course:[]
  },
  list_roll(){
    wx.navigateTo({
      url: '../choose-mode/namelist-roll/namelist-roll'
    })
  },
  location_roll(){
    wx.navigateTo({
      url: '../choose-mode/location-roll/location-roll?course' + JSON.stringify(this.course)
    })
  },
  onLoad(options) {
    // var temp = JSON.parse(options.course)
    // this.setData({
    //   course:temp
    // })
  },
  onShow(){
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取当前小时
    var Hour = date.getHours()
    var Minute = date.getMinutes()
    app.Hour = Hour
    app.Minute = Minute
  },
})