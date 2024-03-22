<template>
    <div class="updateBackgroundMain">
        <div class="imgBox" v-for="index in 4" :key="index"
            :style="{ backgroundImage: `url(${_serverImgUrl}&imgname=${index})` }" @click="UpdateBackground(index)">
        </div>
    </div>
</template>
<script>
export default {
    props: {
        _number: {
            required: true
        },
        _host: { required: true }
    },
    watch: {
        _number: function (newValue, oldValue) {
            this.UpdateBackground();
        }
    },
    mounted() {
        this.UpdateBackground()
    },
    data() {
        return {
        };
    },
    computed: {
        _serverImgUrl() {
            return `http://${this._host}/resource/getImg?number=${this._number}`;
        }
    },
    methods: {
        UpdateBackground(index) {
            if (index === undefined) {
                index = Math.floor(Math.random() * 4) + 1;
            }
            document.body.style.backgroundImage = `url(${this._serverImgUrl}&imgname=${index})`;
        },
    },
};
</script>

<style>
.updateBackgroundMain {
    display: flex;
    height: 400px;
    width: 100%;
    z-index: 5;

    .imgBox {
        position: relative;
        flex: 1;
        z-index: 5;
        box-shadow: -5px 0 5px 5px rgba(0, 0, 0, 0.281);
        transition: flex 0.8s;
        display: grid;
        background: url("../assets/img/1.jpg") no-repeat center;
        background-size: cover;
        cursor: pointer;

        &:hover {
            flex: 3;
        }

        &:before {
            content: '';
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
