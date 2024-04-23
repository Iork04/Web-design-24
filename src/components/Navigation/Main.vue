<template>
    <Slider></Slider>
    <TurnPage></TurnPage>
    <RightTop></RightTop>
    <LeftTop></LeftTop>
    <ToolsPage></ToolsPage>

</template>

<script>
    import TurnPage from "./TurnPage.vue"
    import RightTop from "./RightTop.vue"
    import LeftTop from "./LeftTop.vue"
    import Slider from "./Slider.vue"
    import ToolsPage from "./ToolsPage/ToolsPageMain.vue"

    export default {
        components: {
            TurnPage,
            RightTop,
            LeftTop,
            ToolsPage,
            Slider
        }
    }
</script>