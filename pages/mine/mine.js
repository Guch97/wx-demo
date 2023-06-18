// pages/mine/mine.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name:'-',
        age:0,
        alertTime:[],
        callTime:[]
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
    callHistory(){
        let that = this
        wx.request({
            url: 'https://38m89829d7.zicp.fun/ucenter/oldman/callHistory',
            method: 'GET',
            data: {
                oldmanId:'1'
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                that.setData({
                    callTime:[]
                });
            },
        });
    },
    warningHistory(){
        let that = this
        wx.request({
            url: 'https://38m89829d7.zicp.fun/ucenter/oldman/warningHistory',
            method: 'GET',
            data: {
                oldmanId:'1'
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                that.setData({
                    alertTime:[]
                });
            },
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        let that = this
        wx.request({
            url: 'https://38m89829d7.zicp.fun//ucenter/oldman/situation',
            method: 'GET',
            data: {
                oldmanId:'1'
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                that.setData({
                    value:0
                });
                console.log(res.data,'血压')
            },
        });
        this.callHistory()
        this.warningHistory()
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