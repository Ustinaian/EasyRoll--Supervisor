import Toast from '@vant/weapp/toast/toast';
const app = getApp()
Page({
  data:{
    active: 'a', //默认在name="a"的界面
    namelist: [],
    absencelist:[], //缺课学生列表
    absencelist_t:[],
    trueabsence:[],//真实缺课学生列表
    arrivallist:[], //已到学生列表
    leavelist:[], //请假学生列表
    latelist:[], //迟到学生列表
    isshow:[true, true, true],
    absenceshow :[],
    show:false,
    enrollNum:0,
    totalstu:0, //本次点名人数
    remaindernum:0,//还未点名的数量
    attendanceNum:0,//到课人数
    absenceNum:0, //缺课人数
    leaveNum:0,//请假人数
    lateNum:0,//迟到人数
    absencenum:0,
    absencenum_1:0,
    pinyinList:[],
    indexList:[0,1,2], // 用来保存当前显示的学生在学生列表中的索引
    exportdatashow:false,
    actions:[
      { name: '导出为文本', color: 'black' },
      { name: '导出为表格', color: 'black' },
    ]
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
        // console.log(data)
        // rolldata.splice(0,3,true,true,true)
        this.setData({namelist:data,totalstu:data.length,remaindernum:data.length})
        let rolldata = new Array(this.data.totalstu).fill(true)
        this.setData({isshow:rolldata})
        const pinyinList=[]
        for(let i=0; i<data.length; i++){
          const tempstr = data[i].pinyin.join(" ")
          pinyinList.push(tempstr)
        }
        this.setData({pinyinList:pinyinList})
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
  present(e){
    const {index} = e.currentTarget.dataset
    // console.log(index)
    const namelisttemp = this.data.isshow
    namelisttemp[index] = false
    // 查找下一个最大索引算法
    const max = Math.max.apply(null, this.data.indexList)
    // console.log(max)
    const indexList = this.data.indexList
    if(max <= this.data.totalstu){
      indexList.push(max+1)
    }
    this.setData({indexList})
    namelisttemp[max+1] = true
    this.setData({isshow: namelisttemp})
    const message = this.data.namelist[index].name+'已到'
    //将已到学生加入已到学生列表
    const arrivallist = this.data.arrivallist
    arrivallist.push(this.data.namelist[index])// todo:发送长连接数据
    console.log(this.data.namelist[index].id)

    wx.sendSocketMessage({
      data: this.data.namelist[index].id+',0',
      success:(res)=>{
        console.log(res)
      }
    })

    console.log(this.data.arrivallist)
    //轻提示xxx已到
    Toast({
      message,
      duration:500
    });
    this.setData({remaindernum:this.data.remaindernum-1})
    wx.onSocketMessage((result) => {
      var temp = JSON.parse(result.data)
      console.log(result)
      console.log(temp)
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
      wx.closeSocket({
        
      })
    })
  },

  //未到点击事件
  absence(e){
    const {index} = e.currentTarget.dataset
    const absensestu = this.data.namelist[index]
    //将该学生添加到缺课学生列表
    const absencelist = this.data.absencelist
    absencelist.push(absensestu)
    this.setData({absencelist,absencelist_t:absencelist})
    // console.log(this.data.absencelist)
    const namelisttemp = this.data.isshow
    namelisttemp[index] = false
    // 查找下一个最大索引算法
    const max = Math.max.apply(null, this.data.indexList)
    const indexList = this.data.indexList
    if(max <= this.data.totalstu){
      indexList.push(max+1)
    }
    this.setData({indexList})
    namelisttemp[max+1] = true
    this.setData({isshow: namelisttemp})
    const message = this.data.namelist[index].name+'未到'
    //轻提示xxx未到
    Toast({
      message,
      duration:500
    });
    this.setData({remaindernum:this.data.remaindernum-1})
    this.setData({absencenum:this.data.absencenum+1})
    this.setData({absencenum_1:this.data.absencenum_1+1})
    const absenceshowtemp = this.data.absenceshow  
    absenceshowtemp.push(true)
    this.setData({absenceshow:absenceshowtemp})
    // console.log(this.data.absenceshow)
    
  },

  //缺课界面
  //迟到点击事件
  belate(e){
    const {index} = e.currentTarget.dataset
    console.log(index)
    this.setData({lateNum:this.data.lateNum+1})
    // 已经被处理
    // console.log(this.data.absenceshow)
    const absenceshowtemp = this.data.absenceshow
    absenceshowtemp[index] = false
    this.setData({absenceshow:absenceshowtemp})
    // console.log(this.data.absenceshow)
    // console.log(this.data.lateNum)

    //将已到学生加入已到学生列表
    const arrivallist = this.data.arrivallist
    arrivallist.push(this.data.namelist[index])// todo:发送长连接数据

    console.log(this.data.absencelist)
    console.log(this.data.absencelist[index].id)
    wx.sendSocketMessage({
      data: this.data.absencelist[index].id+',2',
      success:(res)=>{
        console.log(res)
      }
    })
    //保存缺课学生的信息
    const absencelisttemp = this.data.absencelist_t
    absencelisttemp.splice(index,1,0)
    const trueabsence = []
    absencelisttemp.forEach(n=>{
      if(n!=0){
        trueabsence.push(n)
      }
    })
    // console.log(trueabsence)
    this.setData({absencelist_t:absencelisttemp, trueabsence})
    // console.log(this.data.absencelist_t)
    this.setData({absencenum_1:this.data.absencenum_1-1})
    wx.onSocketMessage((result) => {
      var temp = JSON.parse(result.data)
      console.log(result)
      console.log(temp)
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
      wx.closeSocket({
        
      })
    })
  },
  //到课点击事件
  bearrival(e){
    const {index} = e.currentTarget.dataset
    console.log(index)
    // 已经被处理
    const absenceshowtemp = this.data.absenceshow
    absenceshowtemp[index] = false
    this.setData({absenceshow:absenceshowtemp})

    //将已到学生加入已到学生列表
    const arrivallist = this.data.arrivallist
    arrivallist.push(this.data.namelist[index]) // todo:发送长连接数据
    console.log(this.data.absencelist[index].id)
    wx.sendSocketMessage({
      data: this.data.absencelist[index].id+',0',
      success:(res)=>{
        console.log(res)
      }
    })
    console.log(this.data.absencelist)

    const absencelisttemp = this.data.absencelist_t
    absencelisttemp.splice(index,1,0)
    const trueabsence = []
    absencelisttemp.forEach(n=>{
      if(n!=0){
        trueabsence.push(n)
      }
    })
    this.setData({absencelist_t:absencelisttemp})
    // console.log(this.data.absencelist_t)

    this.setData({absencenum_1:this.data.absencenum_1-1})
    wx.onSocketMessage((result) => {
      var temp = JSON.parse(result.data)
      console.log(result)
      console.log(temp)
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
      wx.closeSocket({
        
      })
    })
  },
  //请假点击事件
  beleave(e){
    const {index} = e.currentTarget.dataset
    console.log(index)
    // this.setData({absenceNum:this.data.absenceNum+1})
    // 已经被处理
    const absenceshowtemp = this.data.absenceshow
    absenceshowtemp[index] = false
    this.setData({absenceshow:absenceshowtemp})

    console.log(this.data.absencelist[index].id)
    wx.sendSocketMessage({
      data: this.data.absencelist[index].id+',1',
      success:(res)=>{
        console.log(res)
      }
    })
    const absencelisttemp = this.data.absencelist_t
    absencelisttemp.splice(index,1,0)
    this.setData({absencelist_t:absencelisttemp})
    this.setData({absencenum_1:this.data.absencenum_1-1})
    wx.onSocketMessage((result) => {
      var temp = JSON.parse(result.data)
      console.log(result)
      console.log(temp)
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
      wx.closeSocket({
        
      })
    })
  },
  //缺课点击事件
  beabsence(e){
    const {index} = e.currentTarget.dataset
    const absenceshowtemp = this.data.absenceshow
    absenceshowtemp[index] = false
    this.setData({absenceshow:absenceshowtemp})
    console.log(this.data.absencelist[index].id)
    wx.sendSocketMessage({
      data: this.data.absencelist[index].id+',3',
      success:(res)=>{
        console.log(res)
      }
    })
    const absencelisttemp = this.data.absencelist_t
    absencelisttemp.splice(index,1,0)
    this.setData({absencelist_t:absencelisttemp})
    this.setData({absencenum_1:this.data.absencenum_1-1})
    wx.onSocketMessage((result) => {
      var temp = JSON.parse(result.data)
      console.log(result)
      console.log(temp)
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
        wx.closeSocket({
        
        })
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
    console.log("取消s")
    this.setData({ exportdatashow: false });
  },
})