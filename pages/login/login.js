// pages/login/login.js
// import {login} from '../../request/index'
// const login =  require('../../request/index.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phoneNumberInput: '',
        passwordInput: ''
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

    onPhoneNumberInput: function (e) {
        this.setData({
            phoneNumberInput: e.detail.value
        })
    },

    onPasswordInput: function (e) {
        this.setData({
            passwordInput: e.detail.value
        })
    },

    onConfirm: function () {


        if (this.UserInfoVerify()) {
            
            wx.request({
                url: 'https://38m89829d7.zicp.fun/login',
                method: 'POST',
                data: {
                    passWord: this.data.passwordInput,
                    userName: this.data.phoneNumberInput
                },
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    wx.showToast({
                        icon:'none',
                        title: res?.data.message,
                        duration: 2000
                    });
                    if(res.data.code===200){
                        const {data} = res.data
                        wx.setStorage({key:'token',data:`Bearer ${res.data.data.token.token}`})
                        wx.setStorage({key:'oldmanId',data:data.user.user.oldmanId||'3'})
                        wx.setStorage({key:'userId',data:data.user.user.userId||'9'})
                        wx.setStorage({key:'userInfo',data:data.user.user})
                        setTimeout(()=>{
                            wx.navigateTo({
                                url: '../mainInfo/mainInfo'
                            });
                        },1000)
                    }
                },
            });
        } else {
            wx.showToast({
                title: '请输入信息',
                icon: 'error',
                duration: 2000
            });
        }
    },

    //用户手机号与密码验证主逻辑
    UserInfoVerify() {
        console.log(this.data.phoneNumberInput, this.data.passwordInput, '2222')
        if (this.data.phoneNumberInput && this.data.passwordInput) {
            return true
        } else {
            return false
        }
    }


})