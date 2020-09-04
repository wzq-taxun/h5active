new Vue({
    el: "#Vue",
    data: {
        heard: false,
        shifouxian: false,
        wardname: '',
        textbar: '',
        isward: {},
        isfoushow: true,
        hotel_group_id: 1,
        hotel_id: 0,
        serverUrl: 'https://www.xpms.cn/',
        // serverUrl: 'https://192.168.1.15:8080/',
        tel: '',
        show: false,
        showgetward: false,
        list: [
            {
                home_url: './assets/images/VIP五折券.png ',
                name: "一等奖"
            },
            {
                home_url: "./assets/images/定制杯子.png",
                name: "参与奖"
            },
            {
                home_url: "./assets/images/住房抵用券.png",
                name: "二等奖"
            },
            {
                home_url: "./assets/images/定制杯子.png",
                name: "参与奖"
            },
            {
                home_url: './assets/images/智会员.png',
                name: "三等奖"
            },
            {
                home_url: "./assets/images/定制杯子.png",
                name: "参与奖"
            },
            {
                home_url: './assets/images/雨伞.png',
                name: "四等奖"
            },
            {
                home_url: "./assets/images/定制杯子.png",
                name: "参与奖"
            },
            {
                home_url: '',
                name: "抽奖"
            },
        ],
        listall: [
            {
                title: '一.活动时间:',
                detail: '2020年9月6日正式营业'
            },
            {
                title: '二.参与流程:',
                detail: '开业期间,进店扫码关注公众号, 及客服管家号, 即可参与抽奖活动,奖品可当场换购。开业期间办理入住,另有神秘大礼相送。'
            },
            {
                title: '三.特别说明:',
                detail: '同一微信ID/身份证持有者, 限抽奖一次。'
            }

        ],
        // listall: [
        //     {
        //         name: "一等奖",
        //         title: '终身五折会员卡(1份)',
        //         detail: '名巢酒店品牌旗下酒店均可用, 门市价五折消费。'
        //     },
        //     {
        //         name: "二等奖",
        //         title: '一折住房抵用券(3份)',
        //         detail: '名巢酒店品牌旗下酒店均可用, 限二次消费使用。'
        //     },
        //     {
        //         name: "三等奖",
        //         title: '名巢智会员卡(10份)',
        //         detail: '名巢酒店品牌专属智会员卡1张(价值99元包含优惠券礼品)。'
        //     }
        //     // {
        //     //     name: "四等奖",
        //     //     title: '品牌定制雨伞(20份)',
        //     //     detail: '名巢酒店品牌定制雨伞1把。'
        //     // },
        //     // {
        //     //     name: "参与奖",
        //     //     title: '订制随手磨砂杯(100份)',
        //     //     detail: '名巢酒店品牌定制随手磨砂杯1个。'
        //     // },

        // ],
        status: true,//是否开始抽奖
        select: null,//页面对应抽奖下标
        times: 0, // 奖品位置 0 - 7
        time: 0,//当前的旋转次数
        speed: 50,//转盘速度
        myVar: "",
        prize: "", //奖品名称
        num: 0,
        turns: 5,//圈数
        dingshi: '',// 定时器
        // 第一次进入页面 判断 是否要提交手机号
        issendma: true
    },
    created() {
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 6.4 + 'px'
    },
    mounted() {
        // this.onClose()
        // this.textbar = '请输入手机号,参与抽奖活动！！！'
    },
    beforeDestroy() {
        clearInterval(this.myVar);
    },
    watch: {
        prize(val, oldVal) {
            if (val !== '') return this.showgetward = true
        }
    },
    methods: {
        // 生成1-7之间的随机整奇数 
        getonemath() {
            let mathshu = Math.floor(Math.random() * (7 - 1 + 1) + 1);
            if (mathshu === 6) {
                mathshu = 1
            } else if (mathshu === 2) {
                mathshu = 3
            } else if (mathshu === 4) {
                mathshu = 7
            }
            return mathshu
        },
        getggo() {
            this.heard = true
            this.showgetward = false
        },
        getjianggo() {
            this.textbar = '温馨提示: 该手机号已参加过抽奖, 中奖结果如下, 请尽快前往附近名巢酒店,使用手机号领取使用。'
            this.show = true
        },
        checkPhone() {
        },
        tijiaoshijian(e) {
            // 不能为空
            let star = this.tel.replace(/(^\s*)|(\s*$)/g, "");
            if (star === "" || star === undefined || star === null) {
                // 清空输入框的值
                this.tel = ''
                vant.Toast("请输入手机号")
                return;
            }
            // 手机号正则
            let phone = this.tel;
            if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))) {
                this.tel = ''
                vant.Toast("请输入合法手机号")
                return;
            }
            // console.log(this.tel)
            // 发起请求
            axios.get(`${this.serverUrl}/mini/luckDraw/prizeRecords/${this.hotel_group_id}/${this.hotel_id}/${this.tel}`)
                .then(res => {
                    // console.log(res)
                    if (res.data && res.data.code === '00000') {
                        if (res.data.data.length !== 0) {
                            this.textbar = '温馨提示: 该手机号已参加过抽奖, 中奖结果如下, 请尽快前往附近名巢酒店,使用手机号领取使用。'
                            this.isfoushow = false
                            this.isward = res.data.data[0]
                            this.shifouxian = true
                            this.heard = true
                            return vant.Toast(res.data.message || "你已抽过奖")
                        } else {
                            this.heard = false
                            vant.Toast("点击立即抽奖")
                            this.show = false;
                            this.textbar = '温馨提示: 请点击立即抽奖, 进行抽奖活动, 一个手机号仅限一次。'
                        }
                    }
                })
                .catch(err => {
                    console.error(err);
                })
        },
        onClose() {
            this.show = true;
            this.tel = ''
        },
        start(e) {
            if (e == 8) {
                this.time = this.time + 1
                this.select = this.select + 1
                if (this.select == 8 && this.num != (this.turns - 1)) {
                    this.select = 0
                    this.num = this.num + 1
                    this.time = 0
                }
                if (this.num == (this.turns - 1)) {
                    if (this.time == this.times) {
                        clearInterval(this.myVar);
                        this.status = true
                        this.time = 0
                        this.num = 0
                        this.prize = this.list[this.select].name
                    }
                }
            }
        },
        panduanselect(val) {
            // 控制中将的
            if (val === 3) {
                return this.times = 4
            } else if (val === 4) {
                return this.times = 6
            } else if (val === 1) {
                return this.times = 0
            } else if (val === 2) {
                return this.times = 2
            } else {
                return this.times = this.getonemath()
            }
        },
        sendward(e) {
            if (this.issendma) {
                // 弹出 手机提交弹框
                this.onClose()
                this.textbar = '请输入手机号,参与抽奖活动！！！'
                this.issendma = false
                return
            } else {
                // 当点击到抽奖时 发起亲求
                axios.post(`${this.serverUrl}/mini/luckDraw/luckDraw/${this.hotel_group_id}/${this.hotel_id}/${this.tel}`)
                    .then(res => {
                        // console.log(res)
                        if (res.data && res.data.code === '00000') {
                            if (res.data.data) {
                                this.isfoushow = false
                                this.isward = res.data.data
                                this.shifouxian = true
                                this.wardname = res.data.data.prize_name
                                this.panduanselect(res.data.data.prize_id)
                                if (this.status == true) {
                                    this.status = false
                                    this.myVar = setInterval(() => {
                                        this.start(e)
                                    }, this.speed)
                                } else {
                                    vant.Toast("抽奖进行中")
                                }
                                return
                            } else {
                                // return this.show = true
                                vant.Toast(res.data.message || "你抽奖次数用完")
                            }
                        }


                    })
                    .catch(err => {
                        console.error(err);
                    })
            }

        },
        luck(e) {
            // console.log(e)
            this.prize = ""
            if (e === 8) {
                this.sendward(e)
            } else {
                return
                vant.Toast("你点错了")
            }

        }
    }
})
