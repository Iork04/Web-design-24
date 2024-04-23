<template>
    <div class="rain-main"></div>
</template>
<script>
    var rainId;
    export default {
        computed: {
            slidingSpeed() {
                const speed = this.$store.state.style.slidingSpeed / 100;
                // console.log(speed);
                return speed;
            },
            slidingQuantity() {
                const quantity = parseInt(50 / this.$store.state.style.slidingQuantity * 100);
                // console.log(quantity);
                return quantity;
            },
        },
        watch: {
            '$store.state.style.number': {
                handler(newValue, oldValue) {
                    this.RainStart();
                },
            },
            slidingQuantity(newValue, oldValue) {
                this.RainStart();
            }
        },
        methods: {
            RainStart() {
                this.RainEnd();
                // 检查 rainFlag 是否为 true，避免在 rainFlag 为 false 时继续运行
                if (this.$store.state.style.number === 1) {
                    // console.log("创建")
                    const box = document.querySelector('.rain-main');
                    rainId = setInterval(() => {
                        let boxHeight = box.clientHeight;
                        let boxWidth = box.clientWidth;
                        const rain = document.createElement('div');
                        rain.classList.add('rain');
                        rain.style.top = 0;
                        rain.style.left = Math.random() * boxWidth + 'px';
                        box.appendChild(rain);

                        let race = 1;
                        const timer = setInterval(() => {
                            if (parseInt(rain.style.top) > boxHeight) {
                                clearInterval(timer);
                                box.removeChild(rain);
                            }
                            race += this.slidingSpeed;
                            rain.style.top = parseInt(rain.style.top) + race + 'px';
                        }, 20);

                    }, this.slidingQuantity);
                }
            },
            RainEnd() {
                // 如果 rainFlag 为 false，并且 rainId 存在，则清除主定时器
                if (rainId) {
                    // console.log("删除")
                    clearInterval(rainId);
                    rainId = null;
                }
            }

        }
    }
</script>
<style>
    .rain-main {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 11;
        pointer-events: none;
    }

    .rain {
        position: absolute;
        width: 2px;
        height: 50px;
        background: linear-gradient(rgba(255, 255, 255, .3), rgba(255, 255, 255, .6));
    }
</style>
