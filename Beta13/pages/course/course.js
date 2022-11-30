const app = getApp()
Page({
  data: {
    startPageX: 0,
    flag:1
  },
  // 滑动手势开始事件
  startEvent(event) {
    if (event.changedTouches[0].pageX) {
      this.data.startPageX = event.changedTouches[0].pageX
    } else {
      this.data.startPageX = event.changedTouches[0].x
    }
  },
  // 滑动手势结束事件
  endEvent(event) {
    let endPageX = 0
    if (event.changedTouches[0].pageX) {
      endPageX = event.changedTouches[0].pageX
    } else {
      endPageX = event.changedTouches[0].x
    }
    const moveX = endPageX - this.data.startPageX
    if (Math.abs(moveX) < 50) return
    if (moveX > 100) {
      setTimeout(() => {
        this.setData({
          flag:0
        })
      }, 200);
      console.log('hello')
    }
    else if(moveX < -70){
      setTimeout(() => {
        this.setData({
          flag:0
        })
      }, 200);
      console.log(this.data.flag)
    }
  },
});
