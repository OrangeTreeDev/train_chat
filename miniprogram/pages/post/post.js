// pages/post/post.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 文本输入框
    text: '',
    initialTextAreaLines: 3,
    textAreaHeight: '120rpx',
    // 图片选择
    imageCountLimit: 3,
    tempImagePaths: [],
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

  },
  /**
   * 消息输入框行数变化
   */
  bindlinechange(e) {
    const { lineHeight, lineCount } = e.detail;
    const { initialTextAreaLines } = this.data;
    const maxLineCount = 7;
    let actualLineCount = lineCount;
    // 行数最大7行，最小3行
    if (lineCount > maxLineCount) {
      actualLineCount = maxLineCount;
    } else if (lineCount <= 3) {
      actualLineCount = initialTextAreaLines;
    }
    this.setData({
      textAreaHeight: `${40 * actualLineCount}rpx`
    });
  },
  /**
   * 键盘输入
   */
  bindInput(e) {
    this.setData({
      text: e.detail.value,
    });
  },
  // 添加照片按钮点击
  bindAddBtnTap(e) {
    const { imageCountLimit, tempImagePaths } = this.data;
    const count = imageCountLimit - tempImagePaths.length;
    // 选择图片，最多三张
    wx.chooseImage({
      count,
      success: (res) => {
        this.setData({
          tempImagePaths: [...tempImagePaths, ...res.tempFilePaths],
        });
      },
    });
  },
  /**
   * 发布按钮点击
   */
  bindPostBtnTap(e) {
    const { tempImagePaths } = this.data;
    if (tempImagePaths.length > 0) {
      const uploadImageTasks = tempImagePaths.map(filePath => this.__uploadFile(filePath));
      Promise.all(uploadImageTasks).then(res => {
        const photoFileIds = res.map(item => item.fileID);
        this.__addDevelopment(photoFileIds);
      });
    } else {
      this.__addDevelopment(photoFileIds);
    }
  },
  /**
   * 调用云函数创建新的帖子
   */
  __addDevelopment(photoFileIds = []) {
    const { text } = this.data;
    wx.showLoading({
      title: '发布中',
    });
    wx.cloud
    .callFunction({
      name: 'add_development',
      data: {
        text,
        photoFileIds,
        trainNumber: 'G2020',
        departureTime: Date.now(),
        createAt: Date.now(),
        updateAt: Date.now()
      },
    })
    .then(() => {
      wx.hideLoading();
      wx.showToast({
        title: '发布成功'
      });
      wx.reLaunch({
        url: '../development/development'
      });
    })
    .catch(err => console.error(err));
  },
  /**
   * 上传文件到云存储
   */
  __uploadFile(tempFilePath) {
    const cloudPath = Date.now() + tempFilePath.match(/\.[^.]+?$/)[0];
    return wx.cloud.uploadFile({
      cloudPath,
      filePath: tempFilePath
    });
  },
})