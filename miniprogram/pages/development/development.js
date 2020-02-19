// pages/development/development.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cursorSpacing: '30rpx',
    commentTextAreaShown: false,
    commentTextAreaPlaceHolder: '',
    comments: [
      {
        speakerName: '毛利小五郎',
        listenerName: '',
        message: '该吃午饭了',
      },
      {
        speakerName: '毛利小五郎',
        listenerName: '柯南',
        message: '该吃午饭了',
      }
    ],
    audient: '',
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
   * 评论按钮点击
   */
  bindCommentBtnTap(e) {
    this.setData({
      commentTextAreaShown: true,
      audient: '',
      commentTextAreaPlaceHolder: '评论'
    });
  },
  /**
   * 点击评论记录
   */
  bindCommentTap(e) {
    const { speakername } = e.currentTarget.dataset;
    this.setData({
      audient: speakername,
      commentTextAreaPlaceHolder: '回复 ' + speakername,
      commentTextAreaShown: true
    });
  },
  /**
   * 点击输入完成按钮
   */
  bindInputConfirm(e) {
    const { comments, audient } = this.data;
    const message = e.detail.value;
    if (message.trim()) {
      this.setData({
        comments: [
          ...comments,
          {
            speakerName: '我',
            listenerName: audient,
            message: e.detail.value
          }
        ],
        commentTextAreaShown: false
      });
    } else {
      this.setData({
        commentTextAreaShown: false
      });
    }
  }
})