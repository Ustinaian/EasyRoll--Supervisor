Page({
  data: {
    nickname:''
  },
  onLoad(){
    let that = this
    wx.getStorage({
      key:'nickname',
      success (res) {
        that.setData({
          nickname:res.data
        })
      }
    })
  },
  onChange(e){
    this.setData({
      nickname:e.detail
    })
  },
  confirm(){
    wx.setStorage({
      key:'nickname',
      data:this.data.nickname
    })
    var pages = getCurrentPages(); // 获取页面栈
    var currPage = pages[pages.length - 1]; // 当前页面
    var prevPage = pages[pages.length - 2]; // 上一个页面
    prevPage.setData({
      nickname:this.data.nickname
    })
    wx.navigateBack({
      delta:1
    })
  }
})