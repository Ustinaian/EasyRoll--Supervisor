Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    title: {            // 属性名
      type: String,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '标题'     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    // 弹窗内容
    content_leftText: {
      type: String,
      value: '内容'
    },
    content_money: {
      type: String,
      value: '内容'
    },
    content_rightText: {
      type: String,
      value: '内容'
    },
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
    }
  }
})