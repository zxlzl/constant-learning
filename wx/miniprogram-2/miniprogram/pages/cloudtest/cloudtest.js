// miniprogram/pages/cloudtest/cloudtest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cover_url: '',
    title: ''

  },
  btnCallCloud1:function(){
    wx.scanCode({
      onlyFromCamera: true,
      success: (res)=>{
        console.log(res.result)
        // let isbn = res.result
        let isbn = 9787115275790
        this.getBookData(isbn)
      }
    })
  },
  getBookData: function(isbn){
    let that = this
    wx.cloud.callFunction({
      name: "getbook",
      data: {
        isbn: isbn
      },
      success: function (res) {
        let data = {
          title: res.result.res.title,
          cover_url: res.result.res.cover_url
        }
        that.setData(data)
      }
    })
  },
  btnCallCloud:function(){
    wx.getWeRunData({
      success: (res)=>{
        let cloudId = res.cloudID
        wx.cloud.callFunction({
          name: "getwerun",
          data: {
            werundata: wx.cloud.CloudID(cloudId)
          }
        })
      }
    })
    // wx.cloud.callFunction({
    //   name: "testsum",
    //   data: {
    //     a: 19,
    //     b: 29
    //   },
    //   success: function(res){
    //     console.log(res)
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})