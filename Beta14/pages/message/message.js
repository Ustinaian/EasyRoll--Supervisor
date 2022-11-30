Page({
  data: {
    show: false,
    actions: [
      {
        name: '选项',
      },
      {
        name: '选项',
      },
      {
        name: '选项',
        subname: '描述信息',
        openType: 'share',
      },
    ],
  },
  showinfo(){
    this.setData({ show: true });
  },
  onClose() {
    console.log(123)
    this.setData({ show: false });
  },

  onSelect(event) {
    console.log(event.detail);
  },
});