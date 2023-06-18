// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phoneNumberInput : '',
        passwordInput:''
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

    onPhoneNumberInput:function(e){
        this.setData({
            phoneNumberInput:e.detail.value
        })
    },

    onPasswordInput:function(e){
        this.setData({
            passwordInput:e.detail.value
        })
    },

    onConfirm:function() {
        if (this.UserInfoVerify()) {
            wx.navigateTo({
                url:'../mainInfo/mainInfo'
            });
        }
    },

    //用户手机号与密码验证主逻辑
    UserInfoVerify(){
        return true;
    }


})