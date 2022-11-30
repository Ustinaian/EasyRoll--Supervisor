Page({
  /**
   * 页面的初始数据
   */
  data: {
   video_list:[
    {video_src:'https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218093206z8V1JuPlpe.mp4'},
    {video_src:'https://stream7.iqilu.com/10339/article/202002/17/c292033ef110de9f42d7d539fe0423cf.mp4'},
    {video_src:'https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218025702PSiVKDB5ap.mp4'},
    {video_src:'https://stream7.iqilu.com/10339/article/202002/18/2fca1c77730e54c7b500573c2437003f.mp4'},
    {video_src:'https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218093206z8V1JuPlpe.mp4'},
    {video_src:'https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4'},
    {video_src:'https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218025702PSiVKDB5ap.mp4'},
    {video_src:'https://stream7.iqilu.com/10339/article/202002/17/c292033ef110de9f42d7d539fe0423cf.mp4'},
    {video_src:'https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218093206z8V1JuPlpe.mp4'},
    {video_src:'https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4'},
   ],
   pageY:'',    // 触摸起始高度坐标
   animation:'',  // 视频划动动画
   up_stroke:false,// ture:上划；false：下划
   difference:'', // 拖动的距离
   windowHeight:'',// 屏幕高度
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   // 赋值：屏幕高度、
   this.setData({
    windowHeight:wx.getSystemInfoSync().windowHeight
   })
  },
  // 划动起始坐标方法
  touchStart(e){
   // 开始坐标
   this.setData({
    pageY:e.touches[0].pageY,
   })
  },
  // 划动过程坐标方法
  touchMove(e){
   let n = e.currentTarget.dataset.index;   // 触摸的第几个序号
   let difference = e.touches[0].pageY - this.data.pageY; // 移动后和起始值的差值
   if(this.is_continue(n,difference)){    // 判断是否到底
    return;
   } 
   // 划动动画 -------------------------------------
   var animation = wx.createAnimation({    // 移动动效
    duration: 0,
   });
   animation.top(difference - (n*this.data.windowHeight)).step()
   this.setData({
    animation: animation.export(),     // 动画
    up_stroke:difference > 0 ? false : true, // 是否上划,
    difference:difference,          // 拖动的距离
   })
  },
  // 划动结束坐标方法
  touchEnd(e){
   let n = e.currentTarget.dataset.index;
   let difference = this.data.difference; // 拖动的距离
   if(this.is_continue(n,difference)){
    return;
   }
   const windowHeight = this.data.windowHeight;   // 屏幕高度
   let that = this;
   // 根据id获取点击元素距顶部高度
   var query = wx.createSelectorQuery();
   let id = '#' + e.currentTarget.id;
   query.select(id).boundingClientRect(function (rect) { // 获取高度
    if(Math.abs(difference) <= windowHeight /7){   // 小于1/7回原位置 ---------------------------
     var animation = wx.createAnimation({ // 移动动效
      duration: 100,
     });
     animation.top(-(n * windowHeight)).step()
     that.setData({
      animation: animation.export(),
      up_stroke:false, // 重置划动状态
      difference:0,   // 重置划动距离
     })
    }else{ // 大于1/4，移至拖动的下一个视频 --------------------------------
     var animation = wx.createAnimation({ // 移动动效
      duration: 200,
     });
     that.data.up_stroke ? n++ : n--;   // 上划：n+1 下划：n-1
     animation.top(-(n * windowHeight)).step()
     that.setData({
      animation: animation.export(),
      up_stroke:false, // 重置划动状态
      difference:0,   // 重置划动距离
     })
    }
   }).exec();
  },
  // 判断是否到底
  is_continue(n,difference){
   if(difference < 0){ // 上划
    if(n == this.data.video_list.length - 1){ // 最后一个视频，提示到底
     if(difference < -20){
      wx.showToast({
       title: '已经到底了~~',
       icon:'none',
       duration:1000
      })
     }
     return true;
    }
   }else{
    if(n == 0){
     if(difference > 20){
      wx.showToast({
       title: '上面没有了~~',
       icon:'none',
       duration:1000
      })
     }
     return true;
    }
   }
  },
 })