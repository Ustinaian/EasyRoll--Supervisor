const app = getApp()
Page({
  data: {
    courseId:'58302774',
    enrollNum:'',
    Authorization:'',
  },
  onLoad(){
    // 创建长连接
    wx.connectSocket({
      url: 'wss://nicklorry.top:8090/supervisor/roll/call/'+this.data.courseId+'/'+'10'+'/'+app.token,
    })
  },
  sendMsg(){
    wx.sendSocketMessage({
      data: '200000002,0',
      success:(res)=>{
        console.log(res)
      }
    })
  },
  revMsg(){
    wx.onSocketMessage((result) => {
      
    })
  },
});
