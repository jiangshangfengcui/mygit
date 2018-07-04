//app.js
/**
 * 文件作用域
 * 在 JavaScript 文件中声明的变量和函数只在该文件中有效；不同的文件中可以声明相同名字的变量和函数，不会互相影响。
 *
 */
/**
 * 模块化
   exports 是 module.exports 的一个引用，因此在模块里边随意更改 exports 的指向会造成未知的错误。所以更推荐开发者采用 module.exports 来暴露模块接口，除非你已经清晰知道这两者的关系。
   小程序目前不支持直接引入 node_modules , 开发者需要使用到 node_modules 时候建议拷贝出相关的代码到小程序的目录中。
   Tips
   1、tip: require 暂时不支持绝对路径
 */
App({
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
          }
        })
        // 获取用户信息
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  this.globalData.userInfo = res.userInfo

                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            }
          }
        })
    },
      // 通过全局函数 getApp() 可以获取全局的应用实例，如果需要全局的数据可以在 App() 中设置，如：
      // 在别的文件中调用getApp()方法获取应用实例，就能获取到定义的数据
    globalData: {
        userInfo: null
    },
    intruduceAPI: function () {
        // 微信原声API
        // 1、
        var requestTask =  wx.request({
            url: '/api.wx.qq.com', // 开发者服务器接口地址
            data: '',  // Object/String/ArrayBuffer 请求的参数 
            header: {
                'content-type': 'application/json' // 默认值
            },  // Object  设置请求的 header，header 中不能设置 Referer
            method: "POST", // （需大写）有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT   默认GET
            dataType: "json", //  如果设为json，会尝试对返回的数据做一次 JSON.parse
            responseType: "text", // 设置响应的数据类型。合法值：text、arraybuffer
            success: function (data, statusCode, header) {
                // 收到开发者服务成功返回的回调函数
                // data  开发者服务器返回的数据
                // statusCode 开发者服务器返回的 HTTP 状态码
                // header 开发者服务器返回的 HTTP Response Header
                /**
                    data 数据说明：

                    最终发送给服务器的数据是 String 类型，如果传入的 data 不是 String 类型，会被转换成 String 。转换规则如下：

                    对于 GET 方法的数据，会将数据转换成 query string（encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...）
                    对于 POST 方法且 header['content-type'] 为 application/json 的数据，会对数据进行 JSON 序列化
                    对于 POST 方法且 header['content-type'] 为 application/x-www-form-urlencoded 的数据，会将数据转换成 query string （encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...）
          
                */
            },
            fail: function () {
                // 接口调用失败的回调函数  
            },
            complete: function () {
                // 接口调用结束的回调函数（调用成功、失败都会执行）
            }
        })
        // 返回一个 requestTask 对象，通过 requestTask，可中断请求任务。abort     中断请求任务
        requestTask.abort(); // // 取消请求任务

        // 2、
        wx.uploadFile({
            // 客户端发起一个 HTTPS POST 请求，其中 content-type 为 multipart/form-data
        })
        wx.chooseImage({
            success: function(res) {
                var tempFilePaths = res.tempFilePaths
                var uploadTask = wx.uploadFile({
                    url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
                    filePath: tempFilePaths[0], // 要上传文件资源的路径
                    name: 'file',        /// 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
                    formData:{      // HTTP 请求中其他额外的 form data
                      'user': 'test'
                    },
                    success: function(res, statusCode){
                      var data = res.data
                      //do something
                    }
                })

                uploadTask.onProgressUpdate((res) => {
                    console.log('上传进度', res.progress)
                    console.log('已经上传的数据长度', res.totalBytesSent)
                    console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
                })

                uploadTask.abort() // 取消上传任务
            }
        })

        // 3、
        // 客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径
        wx.downloadFile({
            url: 'https://example.com/audio/123', //仅为示例，并非真实的资源
            success: function(res, statusCode) {
                // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                if (res.statusCode === 200) {
                    wx.playVoice({
                      filePath: res.tempFilePath // 临时路径
                    })
                }
            }
        })

        // 注：文件的临时路径，在小程序本次启动期间可以正常使用，如需持久保存，需在主动调用 wx.saveFile，才能在小程序下次启动时访问得到。 注：请在 header 中指定合理的 Content-Type 字段，以保证客户端正确处理文件类型

        downloadTask.onProgressUpdate((res) => {
            console.log('下载进度', res.progress)
            console.log('已经下载的数据长度', res.totalBytesWritten)
            console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
        })

        downloadTask.abort() // 取消下载任务

        // 4、创建一个 WebSocket 连接
        wx.connectSocket({
            url: 'wss://example.qq.com',
            data:{
              x: '',
              y: ''
            },
            header:{ 
              'content-type': 'application/json'
            },
            protocols: ['protocol1'],
            method:"GET"
        })
        var socketMsgQueue = [];
        // 监听WebSocket连接打开事件。
        wx.onSocketOpen(function(res) {
            console.log('WebSocket连接已打开！');
            sendSocketMessage(socketMsgQueue[i])
        })
        // 监听WebSocket错误。
        wx.onSocketError(function(res){
          console.log('WebSocket连接打开失败，请检查！')
        })

        function sendSocketMessage(msg) {
            if (socketOpen) {
                wx.sendSocketMessage({
                    data:msg
                })
            } else {
                socketMsgQueue.push(msg)
            }
        }

        // 5. 

    },
})

/**
 微信原声API


 */