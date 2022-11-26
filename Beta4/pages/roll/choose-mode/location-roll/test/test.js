const app = getApp();
Page({
  data: {

  },
  onLoad(){
    app.flag = 201
    console.log(app.flag)
  },
  btn(){
    wx.switchTab({
      url: '/pages/roll/roll'
    })
    
  }
})