// pages/map/map.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sight: '',
   
    markers: [],
  },


  onShow: function () {
    this.setData({
      sight: app.globalData.sight,
      markers: [{
        id: 1,
        latitude: app.globalData.sight.location.lat,
        longitude: app.globalData.sight.location.lng,
        name: app.globalData.sight.name
      }]

    })
    console.log(this.data.sight)
  },

 
})