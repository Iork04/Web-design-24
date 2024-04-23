<template>
    <div class="slider" :style="{
        width: scrollPercentage
    }"></div>
</template>
<script>
    export default {
        data() {
            return {
                scrollPercentage: "",
            }
        },
        methods: {
            GetWidth() {
                var scrollY = window.scrollY;
                var totalHeight = document.documentElement.scrollHeight - window.innerHeight;
                this.scrollPercentage = (scrollY / totalHeight) * 100 + "%";
                // console.log(this.scrollPercentage)
            }
        },
        mounted() {
            window.addEventListener('scroll', this.GetWidth);
        }
    }
</script>
<style>
    .slider {
        border-radius: 5px;
        z-index: 10;
        position: fixed;
        top: 0px;
        width: 0%;
        height: 5px;
        background-color: black;
        transition: 0.7s ease-out;
    }
</style>