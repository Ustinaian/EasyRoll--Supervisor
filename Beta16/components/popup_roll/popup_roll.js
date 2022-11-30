Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    title: {
      type: String,
      value: '标题'
    },
    // 弹窗内容
    name: {
      type: String,
      value: '内容'
    },
    classroom: {
        type: String,
        value: '内容'
    },
    teacher: {
        type: String,
        value: '内容'
    },
    time: {
        type: String,
        value: '内容'
    },
    week: {
        type: String,
        value: '内容'
    }
  },
  data: {
    flag: true,
  },
  methods: {
    //隐藏弹框
    hidePopup: function () {
      this.setData({
        flag: !this.data.flag
      })
    },
    //展示弹框
    showPopup () {
      this.setData({
        flag: !this.data.flag
      })
    },
    _close() {
      this.triggerEvent("close");
    },
    roll_btn:function(){
      var course = JSON.stringify(getApp().course);
      wx.navigateTo({
        url: '/pages/roll/choose-mode/choose-mode?course=' + course
      })
      this.hidePopup()
    }
  }
})