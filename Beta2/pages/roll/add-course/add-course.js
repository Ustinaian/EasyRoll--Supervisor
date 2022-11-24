import Toast from '@vant/weapp/toast/toast'

Page({
  data: {
    value: '',
    weeks: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
    show_startweek:false,
    show_endweek:false,
    startWeek:'',
    temp_startweek:'',
    endWeek:'',
    temp_endweek:''
  },
  showPopup_startweek() {
    this.setData({ show_startweek: true });
  },
  showPopup_endweek() {
    this.setData({ show_endweek: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  onChange_startWeek(event) {
    this.temp_startweek = event.detail.value
  },
  confirm_startWeek(){
    this.setData({
      startWeek:this.temp_startweek,
      show_startweek:false
    })
  },
  cancel_startWeek(){
    this.setData({
      show_startweek:false
    })
  },
  onChange_endWeek(event) {
    this.temp_endweek=event.detail.value
  },
  confirm_endWeek(){
    this.setData({
      endWeek:this.temp_endweek,
      show_endweek:false
    })
  },
  cancel_endWeek(){
    this.setData({
      show_endweek:false
    })
  }
});
