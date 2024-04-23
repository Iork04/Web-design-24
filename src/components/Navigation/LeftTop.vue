<template>
    <!-- 右上角导航栏 -->
    <div class="left-top-box">
        <span><i class='bx bxs-volume-full'></i></span>
        <!-- <span><i class='bx bxs-volume-low'></i></span> -->
        <!-- <span><i class='bx bxs-volume-mute'></i></span> -->
        <!-- <span><i class='bx bxs-volume'></i></span> -->
    </div>
</template>

<script>

</script>

<style>
    .left-top-box {
        z-index: 10;
        display: flex;
        position: absolute;
        left: 4vh;
        top: 2vh;
        gap: 2vh;

        >span {
            display: inline-flex;
            cursor: pointer;
            position: relative;
            border: 5px solid rgba(0, 0, 0, 0);
            gap: 10px;
            border-radius: 10px;

            >i {
                font-size: 65px;
            }

            &:hover {
                transition: 0.5s;
                border: 5px solid black;
                border-radius: 25px;
            }
        }
    }
</style>