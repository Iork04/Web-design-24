<template>
    <div class="webCrawler-box">
        <BiliBili></BiliBili>
    </div>
</template>

<script>
    import BiliBili from "./BiliBili.vue"
    export default {
        data() {
            return {

            }
        },
        components: {
            BiliBili,
        }
    }
</script>

<style>
    .webCrawler-box {
        padding-bottom: 20px;
        background-color: rgba(255, 255, 255, 0.705);
    }
</style>