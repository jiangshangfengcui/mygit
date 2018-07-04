//index.js
//获取应用实例
const app = getApp()

//  函数用来注册一个页面。接受一个 object 参数，其指定页面的初始数据、生命周期函数、事件处理函数等。
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    // 一个页面只会调用一次，可以在 onLoad 中获取打开当前页面所调用的 query 参数。
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
  onShow: function () {
    // 每次打开页面都会调用一次。
  },
  onReady: function () {
    // 一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。
    // 对界面的设置如wx.setNavigationBarTitle请在onReady之后设置。详见生命周期
  },
  onHide: function () {
    // 当navigateTo或底部tab切换时调用。
  },
  onUnload: function () {
    // 当redirectTo或navigateBack的时候调用。
  },
  // 页面相关事件处理函数
  onPullDownRefresh: function () {
    // 监听用户下拉刷新事件。
    // 需要在app.json的window选项中或页面配置中开启enablePullDownRefresh。
    // 当处理完数据刷新后，wx.stopPullDownRefresh可以停止当前页面的下拉刷新。
  },
  onReachBottom: function () {
    // 监听用户上拉触底事件。
    // 可以在app.json的window选项中或页面配置中设置触发距离onReachBottomDistance。
    // 在触发距离内滑动期间，本事件只会被触发一次。
  },
  onPageScroll: function (object) {// @param {Number} object.scrollTop 页面在垂直方向已滚动的距离（单位px）
    // 监听用户滑动页面事件。
    // 参数为 Object，包含以下字段：
  },
  onShareAppMessage: function () {
    // 只有定义了此事件处理函数，右上角菜单才会显示“转发”按钮
    // 用户点击转发按钮的时候会调用
    // 此事件需要 return 一个 Object，用于自定义转发内容
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  },
  // 事件处理函数
  customEvent: function () {
    // Page.prototype.route  route 字段可以获取到当前页面的路径。
    /**
     * Page.prototype.setData(data, callback)
     * @description 函数用于将数据从逻辑层发送到视图层（异步），同时改变对应的 this.data 的值（同步）。
     * @param {Object} data - 这次要改变的数据
     * @param {Function} callback - 在这次setData对界面渲染完毕后调用。
     * 注意：
     *      1、直接修改 this.data 而不调用 this.setData 是无法改变页面的状态的，还会造成数据不一致。
     *      2、仅支持设置可 JSON 化的数据。
     *      3、单次设置的数据不能超过1024kB，请尽量避免一次设置过多的数据。
     *      4、请不要把 data 中任何一项的 value 设为 undefined ，否则这一项将不被设置并可能遗留一些潜在问题。
     */
  }
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getCurrentPages: function () {
    /**
        初始化         新页面入栈
        打开新页面     新页面入栈
        页面重定向     当前页面出栈，新页面入栈
        页面返回       页面不断出栈，直到目标返回页
        Tab 切换       页面全部出栈，只留下新的 Tab 页面
        重加载         页面全部出栈，只留下新的页面

        getCurrentPages()
        @description 函数用于获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面。
        


        对于路由的触发方式以及页面生命周期函数如下：

          路由方式          触发时机                                                                                  路由前页面     路由后页面

          初始化       小程序打开的第一个页面                                                                                        onLoad, onShow

          打开新页面   调用 API wx.navigateTo 或使用组件 <navigator open-type="navigateTo"/>                          onHide          onLoad, onShow

          页面重定向 调用 API wx.redirectTo 或使用组件 <navigator open-type="redirectTo"/>                            onUnload        onLoad, onShow

          页面返回  调用 API wx.navigateBack 或使用组件<navigator open-type="navigateBack">或用户按左上角返回按钮     onUnload        onShow

          Tab 切换  调用 API wx.switchTab 或使用组件 <navigator open-type="switchTab"/> 或用户切换 Tab                                各种情况请参考下表

          重启动 调用 API wx.reLaunch 或使用组件 <navigator open-type="reLaunch"/>                                    onUnload        onLoad, onShow
  

        Tips:

        navigateTo, redirectTo 只能打开非 tabBar 页面。

        switchTab 只能打开 tabBar 页面。

        reLaunch 可以打开任意页面。

        页面底部的 tabBar 由页面决定，即只要是定义为 tabBar 的页面，底部都有 tabBar。
        
        调用页面路由带的参数可以在目标页面的onLoad中获取。

     */
  }
})
