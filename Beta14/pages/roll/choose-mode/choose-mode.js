Page({
  data: {
    course:[]
  },
  list_roll(){
    wx.reLaunch({
      url: '../choose-mode/namelist-roll/namelist-roll'
    })
  },
  location_roll(){
    wx.reLaunch({
      url: '../choose-mode/location-roll/location-roll?course' + JSON.stringify(this.course)
    })
  },
  onLoad(options) {
    this.setData({
      course:JSON.parse(options.course)
    })
    
  }
})