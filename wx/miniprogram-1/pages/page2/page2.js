// pages/page2/page2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  btnScanCode: function(){
    wx.scanCode({
      onlyFromCamera: true,
      success: function(res){
        console.log(res)
      }
    })
  },
  btnGetLocation: function(){
    wx.getLocation({
      success: function (res) {
        console.log(res)
        // wx.openLocation({
        //   latitude: res.latitude,
        //   longitude: res.longitude,
        // })
        wx.chooseLocation({
          latitude: res.latitude,
          longitude: res.longitude,
          success: function (res) {
            console.log(res)
          },
        })
      },
    })
  },
  btnGetWeRunData: function(){
    wx.login({
      success:function(res){
        let code = res.code
        wx.getWeRunData({
          success: (res)=>{
            console.log(res)
          }
          // success: (res) => {
          //   wx.request({
          //     url: 'https://jnsii.com/kaikeba/mpwerun/decryptwerun.php',
          //     method: 'POST',
          //     data: {
          //       code: code,
          //       iv: res.iv,
          //       encrypteddata: res.encryptedData
          //     },
          //     success: function(res){
          //       console.log(res)
          //     }
          //   })
          // }
        })
      }
    })
    
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