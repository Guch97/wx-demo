// pages/healthreport/healthreport.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        synthesis: 0,
        address: '浙江金华兰溪'
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
    onShow() {
        let that = this
        const token = wx.getStorageSync('token')
        const oldmanId = wx.getStorageSync('oldmanId')

        wx.request({
            url: 'https://38m89829d7.zicp.fun/ucenter/oldman/situation',
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
                    synthesis: Math.abs(res.data?.synthesis)
                });
                console.log(res.data, '综合报告')
            },
        });

        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                console.log(res, '222')
                var lat = res.latitude;
                var lng = res.longitude;
                wx.request({
                    url: 'https://apis.map.qq.com/ws/geocoder/v1/',
                    data: {
                        location: lat + ',' + lng,
                        key: 'YANBZ-WKARL-VQKPX-MXYZB-5VO6V-JYFFP',
                        get_poi: 1
                    },
                    success: function (res) {
                        var address = res.data.result.address;
                        that.setData({
                            address: address ? address :'浙江金华兰溪'
                        })
                    }
                })
            }
        })
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