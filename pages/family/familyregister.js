// pages/family/familyregister.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id:'',
        identity:'',

        realName:'',
        idNo:'',

        name:'',
        idCard:'',
        age:'',
        medical_history:'',
    },
    onButtonClick(){
        console.log(this.data,'data')
        const token = wx.getStorageSync('token')
        const userId = wx.getStorageSync('userId')
        wx.request({
            url: `https://38m89829d7.zicp.fun/ucenter/user/update/${userId}`,
            method: 'POST',
            data:{
                realName:this.data.realName,
                idNo:this.data.idNo,
                identity:this.data.identity,
                oldmanInfo:{
                    name:this.data.name,
                    idCard:this.data.idCard,
                    age:this.data.age,
                    medical_history:this.data.medical_history,
                }
            },
            header: {
                'X-Token': token,
                'content-type': 'application/json'
            },
            success: function(res) {
                wx.showToast({
                    icon:'none',
                    title: res?.data.message,
                    duration: 2000
                });
            setTimeout(()=>{
                if(res.data.code===200){
                    wx.navigateTo({
                        url: '/pages/login/login'
                    })
                }
            },1000)
            },
          });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options,'options')
        this.setData({
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