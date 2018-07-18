// pages/search/search.js
var app= getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityname:'',
    potentialPlaces:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  bindKeyInput: function (e) {
    this.setData({
      cityname:e.detail.value
    })
    
  },

  bindButtonTap: function () {
    var that = this
    wx.request({
      url: 'http://localhost:8080' + '/place?city=' + that.data.cityname,
      success: function (res) {
        console.log(res)
        var places=[]
        if(res.data.length){
          for(var i=0;i<res.data.length;i++){
            if (res.data[i].level == "city" || res.data[i].level=="town"){
              //console.log(res.data[i])
              places.push(res.data[i])
            }
          }
        }
        

        console.log(places)
        that.setData({
          potentialPlaces: places
        })
        //app.globalData.city = res.data.name
        //app.globalData.cityId = res.data.id
     
        

      }
    })
  },

  chooseViewTap: function(e){
    //console.log(e)
    var id = e.currentTarget.dataset.id
    //console.log(this.data.potentialPlaces[id])
    app.globalData.city = this.data.potentialPlaces[id]
    app.globalData.cityname = app.globalData.city.name
    // var box = app.globalData.city.bounding_box
    // var bounds = box.south.toString()+','+box.west.toString()+','+box.north.toString()+','+box.east.toString()
    
    wx.request({
      url: 'http://localhost:8080' + '/media?id=' + app.globalData.city.id,
      success: function (res) {
        console.log(res)
        if (res.data.length>0){
          app.globalData.cityUrl = res.data[0].url

        }else{
          app.globalData.cityUrl = app.globalData.city.thumbnail_url
        }
        id = app.globalData.city.id
        wx.request({
          //url: 'http://localhost:8080'+ '/city?bounds=' +bounds,
          url: 'http://localhost:8080' + '/city?id=' + id+'&type=sightseeing',
          success: function (res) {
            console.log(res)
            app.globalData.sightseeings = res.data.places
            app.globalData.newplace=true
            wx.navigateBack({

            })
          }
        })

        
        
      }
    })
  }


})