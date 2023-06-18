// pages/medicalworkers/medicalworkers.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id:'',
        identity:'',

        unitName:'',
        idNo:'',
        realName:'',
    },
    onButtonClick(){
        console.log(this.data,'data')
        wx.request({
            url: `https://38m89829d7.zicp.fun/ucenter/user/update/${this.data.id}`,
            method: 'POST',
            data:{
                realName:this.data.realName,
                idNo:this.data.idNo,
                identity:this.data.identity,
                unitName:this.data.unitName
            },
            success: function(res) {
                wx.showToast({
                    icon:'none',
                    title: res?.data.message,
                    duration: 2000
                });
                if(res.code===200){
                    wx.navigateTo({
                        url: '/pages/login/login.js'
                    })
                }
            },
          });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            id:options.id,
            identity:options.identity
        })
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