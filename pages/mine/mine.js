// pages/mine/mine.js
import moment from 'moment'
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
        const token = wx.getStorageSync('token')
        const oldmanId = wx.getStorageSync('oldmanId')

        wx.request({
            url: 'https://38m89829d7.zicp.fun/ucenter/oldman/callHistory',
            method: 'GET',
            data: {
                oldmanId
            },
            header: {
                'X-Token': token,
                'content-type': 'application/json'
            },
            success: function (res) {
                const list = res.data.map(item=>{
                    return{
                        ...item,
                        updatedTime:moment(item.updatedTime).format('YYYY-DD-MM')
                    }
                })
                that.setData({
                    callTime:list
                });
            },
        });
    },
    warningHistory(){
        let that = this
        const token = wx.getStorageSync('token')
        const oldmanId = wx.getStorageSync('oldmanId')

        wx.request({
            url: 'https://38m89829d7.zicp.fun/ucenter/oldman/warningHistory',
            method: 'GET',
            data: {
                oldmanId
            },
            header: {
                'X-Token': token,
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log(res,'2321321')
                const list = res.data.map(item=>{
                    return{
                        ...item,
                        updatedTime:moment(item.updatedTime).format('YYYY-DD-MM')
                    }
                })
                that.setData({
                    alertTime:list
                });
            },
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        let that = this
        const token = wx.getStorageSync('token')
        const oldmanId = wx.getStorageSync('oldmanId')
        const userId = wx.getStogetStoragerageSync('userId')
        wx.request({
            url: `https://38m89829d7.zicp.fun/ucenter/user/${userId}`,
            method: 'GET',
            header: {
                'X-Token': token,
                'content-type': 'application/json'
            },
            success: function (res) {
                const {data} = res.data
                console.log(data,'data')
                that.setData({
                    name:data.user.realName||'-',
                    age:data.user.age||0
                });
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