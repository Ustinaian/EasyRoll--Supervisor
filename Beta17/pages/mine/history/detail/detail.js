const app = getApp()
Page({
  data: {
    detail:[]
  },
  onLoad(options) {
    this.setData({
      detail:app.historyTemp
    })
  },
  onShow() {
    
  },
})