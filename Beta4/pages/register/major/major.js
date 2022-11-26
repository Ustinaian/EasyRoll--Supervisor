Page({
  data: {
    arrays:[],
    value: '',
  },
  onLoad(){
    wx.request({
      url: 'https://nicklorry.top:8090/major/query',
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
  onChange(e) {
    this.setData({
      value: e.detail,
    });
    wx.request({
      url: 'https://nicklorry.top:8090/major/query',
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
  onSearch() {
    wx.request({
      url: 'https://nicklorry.top:8090/major/query',
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
      majorName:this.data.arrays[e.currentTarget.id]
    })
    wx.navigateBack({
      delta:1
    })
  },
});
