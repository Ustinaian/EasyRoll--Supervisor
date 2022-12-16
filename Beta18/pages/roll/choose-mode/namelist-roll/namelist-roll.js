import Toast from '@vant/weapp/toast/toast';
const app = getApp()
Page({
  data:{
    active: 'a', //默认在name="a"的界面
    namelist: [],
    absencelist:[],//缺课列表
    index:0,//当前所遍历的人的索引
    show:false,
    totalstu:0, //本次点名人数
    remaindernum:0,//剩余未点人数
    absencenum:0,//缺课待处理人数
    absencenum_1:0,
    pinyinList:[],
    exportdatashow:false,
    actions:[
      { name: '导出为文本', color: 'black' },
      { name: '导出为表格', color: 'black' },
    ],
    absenceshow:[],//缺课列表是否显示
    enrollNum:0,
    attendanceNum:0,
    absenceNum:0,
    leaveNum:0,
    lateNum:0
  },
  // 监听标签页切换事件
  onChange(e){
    this.setData({active:e.detail.name})
  },
  onLoad(){
    // 1.网络请求基本使用
    wx.request({
      url:'https://nicklorry.top:8090/supervisor/roll/getForm',
      data:{
        courseId:app.courseId
      },
      header: {
        Authorization:app.token
      },
      method: "GET",
      success:(res)=>{
        const data = res.data.data.students
        this.setData({namelist:data.reverse(),index:data.length-1,remaindernum:data.length,totalstu:data.length})

        // 建立长连接
        wx.connectSocket({
          url: 'wss://nicklorry.top:8090/supervisor/roll/call/'+app.courseId+'/'+this.data.totalstu+'/'+app.token,
        })
      },
      fail:(err)=>{
        console.log("err", err)
      }
    })
  },

  // 已到点击事件
  handleSwipeOutleft(){
    let index = this.data.index


    //学生已到，长连接发送数据
    wx.sendSocketMessage({
      data: this.data.namelist[index].id+',0',
      success:(res)=>{
        console.log(res)
      }
    })

    //轻提示xxx已到
    const message = this.data.namelist[index].name+'已到'
    Toast({
      message,
      duration:500
    });
    // 将已到学生数量-1
    this.setData({remaindernum:this.data.remaindernum-1,index:this.data.index-1})
    
    wx.onSocketMessage((result) => {
      var temp = JSON.parse(result.data)
      if(result!=''){
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
        });
        app.coursedata=temp.data
        this.setData({enrollNum:app.coursedata.enrollNum,attendanceNum:app.coursedata.attendanceNum,
          absenceNum:app.coursedata.absenceNum,leaveNum:app.coursedata.leaveNum,lateNum:app.coursedata.lateNum
        })
      }
    })
  },

  //未到点击事件
  handleSwipeOutright(){
    let index = this.data.index

    //轻提示xxx未到
    const message = this.data.namelist[index].name+'未到'
    Toast({
      message,
      duration:500
    });

    //将未到学生添加到未到学生列表
    const templist = this.data.absencelist
    templist.push(this.data.namelist[index])
    this.setData({absencelist:templist})
    // 将已到学生数量-1
    this.setData({absencenum:this.data.absencenum+1,index:this.data.index-1,remaindernum:this.data.remaindernum-1,absencenum_1:this.data.absencenum_1+1})

    const absenceshowtemp = this.data.absenceshow  
    absenceshowtemp.push(true)
    this.setData({absenceshow:absenceshowtemp})
  },

  //缺课界面
  //迟到点击事件
  belate(e){
    const {index} = e.currentTarget.dataset
    this.setData({lateNum:this.data.lateNum+1})
    // 已经被处理
    const absenceshowtemp = this.data.absenceshow
    absenceshowtemp[index] = false
    this.setData({absenceshow:absenceshowtemp,absencenum_1:this.data.absencenum_1-1})

    //发送迟到长连接数据
    wx.sendSocketMessage({
      data: this.data.absencelist[index].id+',2',
      success:(res)=>{
        console.log(res)
      }
    })

    wx.onSocketMessage((result) => {
      var temp = JSON.parse(result.data)
      if(result!=''){
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
        });
        app.coursedata=temp.data
        setTimeout(() => {
          this.setData({enrollNum:app.coursedata.enrollNum,attendanceNum:app.coursedata.attendanceNum,
            absenceNum:app.coursedata.absenceNum,leaveNum:app.coursedata.leaveNum,lateNum:app.coursedata.lateNum
          })
        }, 1500);
      }
    })
  },
  //到课点击事件
  bearrival(e){
    const {index} = e.currentTarget.dataset
    // 已经被处理
    const absenceshowtemp = this.data.absenceshow
    absenceshowtemp[index] = false
    this.setData({absenceshow:absenceshowtemp})

    //发送长连接数据
    wx.sendSocketMessage({
      data: this.data.absencelist[index].id+',0',
      success:(res)=>{
        console.log(res)
      }
    })

    this.setData({absencenum_1:this.data.absencenum_1-1})


    wx.onSocketMessage((result) => {
      var temp = JSON.parse(result.data)
      if(result!=''){
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
        });
        app.coursedata=temp.data
        setTimeout(() => {
          this.setData({enrollNum:app.coursedata.enrollNum,attendanceNum:app.coursedata.attendanceNum,
            absenceNum:app.coursedata.absenceNum,leaveNum:app.coursedata.leaveNum,lateNum:app.coursedata.lateNum
          })
        }, 1500);
      }
    })
  },
  //请假点击事件
  beleave(e){
    const {index} = e.currentTarget.dataset

    const absenceshowtemp = this.data.absenceshow
    absenceshowtemp[index] = false
    this.setData({absenceshow:absenceshowtemp})

    wx.sendSocketMessage({
      data: this.data.absencelist[index].id+',1',
      success:(res)=>{
        console.log(res)
      }
    })
    
    this.setData({absencenum_1:this.data.absencenum_1-1})

    wx.onSocketMessage((result) => {
      var temp = JSON.parse(result.data)
      if(result!=''){
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
        });
        app.coursedata=temp.data
        setTimeout(() => {
          this.setData({enrollNum:app.coursedata.enrollNum,attendanceNum:app.coursedata.attendanceNum,
            absenceNum:app.coursedata.absenceNum,leaveNum:app.coursedata.leaveNum,lateNum:app.coursedata.lateNum
          })
        }, 1500);
      }
    })
  },
  //缺课点击事件
  beabsence(e){
    const {index} = e.currentTarget.dataset

    const absenceshowtemp = this.data.absenceshow
    absenceshowtemp[index] = false
    this.setData({absenceshow:absenceshowtemp})

    wx.sendSocketMessage({
      data: this.data.absencelist[index].id+',3',
      success:(res)=>{
        console.log(res)
      }
    })

    this.setData({absencenum_1:this.data.absencenum_1-1})
    wx.onSocketMessage((result) => {
      var temp = JSON.parse(result.data)
      if(result!=''){
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
        });
        app.coursedata=temp.data
        setTimeout(() => {
          this.setData({enrollNum:app.coursedata.enrollNum,attendanceNum:app.coursedata.attendanceNum,
            absenceNum:app.coursedata.absenceNum,leaveNum:app.coursedata.leaveNum,lateNum:app.coursedata.lateNum
          })
        }, 1500);
      }
    })
  },
  //查看统计结果
  lookresult(){
    wx.navigateTo({
      url: './statistics/statistics',
    })
  },
  //数据导出事件
  exportdata(){
    this.setData({ exportdatashow: true });
    console.log("数据导出")
  },
  endroll(){
    console.log("结束点名")
  },
  //打开和关闭数据导出选项
  onClose() {
    console.log("取消")
    this.setData({ exportdatashow: false });
  },
})
