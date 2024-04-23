<template>
    <!-- 翻页按钮 -->
    <div class="turn-page-box" :class="{ 'turn-page-box-hide': !this.$store.state.ContentClose }">
        <span :class="{ 'prohibit': this.$store.state.page == 1 }" @click="prePage"><i
                class='bx bx-chevron-left'></i></span>
        <span :class="{ 'prohibit': this.$store.state.maxPage == this.$store.state.page }"><i
                class='bx bx-chevron-right' @click="nextPage"></i></span>
    </div>
</template>

<script>
    export default {
        methods: {
            prePage() {
                if (this.$store.state.page == 1)
                    return;
                this.$store.state.page--;
            },
            nextPage() {
                if (this.$store.state.maxPage == this.$store.state.page)
                    return;
                this.$store.state.page++;
            }
        },
    }
</script>

<style>
    .turn-page-box {
        z-index: 10;
        display: grid;
        grid-template-columns: auto auto;
        position: absolute;
        bottom: 10%;
        right: 5%;
        gap: 40px;
        transition: 0.3s;

        >span {
            width: 80px;
            height: 80px;
            border: 3px solid #fff;
            border-radius: 20px;
            cursor: pointer;
            display: flex;

            >i {
                margin: auto;
                font-size: 80px;
            }

            &:nth-child(1) {
                color: #fff;
                background-color: rgba(13, 13, 14, 0.747);

                &:hover {
                    transition: 0.5s;
                    color: black;
                    background-color: rgba(255, 255, 255, 0.808);
                }
            }

            &:nth-child(2) {
                color: black;
                background-color: rgba(255, 255, 255, 0.808);

                &:hover {
                    transition: 0.5s;
                    color: #fff;
                    background-color: rgba(13, 13, 14, 0.747);
                }
            }
        }

        /* 禁止点击样式 */
        .prohibit {
            cursor: not-allowed;

            &:nth-child(1) {
                color: #fff !important;
                background-color: rgba(13, 13, 14, 0.747) !important;
            }

            &:nth-child(2) {
                color: black !important;
                background-color: rgba(255, 255, 255, 0.808) !important;
            }
        }
    }

    .turn-page-box-hide {
        opacity: 0;
        bottom: 5%;
        visibility: hidden;
    }
</style>