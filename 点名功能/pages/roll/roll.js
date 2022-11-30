//index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    q_videos: [], //视频
    q_videoIndex: 0, //视频index
    q_yjz: false, //是否允许预加载
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // videoList内的视频地址为临时地址，届时视频链接可能失效，如果视频链接失效，您只需自己随意找几个视频替换掉地址即可
    var videoList = [{
      id: '1',
      url: "http://sns-1255549670.cos.ap-guangzhou.myqcloud.com/tmp_29f5566f128e9a4ee470f30c310b63678b7e786e2ab03ac2.mp4?0.42363964325301695",
    }, {
      id: '2',
      url: "http://sns-1255549670.cos.ap-guangzhou.myqcloud.com/tmp_4eeae5bfcad7f75ec481b5ad87f4a9102ea7c735df672d18.mp4?0.9295834871549054",
    }, {
      id: '3',
      url: "http://sns-1255549670.cos.ap-guangzhou.myqcloud.com/tmp_7a9caafe0a37a460686fcf2a4a6dc492e0e44119c10cc47b.mp4?0.401603295588834",
    }]
    this.setData({
      q_videos: videoList, //视频
      // 每次加载3个视频，当获取的视频数量小于3时，证明没有后续视频了，也就不需要在进行预加载了
      q_yjz: videoList.length < 3 ? false : true, //是否允许预加载
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //动态更新当前视频下标
  q_swiperBindchange: function (e) {
    console.log('当前视频下标：', e.detail.current)
    this.setData({
      q_videoIndex: e.detail.current
    })
    // 当加载的视频还剩1个未被滑到时加载下一页
    if (this.data.q_videos.length - (e.detail.current + 1) == 1 && this.data.q_yjz) {
      this.q_yjzVideos() //预加载视频
    }
  },

  //预加载视频
  q_yjzVideos: function () {
    console.log('预加载视频')
    var videoList = [{
      id: '4',
      url: "http://sns-1255549670.cos.ap-guangzhou.myqcloud.com/tmp_b0855d9c92f6ce4cd91796e8b1ca39a78bca4d48f524bb06.mp4?0.27723747875520743",
    }, {
      id: '5',
      url: "http://sns-1255549670.cos.ap-guangzhou.myqcloud.com/wx982ed8d3473ced2c.o6zAJs8Oghy9CSGBPJEdSoJABPEU.SZVa80OoOknW8750107432d93943f9ce930651ad5ffa.mp4?0.27723747875520743",
    }]
    var array = this.data.q_videos.concat(videoList) //concat() 方法：用于连接两个或多个数组,并返回一个新数组
    this.setData({
      q_videos: array, //视频
      q_yjz: videoList.length < 3 ? false : true, //是否允许预加载
    })
  },
})

