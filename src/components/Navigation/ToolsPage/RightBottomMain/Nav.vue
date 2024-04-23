<template>
    <div class="nav-box-main">
        <!-- 图标 -->
        <div class="nav-icon">
            <i class='bx bx-navigation'></i>
        </div>
        <!-- 导航 -->
        <div class="nav-box" id="nax-box">
            <!-- 报错提示 -->
            <div class="nav-box-error" :class="{ 'nav-box-error-show': showErrorMas }">{{ errorMsg }}</div>
            <!-- 路线规划 -->
            <div id="nav-box-panel"></div>
            <!-- 路线规划图标 -->
            <div class="nav-box-route">
                <i class='bx bx-trending-up' @click="selectedRouteType = 0"></i>
                <div class="nav-box-route-se">
                    <div class="nav-box-route-c">
                        <input type="radio" id="1" name="routeType" value="1" v-model="selectedRouteType" />
                        <label for="1">驾车</label>
                    </div>
                    <div class="nav-box-route-c">
                        <input type="radio" id="3" name="routeType" value="2" v-model="selectedRouteType" />
                        <label for="3">骑行</label>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                startLngLat: [0, 0],
                webKey: this.$store.state.key.mapWebKey,
                map: '',
                navList: [],
                marker: '',
                selectedRouteType: '',
                errorMsg: '',
                showErrorMas: false,
            }
        },
        computed: {
            GetPlaceName() {
                return this.$store.state.curTextContent.placeName;
            },
            endLngLat() {
                const res = [this.$store.state.curTextContent.lon, this.$store.state.curTextContent.lat]
                return res;
            }
        },
        watch: {
            GetPlaceName(newValue, oldValue) {
                this.selectedRouteType = 0;
                setTimeout(() => {
                    this.MapReset();
                }, 500)
            },
            selectedRouteType(newValue, oldValue) {
                this.RoutePlanning(parseInt(newValue));
            },
        },
        methods: {
            // 路径规划
            async RoutePlanning(i) {
                this.navList[0].clear();
                this.navList[1].clear();
                if (i === 0 || this.startLngLat.length === 0) {
                    if (i !== 0 && this.startLngLat.length === 0) {
                        this.errorMsg = "获取IP定位失败！"
                        this.showErrorMas = true;
                        setTimeout(() => {
                            this.showErrorMas = false;
                        }, 1000)
                        console.error('Error:', "获取IP定位失败");
                    }
                    return;
                }
                try {
                    this.navList[i - 1].search(this.startLngLat, this.endLngLat);
                } catch (error) {
                    this.errorMsg = "获取路线数据失败"
                    this.showErrorMas = true;
                    setTimeout(() => {
                        this.showErrorMas = false;
                    }, 1000)
                    console.error("获取路线数据失败：" + result);
                }
            },
            // 标记
            async Marker(LngLat) {
                try {
                    const position = new AMap.LngLat(LngLat[0], LngLat[1]);
                    let marker = new AMap.Marker({
                        position: position,
                    });
                    this.map.add(marker);
                }
                catch (error) {
                    console.error('Error:', error);
                }
            },
            // 路径规划初始化
            async NavInit() {
                try {
                    const panel = {
                        map: this.map,
                        panel: "nav-box-panel",
                    }
                    const Driving = new AMap.Driving(panel);
                    const Riding = new AMap.Riding(panel);
                    this.navList = [Driving, Riding];
                }
                catch (error) {
                    console.error('Error:', error);
                }
            },
            //加载控件
            async ControlInit() {
                try {
                    let scale = new AMap.Scale(),
                        toolBar = new AMap.ToolBar({
                            position: {
                                top: "10px",
                                left: "10px",
                            },
                        }),
                        controlBar = new AMap.ControlBar({
                            position: {
                                top: "10px",
                                right: "10px",
                            },
                        }),
                        mapType = new AMap.MapType({
                            position: {
                                bottom: "110px",
                                right: "10px",
                            },
                        })
                    this.map.addControl(mapType);
                    this.map.addControl(scale);
                    this.map.addControl(toolBar);
                    this.map.addControl(controlBar);
                }
                catch (error) {
                    console.error('Error:', error);
                }
            },
            // 地图实例初始化
            async MapInit() {
                try {
                    this.map = new AMap.Map("nax-box", {
                        zoom: 11,
                    });
                } catch (error) {
                    console.error('Error:', error);
                }
            },
            // 重新设置中心点
            async MapReset() {
                try {
                    this.map.setCenter(this.endLngLat, 1, 1);
                } catch (error) {
                    console.error('Error:', error);
                }
            },
            // 获取IP定位
            async GetPosition() {
                const url = `https://restapi.amap.com/v3/ip?key=${this.webKey}`;
                try {
                    let response = await axios.get(url);
                    response = response.data
                    const points = response.rectangle.split(';');
                    const point1 = points[0].split(',');
                    const point2 = points[1].split(',');
                    const lon1 = parseFloat(point1[0]);
                    const lat1 = parseFloat(point1[1]);
                    const lon2 = parseFloat(point2[0]);
                    const lat2 = parseFloat(point2[1]);
                    const midLon = (lon1 + lon2) / 2;
                    const midLat = (lat1 + lat2) / 2;
                    // 保存中点坐标
                    this.startLngLat = [midLon, midLat];
                    await this.Marker(this.startLngLat);
                    // console.log(this.startLngLat);
                } catch (error) {
                    this.startLngLat = [];
                    console.error('Error:', "获取IP定位失败");
                }
            }

        },
        async beforeCreate() {
            window._AMapSecurityConfig = {
                securityJsCode: this.$store.state.key.mapWebJsKey_a,
            };
            await AMapLoader.load({
                key: this.$store.state.key.mapWebJsKey,
                version: "2.0",
                plugins: ['AMap.Scale', 'AMap.ToolBar', 'AMap.ControlBar', 'AMap.MapType', 'AMap.Driving', 'AMap.Transfer', 'AMap.Walking', 'AMap.Riding'],
            });
            try {
                await this.MapInit();
                await this.ControlInit();
                await this.NavInit();
            } finally {
                await this.GetPosition();
            }
        }
    }
