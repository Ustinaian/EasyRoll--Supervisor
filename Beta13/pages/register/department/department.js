Page({
  data: {
    arrays:[],
    value: '',
  },
  onLoad(){
    this.Apply();
  },
  onChange(e) {
    this.setData({
      value: e.detail,
    });
    this.Apply();
  },
  onSearch() {
    this.Apply();
  },
  Apply(){
    wx.request({
      url: 'https://nicklorry.top:8090/department/query',
      data: {
        keyword:this.data.value
      },
      method: "GET",
      success: (result) => {
        this.setData({
          arrays:result.data.data
        })
      }
    })
  },
  back(e){
    var pages = getCurrentPages(); // 获取页面栈
    var currPage = pages[pages.length - 1]; // 当前页面
    var prevPage = pages[pages.length - 2]; // 上一个页面
    prevPage.setData({
      departmentName:this.data.arrays[e.currentTarget.id]
    })
    wx.navigateBack({
      delta:1
    })
  },
});
