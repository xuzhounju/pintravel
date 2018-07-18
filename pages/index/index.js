//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    city:'',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    id:'',
    image:'../../images/cover.jpg',
    sightseeings:[],
    foods:[],
    shoppings:[]
  },
  //事件处理函数

  onLoad: function () {

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    
  },


  onShow:function(){
    var that=this
    console.log('show')
    var s =[]
    if (app.globalData.sightseeings.length>0){
      s = app.globalData.sightseeings.slice(0, 5)
      console.log('s:',s)
      wx.request({
        url: 'http://localhost:8080' + '/city?id='+app.globalData.city.id+'&type=eating',
        success: function(res){
          console.log('top food:',res.data)
          app.globalData.foods=res.data.places
          var f = app.globalData.foods.slice(0, 5)
          that.setData({
            foods: f
          })
        }
      })
      wx.request({
        url: 'http://localhost:8080' + '/city?id=' + app.globalData.city.id+'&type=shopping',
        success: function (res) {
          console.log('top shopping:', res.data)
          app.globalData.shoppings = res.data.places
          var shop = app.globalData.shoppings.slice(0,5)
          that.setData({
            shoppings: shop
          })
        }
      })
    }
    
    this.setData({
      city: app.globalData.cityname,
      image: app.globalData.cityUrl,
      sightseeings:s
    })
  },

  GoSearch:function(e){
    wx.navigateTo({
      url: '../search/search',
    })
  },


  chooseSightTap: function(e){
    console.log(e)
    var index = e.currentTarget.dataset.id
    app.globalData.sight=app.globalData.sightseeings[index]
    wx.navigateTo({
      url: '../sight/sight',
    })
  },

  chooseFoodTap: function(e) {
    console.log(e)
    var index = e.currentTarget.dataset.id
    app.globalData.sight = app.globalData.foods[index]
    wx.navigateTo({
      url: '../sight/sight',
    })
  },

  chooseShopTap: function (e) {
    console.log(e)
    var index = e.currentTarget.dataset.id
    app.globalData.sight = app.globalData.shoppings[index]
    wx.navigateTo({
      url: '../sight/sight',
    })
  },



  
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
