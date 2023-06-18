// pages/medicalworkers/medicalworkers.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id:'',
        identity:'',
        token:'',
        userId:'',
        unitName:'',
        idNo:'',
        realName:'',
    },
    onButtonClick(){
        console.log(this.data.token,'token')

        wx.request({
            url: `https://38m89829d7.zicp.fun/ucenter/user/update/${this.data.userId}`,
            method: 'POST',
            data:{
                realName:this.data.realName,
                idNo:this.data.idNo,
                identity:this.data.identity,
                unitName:this.data.unitName
            },
            header: {
                'X-Token': this.data.token,
                'content-type': 'application/json'
            },
            success: function(res) {
                wx.showToast({
                    icon:'none',
                    title: res?.data.message,
                    duration: 2000
                });
                if(res.data.code===200){
                   setTimeout(()=>{
                    wx.navigateTo({
                        url: '/pages/login/login'
                    })
                   },1000)
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
        const token = wx.getStorageSync('token')
        const userId = wx.getStorageSync('userId')
        this.setData({
            token,
            userId
        })
        console.log(token,'token')
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