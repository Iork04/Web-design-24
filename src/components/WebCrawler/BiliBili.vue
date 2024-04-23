<template>
    <div class="bilibili-box">
        <div class="video-box-main">
            <div v-for="index in 15" :key="index">
                <div v-if="index > Math.min(videoInfo.length, videoInfoImg.length)" class="video-box-loading">
                    <span>
                        <i class='bx bx-cloud-download bx-flashing'></i>
                    </span>
                    <h3>Loading</h3>
                </div>
                <div v-else class="video-box">
                    <a :href="videoInfo[index - 1].arcurl" target="_blank">
                        <img :src="'data:image/png;base64,' + videoInfoImg[index - 1]">
                    </a>
                    <a :href="videoInfo[index - 1].arcurl" target="_blank">
                        <h3 :title="videoInfo[index - 1].title">{{ videoInfo[index - 1].title }}</h3>
                    </a>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import axios from 'axios';
    export default {
        computed: {
            GetPlaceName() {
                return this.$store.state.curTextContent.placeName;
            }
        },
        data() {
            return {
                videoInfo: [],
                videoInfoImg: [],
            }
        },
        watch: {
            GetPlaceName(newValue, oldValue) {
                this.GetVedioList();
                this.getInfoImg();
            }
        },
        methods: {
            // 拉取视频列表
            async GetVedioList() {

                this.videoInfo = [];
                const placeName = this.GetPlaceName;
                const url = `http://${this.$store.state.serverAddress}/api/crawler/bili?keyword:${placeName}`
                try {
                    const response = await axios.get(url);
                    this.videoInfo = response.data;
                }
                catch (error) {
                    console.error(error);
                }
            },
            // 拉取图片
            async getInfoImg() {
                this.videoInfoImg = [];
                const placeName = this.GetPlaceName;
                const url = `http://${this.$store.state.serverAddress}/api/crawler/biliimg?keyword=${placeName}&index=`;
                for (let i = 0; i < 15; ++i) {
                    const response = await axios.get(url + i);
                    const imgBase64Str = response.data;
                    this.videoInfoImg[i] = imgBase64Str;
                }
            }

        },
    }
</script>

<style>

    .bilibili-box {
        padding: 0px 10px;
        position: relative;
        background-color: rgba(2, 2, 2, 0.603);
        padding: 1vw;

        .video-box-main {
            padding: 1vw;
            display: grid;
            grid-column-gap: 1vw;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
            grid-template-rows: 1fr 1fr 1fr;
            border-radius: 10px;
            background-color: rgba(255, 255, 255, 0.603);

            .video-box {
                height: 15vw;
                overflow: hidden;
                position: relative;

                >div {
                    display: none;
                }

                >a {
                    >img {
                        transition: 0.5s;
                        border-radius: 10px;
                        width: 100%;
                        height: 10vw;
                    }

                    >h3 {
                        font-size: 1.2vw;
                        transition: color 0.5s;
                        color: black;
                        transition: 0.3s;
                        width: 100%;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                        text-overflow: ellipsis;

                        &:hover {
                            color: rgb(102, 173, 173);
                        }
                    }
                }

            }

            /* 加载时的样式 */
            .video-box-loading {
                height: 15vw;
                overflow: hidden;
                position: relative;

                >span {
                    display: flex;
                    background: #e0e0e0;
                    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
                    border-radius: 10px;
                    width: 100%;
                    height: 10vw;

                    >i {
                        margin: auto;
                        font-size: 10vw;
                    }
                }

                >h3 {
                    user-select: none;
                    font-size: 1.5vw;
                    text-align: center;
                }
            }
        }
    }
</style>