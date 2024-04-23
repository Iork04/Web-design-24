<template>
    <div class="music-box-main">
        <div class="music-icon">
            <i class='bx bx-music'></i>
        </div>
    </div>
</template>
<script></script>
<style>
    .music-box-main {
        .music-icon {
            margin: auto;
            display: inline-flex;
            z-index: 10;

            >i {
                cursor: pointer;
                font-size: 80px;
                transition: 0.3s;
                color: aliceblue;

                &:hover {
                    transform: scale(1.2);
                }
            }
        }
    }
</style>