<template>
    <div class="tools-right-bottom-box">
        <AiChat></AiChat>
        <Nav></Nav>
        <Weather></Weather>
        <StyleList></StyleList>
        <Music></Music>

    </div>
</template>
<script>
    import AiChat from "./AiChat.vue"
    import Weather from "./Weather.vue"
    import StyleList from "./StyleList.vue"
    import Nav from "./Nav.vue"
    import Music from "./Music.vue"
    export default {
        components: {
            AiChat,
            Weather,
            StyleList,
            Nav,
            Music
        }
    }
</script>
<style>
    .tools-right-bottom-box {
        padding: 10px;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        display: grid;
        position: absolute;
        width: 620px;
        top: 70%;
        left: 50%;
        border-radius: 15px;
        background-color: rgba(0, 0, 0, 0.582);
        gap: 47px;
    }
</style>