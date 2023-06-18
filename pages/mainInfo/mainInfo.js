// pages/mainInfo/mainInfo.js
const None = -1;
const BloodPressureBall = 0;
const HeartRateBall = 1;
const TemperatureBall = 2;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        CTX: Object,
        value:0,

        WindowHeight: 0,
        WindowWidth: 0,
        PixelRatio: 0,

        Radius: 0,

        CenterX: 0,
        CenterY: 0,
        map_icon_size: 0,
        map_icon_X: 0,
        map_icon_Y: 0,

        diseaseType: 'EMPTY',

        Score: 0,
        _score: 0,

        R: 0,
        G: 0,
        B: 0,

        Info_Circle_Radius: 0,
        Ball_size: 0,
        //================HEARTRATE================
        Ball_X_HeartRate: 0,
        Ball_Y_HeartRate: 0,
        // Ball_Color_HeartRate:'',

        //==============BLOODPRESSURE==============
        Ball_X_BloodPressure: 0,
        Ball_Y_BloodPressure: 0,
        // Ball_Color_BloodPressure:'',

        //===============TEMPERATURE===============
        Ball_X_Temperature: 0,
        Ball_Y_Temperature: 0,
        // Ball_Color_Temperature:'',

        //=================SIGNAL==================
        Signal_BloodPressureBall: false,
        Current_BloodPressureBall_Radius: 0,
        Signal_HeartRateBall: false,
        Current_HeartRateBall_Radius: 0,
        Signal_TemperatureBall: false,
        Current_TemperatureBall_Radius: 0,

        Signal_Finish_Draw_Ball: true,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.stopPullDownRefresh()
        var info = wx.getSystemInfoSync();
        var _radius = info.windowHeight / 2 - info.windowHeight / 6;
        this.setData({
            map_icon_size: Math.ceil(info.windowWidth / 1.7)
        });
        this.setData({
            WindowHeight: info.windowHeight,
            WindowWidth: info.windowWidth,
            PixelRatio: info.pixelRatio,
            map_icon_X: Math.ceil((info.windowWidth - this.data.map_icon_size) / 2),
            map_icon_Y: Math.ceil(info.windowHeight / 2 - this.data.map_icon_size),
            Radius: _radius,
            Info_Circle_Radius: info.windowWidth / 2,
        });
    },
    loadingSvg(){
        const query = wx.createSelectorQuery()
        query.select('#MainCanvas')
            .fields({
                node: true,
                size: true
            })
            .exec((res) => {
                const canvas = res[0].node
                const ctx = canvas.getContext('2d')
                const dpr = this.data.PixelRatio;
                canvas.width = res[0].width * dpr;
                canvas.height = res[0].height * dpr;

                ctx.scale(dpr, dpr);

                this.setData({
                    CTX: ctx
                });
                this.setData({
                    _score: 0
                });

                const renderLoop = () => {
                    console.log(this.data.Score,'22321321')
                    this.DrawMainArea(ctx);
                    if (this.data._score < this.data.Score) {
                        this.data._score++;
                        this.setData({
                            R: 159 + (100 - this.data._score),
                            G: 14 + (this.data._score) * 2,
                            B: -5 + this.data._score
                        });
                        setTimeout(() => {
                            canvas.requestAnimationFrame(renderLoop);
                        }, this.GetFunctionCurveValue(this.data._score));
                    }
                }
                canvas.requestAnimationFrame(renderLoop);

                // this.DrawMainArea(ctx);
            });
    },

    GetFunctionCurveValue(value) {
        if (value == -60)
            return 0;
        let ret = 100 - 6000 / (value + 60);
        return (ret > 0 ? ret : 0) / 2;
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
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
                console.log(res.data.synthesis,'222222')
                that.setData({
                    Score:Math.abs(res.data.synthesis)
                });
                that.loadingSvg()
            },
        });
        
    },

    // 处理触摸事件

    handleTouchStart: function (e) {
        console.log(e,'eeee')
        const touchX = e.touches[0].x
        const touchY = e.touches[0].y
        if (touchX < 110 && touchY < 600) {
            console.log(111)
            wx.navigateTo({
                url: '/pages/bloodpressure/bloodpressure',
            })
        }
        console.log(touchY,'touchY')
        console.log
        if ((touchX <230) && (touchY > 300 )) {
            console.log(222)
            wx.navigateTo({
                url: '/pages/heartrate/heartrate',
            })
        }
        if (touchX > 270 && touchY < 600) {
            console.log(333)
            wx.navigateTo({
                url: '/pages/bodytemperature/bodytemperature',
            })
        }
    },
    handleTouchEnd: function (e) {
        console.log('touch end:', e)
    },

    DrawMainArea(ctx, isBallPress = false, Type = None) {
        // ctx.clearRect(0,0,this.data.WindowWidth,this.data.WindowHeight);

        const centerX = this.data.WindowWidth / 2;
        const centerY = this.data.WindowHeight / 2;
        const windowHeight = this.data.WindowHeight;
        const windowWidth = this.data.WindowWidth;

        const R = this.data.Radius + windowHeight / 4;

        ctx.beginPath();
        ctx.arc(centerX, centerY + windowHeight / 4, R, 1 * Math.PI, 2 * Math.PI);
        ctx.lineTo(windowWidth, centerY);
        ctx.lineTo(windowWidth, 0);
        ctx.lineTo(0, 0);
        ctx.lineTo(0, centerY);
        ctx.lineTo(centerX - R, centerY);
        ctx.fillStyle = 'rgb(' + this.data.R + ',' + this.data.G + ',' + this.data.B + ')';
        ctx.fill();
        ctx.closePath();

        ctx.fillStyle = 'white';
        ctx.font = "normal 80px 'SourceHanSerifCN'";
        var scoreStr = this.data._score.toString();
        ctx.fillText(scoreStr, centerX - (scoreStr.length / 2) * 40 - 15, centerY / 4 + 10);

        const FullCircle = 2 * Math.PI;
        const ball_size = this.data.map_icon_size * 0.17;
        this.setData({
            Ball_size: ball_size
        });
        //================HEARTRATE================
        const ball_X_HeartRate = centerX;
        const ball_Y_HeartRate = Math.ceil(windowHeight * (17 / 24));
        const ball_Color_HeartRate = '#e5a744';
        this.setData({
            Ball_X_HeartRate: ball_X_HeartRate,
            Ball_Y_HeartRate: ball_Y_HeartRate
        });
        //==============BLOODPRESSURE==============
        const ball_X_BloodPressure = windowWidth * (1 / 6);
        const ball_Y_BloodPressure = windowHeight * (2 / 3);
        const ball_Color_BloodPressure = '#d26f52';
        this.setData({
            Ball_X_BloodPressure: ball_X_BloodPressure,
            Ball_Y_BloodPressure: ball_Y_BloodPressure
        });
        //===============TEMPERATURE===============
        const ball_X_Temperature = windowWidth * (5 / 6);

        const ball_Y_Temperature = windowHeight * (2 / 3);
        const ball_Color_Temperature = '#9fd65f';
        this.setData({
            Ball_X_Temperature: ball_X_Temperature,
            Ball_Y_Temperature: ball_Y_Temperature
        });

        ctx.beginPath();
        ctx.arc(ball_X_HeartRate, ball_Y_HeartRate, ball_size, 0, FullCircle);
        ctx.fillStyle = ball_Color_HeartRate;
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(ball_X_BloodPressure, ball_Y_BloodPressure, ball_size, 0, FullCircle);
        ctx.fillStyle = ball_Color_BloodPressure;
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(ball_X_Temperature, ball_Y_Temperature, ball_size, 0, FullCircle);
        ctx.fillStyle = ball_Color_Temperature;
        ctx.fill();
        ctx.closePath();

        ctx.fillStyle = 'white';
        ctx.font = "normal 20px 'SourceHanSerifCN'";
        ctx.fillText('心率', ball_X_HeartRate - 20, ball_Y_HeartRate + 5);
        ctx.fillText('血压', ball_X_BloodPressure - 20, ball_Y_BloodPressure + 5);
        ctx.fillText('体温', ball_X_Temperature - 20, ball_Y_Temperature + 5);

        const EmptySpaceLength = 20;
        const diseaseType_Width = ball_size * 2;
        const diseaseType_Height = ball_size / 2;
        const diseaseType_Center_Y = windowHeight * (7 / 8);
        const diseaseType_Center_X = windowWidth / 2;

        ctx.beginPath();
        ctx.strokeStyle = '#818181';
        ctx.moveTo(diseaseType_Center_X - diseaseType_Width / 2, diseaseType_Center_Y - diseaseType_Height / 2);
        ctx.lineTo(diseaseType_Center_X + diseaseType_Width / 2, diseaseType_Center_Y - diseaseType_Height / 2);
        ctx.arc(diseaseType_Center_X + diseaseType_Width / 2, diseaseType_Center_Y, diseaseType_Height / 2, Math.PI * 1.5, Math.PI * 2.5);
        ctx.lineTo(diseaseType_Center_X - diseaseType_Width / 2, diseaseType_Center_Y + diseaseType_Height / 2);
        ctx.arc(diseaseType_Center_X - diseaseType_Width / 2, diseaseType_Center_Y, diseaseType_Height / 2, Math.PI * 2.5, Math.PI * 1.5);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();

        ctx.moveTo(windowWidth * (1 / 12), diseaseType_Center_Y);
        ctx.lineTo(((diseaseType_Center_X - diseaseType_Width / 2) - diseaseType_Height / 2 - 15), diseaseType_Center_Y);
        ctx.moveTo(((diseaseType_Center_X + diseaseType_Width / 2) + diseaseType_Height / 2 + 15), diseaseType_Center_Y);
        ctx.lineTo(windowWidth * (11 / 12), diseaseType_Center_Y);
        ctx.stroke();
        ctx.closePath();

        var str = this.data.diseaseType;
        ctx.fillStyle = 'black';
        ctx.font = "normal 14px 'SourceHanSerifCN'";
        ctx.fillText(str, diseaseType_Center_X - ((str.length / 2) * 6) - 8, diseaseType_Center_Y + 5);

        if (!isBallPress)
            return;
        else {
            switch (Type) {
                case BloodPressureBall: {
                    ctx.beginPath();
                    switch (this.data.Signal_BloodPressureBall) {
                        case true:
                            this.setData({
                                Current_BloodPressureBall_Radius: this.data.Current_BloodPressureBall_Radius + this.GetFunctionCurveValue(this.data.Info_Circle_Radius - this.data.Current_BloodPressureBall_Radius),
                            });
                            ctx.arc(this.data.Ball_X_BloodPressure, this.data.Ball_Y_BloodPressure, this.data.Current_BloodPressureBall_Radius, 0, FullCircle);
                            if (this.data.Current_BloodPressureBall_Radius >= this.data.Info_Circle_Radius)
                                this.setData({
                                    Signal_Finish_Draw_Ball: true
                                });
                            break;
                        case false:
                            let val = this.GetFunctionCurveValue(this.data.Current_BloodPressureBall_Radius);
                            this.setData({
                                Current_BloodPressureBall_Radius: this.data.Current_BloodPressureBall_Radius - val < 0 ? 0 : val,
                            });
                            ctx.arc(this.data.Ball_X_BloodPressure, this.data.Ball_Y_BloodPressure, this.data.Current_BloodPressureBall_Radius, 0, FullCircle);
                            if (this.data.Current_BloodPressureBall_Radius <= 0.01)
                                this.setData({
                                    Signal_Finish_Draw_Ball: true
                                });
                            break;
                    }
                    ctx.fillStyle = 'rgba(209, 156, 142, 0.5)';
                    ctx.fill();
                    ctx.closePath();
                }
                break;
            case HeartRateBall: {
                ctx.beginPath();
                switch (this.data.Signal_HeartRateBall) {
                    case true:
                        this.setData({
                            Current_HeartRateBall_Radius: this.data.Current_HeartRateBall_Radius + this.GetFunctionCurveValue(this.data.Info_Circle_Radius - this.data.Current_HeartRateBall_Radius),
                        });
                        ctx.arc(this.data.Ball_X_HeartRate, this.data.Ball_Y_HeartRate, this.data.Current_HeartRateBall_Radius, 0, FullCircle);
                        if (this.data.Current_HeartRateBall_Radius >= this.data.Info_Circle_Radius)
                            this.setData({
                                Signal_Finish_Draw_Ball: true
                            });
                        break;
                    case false:
                        let val = this.GetFunctionCurveValue(this.data.Current_HeartRateBall_Radius);
                        this.setData({
                            Current_HeartRateBall_Radius: this.data.Current_HeartRateBall_Radius - val < 0 ? 0 : val,
                        });
                        ctx.arc(this.data.Ball_X_HeartRate, this.data.Ball_Y_HeartRate, this.data.Current_HeartRateBall_Radius, 0, FullCircle);
                        if (this.data.Current_HeartRateBall_Radius <= 0.01)
                            this.setData({
                                Signal_Finish_Draw_Ball: true
                            });
                        break;
                }
                ctx.fillStyle = 'rgba(232, 206, 145, 0.5)';
                ctx.fill();
                ctx.closePath();
            }
            break;
            case TemperatureBall: {
                ctx.beginPath();
                switch (this.data.Signal_TemperatureBall) {
                    case true:
                        this.setData({
                            Current_TemperatureBall_Radius: this.data.Current_TemperatureBall_Radius + this.GetFunctionCurveValue(this.data.Info_Circle_Radius - this.data.Current_TemperatureBall_Radius),
                        });
                        ctx.arc(this.data.Ball_X_Temperature, this.data.Ball_Y_Temperature, this.data.Current_TemperatureBall_Radius, 0, FullCircle);
                        if (this.data.Current_TemperatureBall_Radius >= this.data.Info_Circle_Radius)
                            this.setData({
                                Signal_Finish_Draw_Ball: true
                            });
                        break;
                    case false:
                        let val = this.GetFunctionCurveValue(this.data.Current_TemperatureBall_Radius);
                        this.setData({
                            Current_TemperatureBall_Radius: this.data.Current_TemperatureBall_Radius - val < 0 ? 0 : val,
                        });
                        ctx.arc(this.data.Ball_X_Temperature, this.data.Ball_Y_Temperature, this.data.Current_TemperatureBall_Radius, 0, FullCircle);
                        if (this.data.Current_TemperatureBall_Radius <= 0.01)
                            this.setData({
                                Signal_Finish_Draw_Ball: true
                            });
                        break;
                }
                ctx.fillStyle = 'rgba(179, 208, 146, 0.5)';
                ctx.fill();
                ctx.closePath();
            }
            break;

            default:
                break;
            }
        }

    },

    Distance(x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    },
    ////////////////////事件////////////////////////
    OnLongTap(ev) {
        let pos = ev.touches[0];
        if (this.Distance(pos.x, pos.y, this.data.Ball_X_HeartRate, this.data.Ball_Y_HeartRate) < this.data.Ball_size) {
            this.OnHeartRateBall_Press(ev);
            return;
        }
        if (this.Distance(pos.x, pos.y, this.data.Ball_X_BloodPressure, this.data.Ball_Y_BloodPressure) < this.data.Ball_size) {
            this.OnBloodPressureBall_Press(ev);
            return;
        }
        if (this.Distance(pos.x, pos.y, this.data.Ball_X_Temperature, this.data.Ball_Y_Temperature) < this.data.Ball_size) {
            this.OnTemperatureBall_Press(ev);
            return;
        }
    },
    OnBloodPressureBall_Press(ev) {
        console.log("BloodPressure");
        if (!this.data.Signal_Finish_Draw_Ball)
            return;
        this.setData({
            Signal_BloodPressureBall: !this.data.Signal_BloodPressureBall,
            Signal_Finish_Draw_Ball: false,
            Signal_HeartRateBall: false,
            Signal_TemperatureBall: false,
            Current_HeartRateBall_Radius: 0,
            Current_TemperatureBall_Radius: 0
        });
        const query = wx.createSelectorQuery()
        query.select('#MainCanvas')
            .fields({
                node: true,
                size: true
            })
            .exec((res) => {
                const canvas = res[0].node
                let ctx = this.data.CTX;

                ctx.clearRect(0, 0, this.data.WindowWidth, this.data.WindowHeight);

                const BPrenderLoop = () => {
                    if (!this.data.Signal_Finish_Draw_Ball) {
                        this.DrawMainArea(ctx, true, BloodPressureBall);
                        setTimeout(() => {
                            canvas.requestAnimationFrame(BPrenderLoop);
                        }, 0);
                    }
                }
                canvas.requestAnimationFrame(BPrenderLoop);
            });
        wx.vibrateShort({
            type: 'medium'
        });
    },
    OnTemperatureBall_Press(ev) {
        console.log("Temperature");
        if (!this.data.Signal_Finish_Draw_Ball)
            return;
        this.setData({
            Signal_TemperatureBall: !this.data.Signal_TemperatureBall,
            Signal_Finish_Draw_Ball: false,
            Signal_Finish_Draw_Ball: false,
            Signal_HeartRateBall: false,
            Signal_BloodPressureBall: false,
            Current_HeartRateBall_Radius: 0,
            Current_BloodPressureBall_Radius: 0
        });
        const query = wx.createSelectorQuery()
        query.select('#MainCanvas')
            .fields({
                node: true,
                size: true
            })
            .exec((res) => {
                const canvas = res[0].node
                let ctx = this.data.CTX;

                ctx.clearRect(0, 0, this.data.WindowWidth, this.data.WindowHeight);

                const BPrenderLoop = () => {
                    if (!this.data.Signal_Finish_Draw_Ball) {
                        this.DrawMainArea(ctx, true, TemperatureBall);
                        setTimeout(() => {
                            canvas.requestAnimationFrame(BPrenderLoop);
                        }, 0);
                    }
                }
                canvas.requestAnimationFrame(BPrenderLoop);
            });
        wx.vibrateShort({
            type: 'medium'
        });

    },
    OnHeartRateBall_Press(ev) {
        console.log("HeartRate");
        if (!this.data.Signal_Finish_Draw_Ball)
            return;
        this.setData({
            Signal_HeartRateBall: !this.data.Signal_HeartRateBall,
            Signal_Finish_Draw_Ball: false,
            Signal_TemperatureBall: false,
            Signal_BloodPressureBall: false,
            Current_TemperatureBall_Radius: 0,
            Current_BloodPressureBall_Radius: 0
        });
        const query = wx.createSelectorQuery()
        query.select('#MainCanvas')
            .fields({
                node: true,
                size: true
            })
            .exec((res) => {
                const canvas = res[0].node
                let ctx = this.data.CTX;

                ctx.clearRect(0, 0, this.data.WindowWidth, this.data.WindowHeight);

                const BPrenderLoop = () => {
                    if (!this.data.Signal_Finish_Draw_Ball) {
                        this.DrawMainArea(ctx, true, HeartRateBall);
                        setTimeout(() => {
                            canvas.requestAnimationFrame(BPrenderLoop);
                        }, 0);
                    }
                }
                canvas.requestAnimationFrame(BPrenderLoop);
            });
        wx.vibrateShort({
            type: 'medium'
        });

    },
    OnMapIconBall_Press(ev) {

    },

    // Test(){
    //     this.data.CTX.clearRect(0,0,this.data.WindowWidth,this.data.WindowHeight);
    // },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
       
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
        wx.navigateTo({
            url: '../healthreport/healthreport'
        })
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

    }
})