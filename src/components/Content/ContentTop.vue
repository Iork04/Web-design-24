<template>
    <!-- 内容主体 -->
    <div class="content-main" :class="{ 'ontent-main-hide': isHide }">
        <!-- 侧边按钮 -->
        <span class="open-content" @click="CloseOpenContent" :class="{ 'open-content-hide': isHideButton }">
            <i class='bx bxs-chevron-right'></i>
        </span>
        <!-- 左边部分主体 -->
        <div class="content-box-left" :class="{ 'transparent': isTransparent }">
            <!-- 关闭按钮 -->
            <span @click="CloseOpenContent"><i class='bx bx-x-circle'></i></span>
            <div class="place-name-box-left">
                {{ TextContent.placeName.substring(0, Math.ceil(TextContent.placeName.length / 2)) }}
            </div>
            <div class="content-left-box-info">
                <span>
                    {{ TextContent.topContentLeftTitle }}
                </span>
                <br>{{ TextContent.topContentLeftInfo }}<br>
                <button>了解更多</button>
            </div>
        </div>
        <!-- 右边部分主体 -->
        <div class="content-box-right">
            <div class="place-name-box-right">
                {{ TextContent.placeName.substring(Math.ceil(TextContent.placeName.length / 2)) }}
            </div>
            <div class="place-type-box">{{ TextContent.placeType }}</div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        computed: {
            GetPage() {
                return this.$store.state.page;
            }
        },
        watch: {
            GetPage(newValue, oldValue) {
                // 重新设置请求参数
                const urlParams = new URLSearchParams(window.location.search);
                urlParams.set('number', this.$store.state.page);
                const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
                history.pushState({}, '', newUrl);

                // 重新请求数据
                this.fetchData();
            }
        },
        data() {
            return {
                TextContent: {
                    placeName: "",
                    placeType: "",
                    topContentLeftTitle: "",
                    topContentLeftInfo: "",
                },
                isHide: true,
                isHideButton: false,
                isTransparent: true,
            }
        },
        methods: {
            CloseOpenContent() {
                this.isHideButton = !this.isHideButton;
                this.$store.state.ContentClose = this.isHide;
                this.isHide = !this.isHide;
            },
            fetchData() {
                this.isHide = true;
                axios.get(`http://${this.$store.state.serverAddress}/resource/getContent?number=${this.$store.state.page}`).then(response => {
                    setTimeout(() => {
                        this.$store.state.curTextContent = response.data;
                        this.TextContent = response.data;
                        this.isTransparent = false;
                    }, 400);
                    setTimeout(() => {
                        this.isTransparent = true;
                        this.isHide = false;
                        this.isHideButton = false;
                    }, 500);
                }).catch(error => { console.error('Error fetching data:', error) });
                this.$store.state.ContentClose = this.isHide;
            }

        },
        mounted() {
            this.fetchData();
        },
    }
</script>

<style>

    /* 内容主体 */
    .content-main {
        width: 100%;
        height: 100vh;
        display: flex;
        overflow: hidden;

        /* 侧边按钮 */
        .open-content {
            transition: 0.5s ease-in-out;
            z-index: 10;
            position: absolute;
            left: -70px;
            top: 50%;
            transform: translateY(-50%);
            background-color: #fff;
            border-radius: 50%;
            cursor: pointer;

            >i {
                transform: translateX(15%);
                font-size: 60px;
            }
        }

        /* 左侧字体透明遮罩 */
        .transparent {
            -webkit-mask: linear-gradient(#000 0 0),
                linear-gradient(#000 0 0);
            -webkit-mask-clip: text,
                padding-box;
            -webkit-mask-composite: xor;
        }

        /* 左边部分主体 */
        .content-box-left {
            transition: 0.5s ease-in-out;
            flex: 1;
            background-color: rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(20px);
            position: relative;
            display: flex;
            justify-content: flex-end;
            align-items: center;

            /* 关闭按钮 */
            >span {
                z-index: 11;
                position: absolute;
                right: 0vh;
                top: 1vh;


                >i {
                    cursor: pointer;
                    font-size: 40px;
                }

                &:nth-child(1) {
                    display: block;
                }

                &:nth-child(2) {
                    display: none;
                }

                &:hover {
                    transition: 0.1s;
                    transform: scale(1.1);
                }
            }

            .place-name-box-left {
                font-size: 200px;
                font-weight: 700;
                text-shadow: 2px 10px #000;
                color: #fff;
                pointer-events: none;
            }



            .content-left-box-info {

                font-size: 25px;
                position: absolute;
                bottom: 3vh;
                left: 3vh;
                color: #fff;
                padding-right: 3vh;
                font-family: "Caveat", cursive;

                >span {
                    text-decoration: underline;
                    font-size: 50px;
                    letter-spacing: 5px;
                    pointer-events: none;
                }

                >button {
                    cursor: pointer;
                    font-family: "Caveat", cursive;
                    margin-top: 1vh;
                    width: 250px;
                    height: 80px;
                    font-size: 50px;
                    border-radius: 20px;
                    border: 3px solid black;


                    &:hover {
                        transition: 0.3s;
                        color: #fff;
                        background: transparent;
                    }
                }
            }
        }

        /* 右边部分主体 */
        .content-box-right {
            transition: 0.5s ease-in-out;
            flex: 1;
            background-color: rgba(0, 0, 0, 0.1);
            position: relative;
            display: flex;
            justify-content: center;
            flex-direction: column;

            .place-name-box-right {
                font-size: 200px;
                font-weight: 700;
                color: #fff;
                text-shadow: 2px 10px rgba(133, 132, 132, 0.644);
                pointer-events: none;
            }

            .place-type-box {
                position: absolute;
                font-size: 60px;
                color: #fff;
                transform: translateY(170%);
                margin-left: 2vh;
                pointer-events: none;
            }

        }
    }

    .open-content-hide {
        left: -34px !important;
        visibility: visible !important;
    }

    .ontent-main-hide {
        visibility: hidden;


        .content-box-left {
            opacity: 0;
            transform: translateX(-100%);
        }

        .content-box-right {
            opacity: 0;
            transform: translateX(100%);
        }
    }
</style>