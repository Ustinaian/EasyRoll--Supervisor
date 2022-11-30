import Dialog from "@vant/weapp/dialog/dialog";

const app = getApp()
Page({
  data: {
    msg:[{
      time:'11:08',
      content:'督导人员tom删除了《软件工程》的课程信息',
      rejectors:'',
      image:"/images/head2.jpg",
      data:{
        operationId:123456789,
        operationLog:"督导人员tom删除了<<软件工程>>的课程信息",
        isRejected:0,
        rejectors:['庄洁洁']
      }
    },{
      time:'11:04',
      content:'督导人员tom同意了陈乔乔（100000001）的请假申请',
      rejectors:'',
      image:"/images/head3.jpg",
      data:{
        operationId:123456789,
        operationLog:"(1)重新上传了学生名单\n(2)将开始上课周次改为第2周",
        isRejected:0,
        rejectors:['庄洁洁']
      }
    },{
      time:'21:02',
      content:'学生胡彬彬(100000005)的请假申请',
      rejectors:'',
      image:"/images/head2.jpg",
      data:{
        operationId:123456789,
        operationLog:"督导人员tom删除了<<软件工程>>的课程信息",
        isRejected:0,
        rejectors:['庄洁洁']
      }
    },{
      time:'11:02',
      content:'督导人员tom同意了陈乔乔（100000001）的请假申请',
      rejectors:'',
      image:"/images/head3.jpg",
      data:{
        operationId:123456789,
        operationLog:"督导人员tom删除了<<软件工程>>的课程信息",
        isRejected:0,
        rejectors:['王涛涛']
      }
    },{
      time:'21:02',
      content:'学生胡彬彬(100000005)的请假申请',
      rejectors:'',
      image:"/images/head2.jpg",
      data:{
        operationId:123456789,
        operationLog:"督导人员tom删除了<<软件工程>>的课程信息",
        isRejected:0,
        rejectors:['庄洁洁']
      }
    },{
      time:'11:02',
      content:'督导人员tom同意了陈乔乔（100000001）的请假申请',
      rejectors:'',
      image:"/images/head3.jpg",
      data:{
        operationId:123456789,
        operationLog:"督导人员tom删除了<<软件工程>>的课程信息",
        isRejected:0,
        rejectors:['王涛涛']
      }
    }],
    flag:1
  },
  onClose(event) {
    const { position, instance } = event.detail;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        instance.close();
        Dialog.confirm({
          title:'确定删除吗？'
        })
          .then(() => {
            this.data.msg.splice(event.currentTarget.dataset.index, 1)
            this.setData({
              msg: this.data.msg
            })
          })
          .catch(()=>{
            Dialog.close();
          });
          break;
    }
  },
  onClick(e){
    // e.currentTarget.dataset.data是数组中的data对象
    const dataset = e.currentTarget.dataset
    const data = dataset.data
    console.log(e.currentTarget.dataset)
    Dialog.confirm({
      cancelButtonText:'拒绝',
      confirmButtonText:'同意',
      message:data.operationLog
    })
    // 消息处理点击同意方法
    .then(()=>{
      // 发送处理结果给后端
      this.Apply_handle(data.operationId,data.msgType,1)//假设1表示同意该请求
      // 在列表中删去此项
      this.data.msg.splice(dataset.index, 1)
      this.setData({
        msg: this.data.msg
      })
      // // 可选方案：直接再次调用申请列表接口获取消息列表
      // this.Apply();
      Dialog.close()
    })
    // 消息处理点击拒绝方法
    .catch(()=>{
      this.data.msg.splice(dataset.index, 1)
      this.setData({
        msg: this.data.msg
      })
      Dialog.close()
    })
  },
  onShow(){
    // this.Apply();
  },
  // 申请消息列表函数
  Apply(){
    wx.request({
      url: 'https://nicklorry.top:8090/supervisor/roll/message/getAll',
      header: {
        Authorization:app.token
      },
      method: "GET",
      success: (result) => {
        console.log(result)
        // this.setData({
        //   msg:result.data.data.messages
        // })
      }
    })
  },
  // 处理申诉消息函数
  Apply_handle(id,msgType,result){
    wx.request({
      url: 'https://nicklorry.top:8090/supervisor/roll/message/solve',
      data: {
        id:id,
        msgType:msgType,
        result:result
      },
      header: {
        Authorization:app.token
      },
      method: "POST",
      success: (result) => {

      }
    })
  }
});
