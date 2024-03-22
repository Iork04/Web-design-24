<template>
    <div class="chatgptMain" @click="sendMessage"></div>
</template>

<script>

export default {
    data() {
        return {

        }
    },

}
</script>

<style>
.chatgptMain {
    position: fixed;
    width: 120px;
    height: 120px;
    background-color: black;
    z-index: 10;
    top: 50%;
    cursor: pointer;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
