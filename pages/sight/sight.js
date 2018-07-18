// pages/sight/sight.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sight:'',
    image:'../../images/cover.jpg'

  },


  onShow: function () {
    var that =this
    this.setData({
      sight: app.globalData.sight,
    })
    console.log('sight', this.data.sight)
    wx.request({
      url: 'http://localhost:8080' + '/media?id=' + that.data.sight.id,
      success: function(res){
        console.log(res.data)
        if (res.data.length>0){
          that.setData({
            image: res.data[0].url
          })
        }
      }
    })
  
  },

  tapminimap:function(e){
    console.log('tap mini map:',e)
    wx.navigateTo({
      url: '../map/map',
    })
  }


 
})