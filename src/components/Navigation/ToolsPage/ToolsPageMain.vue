<template>
    <div class="tools-page-box" :class="{ 'tools-page-box-hide': this.$store.state.ContentClose }">
        <Logo></Logo>
        <RightT></RightT>
        <RightB></RightB>
    </div>
</template>

<script>

    import Logo from "./LogoMain.vue"
    import RightT from "./RightTopMain.vue"
    import RightB from "./RightBottomMain/RightBottomMain.vue"
    export default {
        components: {
            Logo,
            RightT,
            RightB
        }
    }
</script>

<style>

    .tools-page-box {
        overflow: hidden;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100vh;
        background-color: rgba(3, 3, 3, 0.555);
        transition: 0.5s;

    }

    .tools-page-box-hide {
        border-radius: 25%;
        opacity: 0;
        width: 70%;
        height: 70vh;
        visibility: hidden;
    }
</style>