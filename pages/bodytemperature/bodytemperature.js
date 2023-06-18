/*
 * @Author: xs
 * @Date: 2023-06-06 17:47:34
 */
// pages/bodytemperature/bodytemperature.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow () {
        var app = getApp();
        let that = this
        const token = wx.getStorageSync('token')
        const oldmanId = wx.getStorageSync('oldmanId')

        wx.request({
            url: app.globalData.baseApi+'/ucenter/oldman/situation',
            method: 'GET',
            data: {
                oldmanId
            },
            header: {
                'X-Token': token,
                'content-type': 'application/json'
            },
            success: function (res) {
                that.setData({
                    value:res.data.temperature||0
                });
                console.log(res.data,'血压')
            },
        });
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})