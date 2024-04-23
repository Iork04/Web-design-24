<template>
    <div class="tools-right-top-box">
        <!-- 一言api -->
        <div class="hitokoto">
            <div class="hitokoto-msg">{{ hitokoto.msg }}</div>
            <div class="hitokoto-from">by-{{ hitokoto.from }}</div>
            <i class='bx bx-refresh' @click="GetHitokoto"></i>
        </div>
        <!-- 时钟 -->
        <div class="time-box">
            <div class="date">{{ timeInfo.year }} 年 {{ timeInfo.month }} 月 {{ timeInfo.date }} 日 {{ timeInfo.weekdayText
                }}
            </div>
            <div class="time">{{ timeInfo.hours }}:{{ timeInfo.minutes }}:{{ timeInfo.seconds }}</div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        computed: {

        },
        data() {
            return {
                hitokoto: {
                    msg: "加载中......",
                    from: "一言",
                },
                timeInfo: {}
            }
        },
        methods: {
            GetHitokoto() {
                axios.get("https://v1.hitokoto.cn/").then(response => {
                    this.hitokoto.msg = response.data.hitokoto
                    this.hitokoto.from = response.data.from
                    // console.log(response.data)
                }).catch(error => {
                    this.hitokoto.msg = error
                    this.hitokoto.from = "一言"
                    console.log(error)
                })
            },
            async GetTime() {
                const currentDate = new Date();
                const year = currentDate.getFullYear();
                const month = currentDate.getMonth() + 1;
                const date = currentDate.getDate();
                const dayOfWeek = currentDate.getDay();
                var hours = currentDate.getHours().toString();
                var minutes = currentDate.getMinutes().toString();
                var seconds = currentDate.getSeconds().toString();
                const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                const weekdayText = weekdays[dayOfWeek];
                if (hours.length < 2)
                    hours = '0' + hours;
                if (minutes.length < 2)
                    minutes = '0' + minutes;
                if (seconds.length < 2)
                    seconds = '0' + seconds;
                this.timeInfo = {
                    year,
                    month,
                    date,
                    dayOfWeek,
                    hours,
                    minutes,
                    seconds,
                    weekdayText
                }
            }
        },
        mounted() {
            this.GetHitokoto();
            setInterval(this.GetTime, 1000);
        },
    }
</script>
<style>
    .tools-right-top-box {
        gap: 20px;
        display: grid;
        grid-auto-flow: column;
        position: absolute;
        top: 35%;
        left: 50%;


        .hitokoto {
            position: relative;
            border-radius: 15px;
            background-color: rgba(0, 0, 0, 0.582);
            width: 300px;
            height: 130px;
            padding: 30px 20px;

            .hitokoto-msg {
                font-family: "Caveat", cursive;
                color: aliceblue;
            }

            .hitokoto-from {
                font-family: "Caveat", cursive;
                margin-top: 10px;
                text-align: right;
                color: aliceblue;
            }

            >i {
                position: absolute;
                color: aliceblue;
                cursor: pointer;
                bottom: 10px;
                right: 10px;
                font-size: 20px;
                transition: 0.3s;

                &:hover {
                    transform: scale(1.1);
                }

            }
        }

        .time-box {
            pointer-events: none;
            position: relative;
            border-radius: 15px;
            background-color: rgba(0, 0, 0, 0.582);
            width: 300px;
            height: 130px;
            padding: 20px;

            .date {
                font-size: 15px;
                color: aliceblue;
                text-align: center;
            }

            .time {
                font-family: 'LEDFont';
                margin-top: 10px;
                font-size: 50px;
                color: aliceblue;
                text-align: center;
            }
        }
    }

</style>
