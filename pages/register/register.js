// pages/login/login.js
// import weappQRcode from 'weapp-qrcode'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        verificationCodeUrl:'',
        phoneNumberInput: '',
        content: '',
        qrTxt: 'https://github.com/liuxdi/wx-qr',
        qrcodeUrl: null,
        mobile:'',
        passwordInput: '',
        VerificationCode:'',
        code:'',

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 动态生成二维码内容
        this.drawVerificationCode();
    },
    drawVerificationCode: function () {
        const ctx = wx.createCanvasContext('verification-code');
        const width = 100;
        const height = 30;
        const code = this.generateVerificationCode();

        // 绘制验证码背景色
        ctx.setFillStyle('#f2f2f2');
        ctx.fillRect(0, 0, width, height);

        // 绘制验证码文本
        ctx.setFontSize(20);
        ctx.setFillStyle('#333');
        ctx.setTextAlign('center');
        ctx.setTextBaseline('middle');
        ctx.fillText(code, width / 2, height / 2);
        // 绘制干扰线
        for (let i = 0; i < 4; i++) {
            ctx.setStrokeStyle(this.randomColor());
            ctx.beginPath();
            ctx.moveTo(this.randomNum(0, width), this.randomNum(0, height));
            ctx.lineTo(this.randomNum(0, width), this.randomNum(0, height));
            ctx.stroke();
        }

        // 绘制干扰点
        for (let i = 0; i < 20; i++) {
            ctx.setFillStyle(this.randomColor());
            ctx.beginPath();
            ctx.arc(this.randomNum(0, width), this.randomNum(0, height), 1, 0, 2 * Math.PI);
            ctx.fill();
        }

        // 将画布内容绘制成图片
        ctx.draw(false, () => {
            wx.canvasToTempFilePath({
                canvasId: 'verification-code',
                success: (res) => {
                    this.setData({
                        code,
                        verificationCodeUrl:res.tempFilePath
                    })
                    console.log(res.tempFilePath);
                }
            }, this);
        });
    },
    generateVerificationCode: function () {
        // 生成随机验证码
        // ...
        return Math.floor(Math.random() * 90000 + 10000);
    },
    randomNum: function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    },
    randomColor: function () {
        return '#' + Math.random().toString(16).substr(2, 6);
    },
    onButtonClick() {
        if (this.data.code === Number(this.data.VerificationCode)) {
            wx.request({
                url: 'https://38m89829d7.zicp.fun/ucenter/user/register',
                method: 'POST',
                data:{
                    mobile:this.data.mobile,
                    passWord:this.data.passwordInput,
                    realName:this.data.mobile,
                    userCode:this.data.mobile,
                },
                success: function(res) {
                    console.log(res,'res')
                    wx.setStorage({key:'userId',data:res.data.data.user?.userId||'1'})
                    wx.showToast({
                        icon:'none',
                        title: res.data.message||'操作成功',
                        duration: 2000
                    });
                    if(res.data.code===200){
                        wx.setStorage({key:'token',data:`Bearer ${res.data.data.token.token}`})

                        setTimeout(()=>{
                            wx.navigateTo({
                                url: '/pages/familyormedicalworkers/familyormedicalworks'
                            })
                        },1000)
                    }
                },
              });
        } else {
            wx.showToast({
                title: '验证码错误',
                icon: 'error',
                duration: 2000
            });
        }
    },

    onQrcodeLoad: function (e) {
        // 获取二维码图片宽度和高度
        const width = e.detail.width;
        const height = e.detail.height;
        console.log('qrcode size:', width, height);
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

    onPhoneNumberInput: function (e) {
        this.setData({
            phoneNumberInput: e.detail.value
        })
    },

    onPasswordInput: function (e) {
        this.setData({
            passwordInput: e.detail.value
        })
    }
})