<template>
    <div class="weather-box">
        <span class="weather-icon"><i class='bx bx-cloud'></i></span>
        <div class="weather-face-container">
            <!-- left -->
            <div class="weather-side">
                <div class="date-containner">
                    <h2 class="date-dayname">{{ weatherData[curDate].weekdayText }}</h2>
                    <span class="date-day">{{ weatherData[curDate].fxDate }}</span>
                    <span class="date-local"><i class='bx bxs-location-plus'></i>{{ GetPlaceName }}</span>
                </div>
                <div class="weather-conteiner">
                    <span><i :class="'qi-' + weatherData[curDate].icon"></i></span>
                    <div class="weather-temp">{{ GetTemp }}℃</div>
                    <div class="weather-desc">{{ weatherData[curDate].text }}</div>
                </div>
            </div>


            <!-- right -->
            <div class="info-side">
                <div class="today-info-containner">
                    <!-- 紫外线强度 -->
                    <div class="today-info">
                        <span class="title">紫外线强度</span>
                        <span class="value">{{ weatherData[curDate].uvIndex }}</span>
                    </div>
                    <!-- 湿度 -->
                    <div class="today-info">
                        <span class="title">湿度</span>
                        <span class="value">{{ weatherData[curDate].humidity }}%</span>
                    </div>
                    <!-- 风速 -->
                    <div class="today-info">
                        <span class="title">风速</span>
                        <span class="value">{{ weatherData[curDate].windSpeed }}米/秒</span>
                    </div>
                    <!-- 降水量 -->
                    <div class="today-info">
                        <span class="title">降水量</span>
                        <span class="value">{{ weatherData[curDate].precip }}mm</span>
                    </div>
                    <!-- 风向 -->
                    <div class="today-info">
                        <span class="title">风向</span>
                        <span class="value">{{ weatherData[curDate].windDir }}</span>
                    </div>
                    <!-- 能见度 -->
                    <div class="today-info">
                        <span class="title">能见度</span>
                        <span class="value">{{ weatherData[curDate].vis }}km</span>
                    </div>
                    <!-- 大气压 -->
                    <div class="today-info">
                        <span class="title">大气压</span>
                        <span class="value">{{ weatherData[curDate].pressure }}mmHg</span>
                    </div>
                </div>

                <div class="week-container">
                    <div class="week-list">
                        <div :class="{ 'current-date': curDate == 0 }" @click="curDate = 0">
                            <span><i :class="'qi-' + weatherData[0].icon"></i></span>
                            <span class="day-name">{{ weatherData[0].weekdayText }}</span>
                            <span class="day-temp">{{ weatherData[0].tempMin }} ~ {{ weatherData[0].tempMax }}℃</span>
                        </div>

                        <div :class="{ 'current-date': curDate == 1 }" @click="curDate = 1">
                            <span><i :class="'qi-' + weatherData[1].icon"></i></span>
                            <span class="day-name">{{ weatherData[1].weekdayText }}</span>
                            <span class="day-temp">{{ weatherData[1].tempMin }} ~ {{ weatherData[1].tempMax }}℃</span>
                        </div>

                        <div :class="{ 'current-date': curDate == 2 }" @click="curDate = 2">
                            <span><i :class="'qi-' + weatherData[2].icon"></i></span>
                            <span class="day-name">{{ weatherData[2].weekdayText }}</span>
                            <span class="day-temp">{{ weatherData[2].tempMin }} ~ {{ weatherData[2].tempMax }}℃</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import seedrandom from 'seedrandom';
    export default {
        computed: {
            GetPlaceName() {
                return this.$store.state.curTextContent.placeName;
            },
            GetTemp() {
                const rng = seedrandom(this.GetPlaceName);
                const randomNum = rng();
                const max = parseInt(this.weatherData[this.curDate].tempMax);
                const min = parseInt(this.weatherData[this.curDate].tempMin);
                const res = parseInt(randomNum * (max - min) + min);

                return res;
            }
        },
        watch: {
            GetPlaceName(newValue, oldValue) {
                this.GetWeatherData();
            }
        },
        data() {
            return {
                weatherKey: this.$store.state.key.weatherKey,
                weatherData: [{
                    fxDate: "none",
                    humidity: "none",
                    windSpeed: "none",
                    precip: "none",
                    pressure: "none",
                    windDir: "none",
                    uvIndex: "none",
                    vis: "none",
                    tempMin: "none",
                    tempMax: "none",
                    text: "none",
                    weekdayText: "none",
                }, {
                    fxDate: "none",
                    humidity: "none",
                    windSpeed: "none",
                    precip: "none",
                    pressure: "none",
                    windDir: "none",
                    uvIndex: "none",
                    vis: "none",
                    tempMin: "none",
                    tempMax: "none",
                    text: "none",
                    weekdayText: "none",
                }, {
                    fxDate: "none",
                    humidity: "none",
                    windSpeed: "none",
                    precip: "none",
                    pressure: "none",
                    windDir: "none",
                    uvIndex: "none",
                    vis: "none",
                    tempMin: "none",
                    tempMax: "none",
                    text: "none",
                    weekdayText: "none",
                },],
                curDate: 0,
            }
        },
        methods: {
            GetWeatherData() {
                const url = `https://devapi.qweather.com/v7/weather/3d?location=${this.$store.state.curTextContent.location}&key=${this.weatherKey}`
                axios.get(url).then(response => {
                    const currentDate = new Date();
                    const hour = currentDate.getHours();
                    const curData = response.data.daily;
                    const dayOfWeek = currentDate.getDay();
                    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


                    for (var i = 0; i < 3; ++i) {
                        this.weatherData[i].uvIndex = curData[i].uvIndex;
                        this.weatherData[i].humidity = curData[i].humidity;
                        this.weatherData[i].precip = curData[i].precip;
                        this.weatherData[i].vis = curData[i].vis;
                        this.weatherData[i].pressure = curData[i].pressure;
                        this.weatherData[i].tempMax = curData[i].tempMax;
                        this.weatherData[i].tempMin = curData[i].tempMin;
                        this.weatherData[i].fxDate = curData[i].fxDate;
                        this.weatherData[i].weekdayText = weekdays[dayOfWeek + i];
                    }

                    if (hour <= 20 || hour >= 6) {
                        for (var i = 0; i < 3; ++i) {
                            this.weatherData[i].icon = curData[i].iconDay;
                            this.weatherData[i].windSpeed = curData[i].windSpeedDay;
                            this.weatherData[i].windDir = curData[i].windDirDay;
                            this.weatherData[i].text = curData[i].textDay;
                        }
                    } else {
                        for (var i = 0; i < 3; ++i) {
                            this.weatherData[i].icon = curData[i].iconNight;
                            this.weatherData[i].windSpeed = curData[i].windSpeediconNight;
                            this.weatherData[i].windDir = curData[i].windDiriconNight;
                            this.weatherData[i].text = curData[i].textNight;
                        }
                    }

                    // console.log(curData);
                    // console.log(this.weatherData);
                }).catch(error => {
                    console.log(error)
                })
            }
        },
    }
