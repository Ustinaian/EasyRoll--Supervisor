Page({
  /**
   * 页面的初始数据
   */
  data: {
    video_list:[
      {
        id: 1,
        value: 'test1',
      },
      {
        id: 2,
        value: 'test2',
      },
      {
        id: 3,
        value: 'test3',
      },
      {
        id: 4,
        value:'点名结束'
      }
    ],
    pageY:'',    // 触摸起始高度坐标
    pageX:'',
    animation:'',  // 纵向滑动动画
    animationX:'',  // 横向滑动动画
    up_stroke:false,// ture:上划；false：下划
    difference:'', // 拖动的距离
    differenceX:'',// 横向拖动的距离
    windowHeight:'',// 屏幕高度
    windowWidth:''//屏幕宽度
  },
  onLoad: function (options) {
    // 赋值：屏幕高度、
    this.setData({
      windowHeight:wx.getSystemInfoSync().windowHeight,
      windowWidth:wx.getSystemInfoSync().windowWidth
    })
  },
  // 划动起始坐标方法
  touchStart(e){
    // 开始坐标
    this.setData({
      pageY:e.touches[0].pageY,
      pageX:e.touches[0].pageX
    })
  },
  // 划动过程坐标方法
  touchMove(e){
    
    let n = e.currentTarget.dataset.index;   // 触摸的第几个序号
    let difference = e.touches[0].pageY - this.data.pageY; // 移动后和起始值的差值
    let differenceX = e.touches[0].pageX - this.data.pageX; // 移动后和起始值的差值
    const windowHeight = this.data.windowHeight;
    const windowWidth = this.data.windowWidth;

    

    // 提醒用户该动作的结果
    // if(differenceX > windowWidth/11 && Math.abs(difference) < windowHeight /10){
    //   wx.showToast({
    //     title:this.data.video_list[n].value+'未到',
    //     icon:'none'
    //   })
    //   return;
    // }
    if(difference>0){
      wx.showToast({
        title: '无法往下滑哦~',
        icon:'none'
      })
      return;
    }
    else if(Math.abs(difference) > windowHeight/8){
      wx.showToast({
        title: this.data.video_list[n].value+'到课',
        icon:'none'
      })
    }
    

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
      if(Math.abs(difference) <= windowHeight /8){   // 小于1/7回原位置 ---------------------------
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
        that.data.up_stroke ? n++ : n--;
        animation.top(-(n * windowHeight)).step()
        that.setData({
          animation: animation.export(),
          up_stroke:false, // 重置划动状态
          difference:0,   // 重置划动距离
        })
      }
    }).exec(()=>{
      // 往上滑执行的方法

    });
    
  },
  // 判断是否到底
  is_continue(n,difference){
    if(difference < 0){ // 上划
      if(n == this.data.video_list.length-1){ // 最后一个视频，提示到底
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
    // console.log('1')
  },
 })