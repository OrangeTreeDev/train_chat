// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasAuthUserinfoScope: false,
    number: '',
    departure: '',
    destination: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success: (res) => {
        let hasAuthUserinfoScope = false;
        if(res.authSetting['scope.userInfo']) {
          hasAuthUserinfoScope = true;
        }
        this.setData({
          hasAuthUserinfoScope
        });
      },
    });
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
   * 获取用户信息按钮点击
   */
  bindgetuserinfo(e) {
    // 用户授权获取用户信息
    if (e.detail.rawData) {
      wx.setStorage({
        key: 'userinfo',
        data: e.detail.rawData,
        success: () => {
          this.setData({
            hasAuthUserinfoScope: true
          }); 
        }
      });
    }
  },
  /**
   * 车次输入框失去焦点
   */
  bindNumberInputBlur(e) {
    this.setData({
      number: e.detail.value
    });
  },
  /**
   * 出发城市输入框失去焦点
   */
  bindDepartureInputBlur(e) {
    this.setData({
      departure: e.detail.value
    });
  },
  /**
   * 达到城市输入框失去焦点
   */
  bindDestinationInputBlur(e) {
    this.setData({
      destination: e.detail.value
    });
  },
  bindSearchBtnTap() {
    const { number, departure, destination } = this.data;
    // 检查参数
    wx.cloud.callFunction({
      name: 'get_train',
      data: {
        number,
        departure,
        destination
      }
    }).then(res => {
      console.log(res);
    });
  }
})