</script>
<style>

    .weather-box {
        position: relative;
        display: flex;
        user-select: none;

        /* 图标 */
        .weather-icon {
            margin: auto;
            display: inline-flex;
            z-index: 10;

            >i {
                cursor: pointer;
                font-size: 80px;
                transition: 0.3s;
                color: aliceblue;

                &:hover {
                    transform: scale(1.2);
                }
            }
        }

        &:hover {
            .weather-face-container {
                visibility: visible;
                opacity: 1;
                top: -400px;
            }
        }


        .weather-face-container {
            transition: 0.3s ease-out;
            visibility: hidden;
            opacity: 0;
            z-index: 10;
            position: absolute;
            width: 600px;
            top: -450px;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 20px;
            overflow: hidden;

            .weather-side {
                box-shadow: 35px -10px rgb(0, 0, 0);
                padding: 20px;
                height: 400px;
                width: 40%;
                float: left;
                background-image: linear-gradient(to bottom right, #8ec6f5, #0b378a);
                color: azure;

                .date-containner {

                    .date-dayname {
                        font-weight: 700;
                    }

                    .date-day {
                        letter-spacing: 2px;
                    }

                    .date-local {
                        margin-top: 20px;
                        display: block;
                    }
                }

                .weather-conteiner {
                    margin-top: 60px;

                    >span {
                        >i {
                            font-size: 80px;
                        }
                    }

                    .weather-temp {
                        font-size: 50px;
                        font-weight: 700;
                    }

                    .weather-desc {
                        font-weight: 700;
                        font-size: 20px;
                        letter-spacing: 5px;
                        margin-left: 8px;
                    }
                }
            }

            .info-side {
                float: right;
                width: 60%;
                height: 400px;
                background-color: rgb(32, 33, 43);
                color: aliceblue;

                .today-info-containner {
                    padding: 5px;
                    margin: 20px 40px;
                    border-radius: 10px;
                    background-color: rgb(33, 34, 39);
                    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);

                    .today-info {
                        margin: 5px 2px;
                        overflow: hidden;

                        .title {
                            font-weight: 700;
                            float: left;
                        }

                        .value {
                            float: right;
                        }
                    }
                }

                .week-container {
                    margin: 20px 40px;
                    border-radius: 10px;
                    background-color: rgb(33, 34, 39);
                    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);


                    .week-list {

                        display: flex;
                        flex-wrap: nowrap;

                        >div {
                            cursor: pointer;

                            transition: 0.3s ease-out;
                            display: inline-block;
                            border-radius: 10px;
                            flex: 1;

                            >span {

                                >i {
                                    font-size: 30px;
                                }

                                gap: 20px;
                                text-align: center;
                                display: block;
                                margin-top: 15px;
                                margin-bottom: 15px;


                            }

                            &:hover {
                                transform: scale(1.05);
                            }
                        }

                        .current-date {
                            color: black;
                            background-color: aliceblue;
                        }
                    }
                }
            }


        }

    }
</style>