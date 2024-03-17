<template>
    <div class="updateBackgroundMain">
        <div class="imgBox" v-for="(image, index) in images" :key="index"
            :style="{ backgroundImage: 'url(src/assets/img/' + image + ')' }" @click="UpdateBackground(index + 1)">
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
        };
    },
    methods: {
        UpdateBackground(index) {
            if (index === undefined) {
                index = Math.floor(Math.random() * 4) + 1;
            }
            document.body.style.backgroundImage = `url(src/assets/img/${index}.jpg)`;
        },
    },
};
</script>

<style>
.updateBackgroundMain {
    display: flex;
    height: 400px;
    width: 100%;

    .imgBox {
        position: relative;
        flex: 1;
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
