const { concat } = require('./colors')
var colors = require('./colors')
const app = getApp()

Page({
  data: {
		test:-1,
    week: ['一', '二', '三', '四', '五', '六','日'],
    nowDay:[1,2,3,4,5,6,7], // 本周的七天日期
    val:['单双周均上课','仅奇数单周上课','仅偶数双周上课'],
    colorArrays:['rgb(222,222,222)','rgb(157,191,153)','rgb(231,162,159)','rgb(113,177,217)'],//颜色数组
    wList: [    
        { "id":0,"isToday": 0, "period": 1, "classNumber": 2, "flag":0, "value":''},
        { "id":1,"isToday": 0, "period": 3, "classNumber": 2, "flag":0, "value":''},
        { "id":2,"isToday": 0, "period": 5, "classNumber": 2, "flag":0, "value":''},
        { "id":3,"isToday": 0, "period": 7, "classNumber": 2, "flag":0, "value":''},
        { "id":4,"isToday": 0, "period": 9, "classNumber": 3, "flag":0, "value":''},

        { "id":5,"isToday": 1, "period": 1, "classNumber": 2, "flag":0, "value":''},
        { "id":6,"isToday": 1, "period": 3, "classNumber": 2, "flag":0, "value":''},
        { "id":7,"isToday": 1, "period": 5, "classNumber": 2, "flag":0, "value":''},
        { "id":8,"isToday": 1, "period": 7, "classNumber": 2, "flag":0, "value":''},
        { "id":9,"isToday": 1, "period": 9, "classNumber": 3, "flag":0, "value":''},

        { "id":10,"isToday": 2, "period": 1, "classNumber": 2, "flag":0, "value":''},
        { "id":11,"isToday": 2, "period": 3, "classNumber": 2, "flag":0, "value":''},
        { "id":12,"isToday": 2, "period": 5, "classNumber": 2, "flag":0, "value":''},
        { "id":13,"isToday": 2, "period": 7, "classNumber": 2, "flag":0, "value":''},
        { "id":14,"isToday": 2, "period": 9, "classNumber": 3, "flag":0, "value":''},

        { "id":15,"isToday": 3, "period": 1, "classNumber": 2, "flag":0, "value":''},
        { "id":16,"isToday": 3, "period": 3, "classNumber": 2, "flag":0, "value":''},
        { "id":17,"isToday": 3, "period": 5, "classNumber": 2, "flag":0, "value":''},
        { "id":18,"isToday": 3, "period": 7, "classNumber": 2, "flag":0, "value":''},
        { "id":19,"isToday": 3, "period": 9, "classNumber": 3, "flag":0, "value":''},

        { "id":20,"isToday": 4, "period": 1, "classNumber": 2, "flag":0, "value":''},
        { "id":21,"isToday": 4, "period": 3, "classNumber": 2, "flag":0, "value":''},
        { "id":22,"isToday": 4, "period": 5, "classNumber": 2, "flag":0, "value":''},
        { "id":23,"isToday": 4, "period": 7, "classNumber": 2, "flag":0, "value":''},
        { "id":24,"isToday": 4, "period": 9, "classNumber": 3, "flag":0, "value":''},

        { "id":25,"isToday": 5, "period": 1, "classNumber": 2, "flag":0, "value":''},
        { "id":26,"isToday": 5, "period": 3, "classNumber": 2, "flag":0, "value":''},
        { "id":27,"isToday": 5, "period": 5, "classNumber": 2, "flag":0, "value":''},
        { "id":28,"isToday": 5, "period": 7, "classNumber": 2, "flag":0, "value":''},
        { "id":29,"isToday": 5, "period": 9, "classNumber": 3, "flag":0, "value":''},

        { "id":30,"isToday": 6, "period": 1, "classNumber": 2, "flag":0, "value":''},
        { "id":31,"isToday": 6, "period": 3, "classNumber": 2, "flag":0, "value":''},
        { "id":32,"isToday": 6, "period": 5, "classNumber": 2, "flag":0, "value":''},
        { "id":33,"isToday": 6, "period": 7, "classNumber": 2, "flag":0, "value":''},
        { "id":34,"isToday": 6, "period": 9, "classNumber": 3, "flag":0, "value":''},
	]},
	click(e){
    var index = e.currentTarget.dataset.index
    var temp = this.data.wList[index].flag
		this.setData({
      ['wList['+index+'].flag']:temp+1,
      ['wList['+index+'].value']:this.data.val[temp]
    })
    if(this.data.wList[index].flag>3){
      this.setData({
        ['wList['+index+'].flag']:0,
        ['wList['+index+'].value']:''
      })
    }
	},
  onLoad: function (options) {
    // this.setData({
    //   colorArrays: colors // 课表颜色
    // })
  },
  confirm(){
    var i = 0;//课程数组索引
    var pages = getCurrentPages(); // 获取页面栈
    var prevPage = pages[pages.length - 2]; // 上一个页面
    for (let index = 0; index < this.data.wList.length; index++) {
      const element = this.data.wList[index];
      if(element.flag==0){
        continue;
      }
      else{
        var temp = element.isToday+1;
        var temp2 = element.period;
        var temp3 = element.flag-1;
        prevPage.setData({
          ['courseArrangements['+i+']']:temp+' '+temp2+' '+temp3
        })
        i++;
      }
    }
    wx.navigateBack({
      delta: 1
    })
  }
})