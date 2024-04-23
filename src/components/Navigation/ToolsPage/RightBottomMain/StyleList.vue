<template>
    <div class="style-list-main">
        <!-- 图标 -->
        <div class="style-icon"><i class='bx bx-palette'></i></div>
        <!-- 样式表主体 -->
        <div class="style-list-box">
            <!-- 样式表数据调节 -->
            <div class="style-data-date">
                <div>
                    <input title="调节粒子速度" type="range" v-model="this.$store.state.style.slidingSpeed" max="180"
                        min="20">
                </div>
                <div>
                    <input title="调节粒子数量" type="range" v-model="this.$store.state.style.slidingQuantity" max="180"
                        min="20">
                </div>
            </div>
            <!-- 样式选择 -->
            <div class="style-rain-box">
                <i class='bx bx-cloud-light-rain' :class="{ 'bx-tada': this.$store.state.style.number == 1 }"
                    @click="this.$store.state.style.number = this.$store.state.style.number == 1 ? 0 : 1"></i>
            </div>
            <div class="style-leaf-box">
                <i class='bx bxs-leaf'
                    @click="this.$store.state.style.number = this.$store.state.style.number == 2 ? 0 : 2"></i>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
            }
        }
    }
</script>
<style>
    .style-list-main {
        display: flex;

        .style-icon {
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
            .style-list-box {
                top: -195px;
                visibility: visible;
                opacity: 1;
            }
        }

        .style-list-box {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            gap: 10px;
            transition: 0.3s ease-out;
            visibility: hidden;
            opacity: 0;
            z-index: 10;
            position: absolute;
            background-color: rgb(227, 235, 247);
            width: 200px;
            height: 200px;
            padding: 10px;
            top: -230px;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 20px;

            >div {
                border-radius: 10px;
                box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
                background-color: rgba(229, 241, 241, 0.753);
                transition: 0.3s ease-in-out;

                &:hover {
                    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
                    background-color: rgba(201, 230, 230, 0.753);
                }
            }

            .style-data-date {
                grid-column: 1 / span 2;
                display: grid;

                >div {
                    margin: auto;
                    width: 100%;
                    padding: 0px 10px;

                    >input {
                        width: 100%;
                    }
                }
            }

            .style-leaf-box {
                display: flex;
                box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);

                >i {
                    cursor: pointer;
                    margin: auto;
                    font-size: 80px;
                }
            }

            .style-rain-box {
                display: flex;
                box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);

                >i {
                    cursor: pointer;
                    margin: auto;
                    font-size: 80px;
                }
            }
        }
    }
</style>