</script>
<style>
    .nav-box-main {
        position: relative;
        display: flex;

        .nav-icon {
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
            .nav-box {
                visibility: visible;
                opacity: 1;
                top: -500px;
            }
        }

        .nav-box {
            display: flex;
            transition: 0.3s ease-out;
            background-color: aliceblue;
            visibility: hidden;
            opacity: 0;
            z-index: 10;
            position: absolute;
            height: 500px;
            width: 800px;
            top: -550px;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 20px;
            overflow: hidden;

            .nav-box-route {
                position: absolute;
                left: 0px;
                top: 50%;
                user-select: none;
                z-index: 11;

                &:hover {
                    >i {

                        transform: scale(1.1);
                    }

                    .nav-box-route-se {
                        overflow: visible;
                        opacity: 1;
                    }
                }

                >i {
                    cursor: pointer;
                    transition: 0.3s;
                    font-size: 40px;
                }

                .nav-box-route-se {
                    overflow: hidden;
                    opacity: 0;
                    background-color: rgb(209, 226, 231);
                    transition: 0.3s;
                    display: grid;
                    grid-template-columns: auto;
                    grid-template-rows: auto auto auto auto;
                    position: absolute;
                    right: 0px;
                    top: 50%;
                    transform: translate(100%, -50%);
                    gap: 2px;
                    padding: 3px;
                    border-radius: 5px;

                    .nav-box-route-c {
                        transition: 0.3s;
                        width: 55px;
                        padding: 3px;
                        border-radius: 3px;

                        &:hover {
                            background-color: rgb(183, 210, 231);
                        }

                    }
                }
            }

            #nav-box-panel {
                z-index: 1;
                right: 0px;
                width: 150px;
                height: 100%;
                position: absolute;
                overflow: auto;
            }

            .nav-box-error {
                z-index: 10;
                overflow: visible;
                opacity: 0;
                margin: auto;
                background-color: antiquewhite;
                padding: 10px;
                border-radius: 10px;
                font-size: 20px;
                font-weight: 700;
                color: rgb(61, 63, 62);
                transition: 0.3s;
            }

            .nav-box-error-show {
                overflow: visible;
                opacity: 1;
            }
        }
    }
</style>