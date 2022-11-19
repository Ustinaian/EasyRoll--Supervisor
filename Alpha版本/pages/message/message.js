import Toast from '@vant/weapp/toast/toast';

Page({
  data: {
    columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
  },

  onChange(event) {
    const { picker, value, index } = event.detail;
    Toast(`当前值：${value}, 当前索引：${index}`);
  },
});
