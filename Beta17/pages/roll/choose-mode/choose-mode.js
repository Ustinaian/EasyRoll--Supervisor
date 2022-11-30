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
    wx.navigateTo({
      url: '../choose-mode/location-roll/location-roll'
    })
  },
  onLoad(options) {
    
    
  }
})