<template>
    <div class="update-background-box">
        <div class="img-box" v-for="index in 4" :key="index"
            :style="{ backgroundImage: `url(${serverImgUrl}&imgname=${index})` }" @click="UpdateBackground(index)">
        </div>
    </div>
</template>
<script>
    export default {
        mounted() {
            this.UpdateBackground();
        },
        computed: {
            serverImgUrl() {
                return `http://${this.$store.state.serverAddress}/resource/getImg?number=${this.$store.state.page}`;
            },
        },
        watch: {
            serverImgUrl(newValue, oldValue) {
                this.UpdateBackground();
            },
        },
        methods: {
            UpdateBackground(index) {
                if (index === undefined) {
                    index = Math.floor(Math.random() * 4) + 1;
                }
                document.body.style.backgroundImage = `url(${this.serverImgUrl}&imgname=${index})`;
            },
        },
    };
</script>

<style>
    .update-background-box {
        display: flex;
        height: 400px;
        width: 100%;
        z-index: 5;

        .img-box {
            position: relative;
            flex: 1;
            z-index: 5;
            box-shadow: -5px 0 5px 5px rgba(0, 0, 0, 0.281);
            display: grid;
            background-size: cover;
            cursor: pointer;
            transition: 0.5s ease-out;
            background-position: center;

            &:hover {
                flex: 3;
            }

            &:before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.247);
                z-index: 10;
            }
        }
    }
</style>
