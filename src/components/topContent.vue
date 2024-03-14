<template>
    <div class="topContentMain" :class="{ 'hideContent': _isHide }">
        <span class="openContent" @click="CloseOpenContent"> <i class='bx bxs-chevron-right'></i></span>
        <div class="topContentLeft">
            <span class="closeContent" @click="CloseOpenContent"><i class='bx bx-x-circle'></i></span>
            <div class="placeName">{{ _placeName.substring(0, Math.ceil(_placeName.length / 2)) }}</div>
            <div class="topContentLeftInfo"><span>{{ _topContentLeftTitle }}</span><br>{{
        _topContentLeftInfo }}<br><button>了解更多</button></div>
        </div>
        <div class="topContentRight">
            <div class="placeName">{{ _placeName.substring(Math.ceil(_placeName.length / 2)) }}</div>
            <div class="placeType">{{ _placeType }}</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            _placeName: "九寨沟",
            _placeType: "Valley",
            _topContentLeftTitle: "01、九寨沟",
            _topContentLeftInfo: "九寨沟是大自然鬼斧神工的杰作，奇峰卓绝，林深茂密，有“翠海、叠瀑、彩林、雪峰、蓝冰、藏情”六绝之美，有“童话世界”美誉，又因水景纷呈有“九寨归来不看水”之说。",
            _isHide: false,
        }
    },
    methods: {
        CloseOpenContent() {
            this._isHide = !this._isHide;
        }

    }
}
</script>

<style>
.topContentMain {
    width: 100%;
    height: 100vh;
    display: flex;

    .openContent {
        transition: 0.5s ease-in-out;
        z-index: 10;
        position: absolute;
        left: -70px;
        top: 50%;
        transform: translateY(-50%);
        background-color: #fff;
        border-radius: 50%;
        cursor: pointer;

        >i {
            transform: translateX(15%);
            font-size: 60px;
        }
    }

    .topContentLeft {
        transition: 0.5s ease-in-out;
        flex: 1;
        background-color: rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(20px);
        position: relative;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        -webkit-mask: linear-gradient(#000 0 0),
            linear-gradient(#000 0 0);
        -webkit-mask-clip: text, padding-box;
        -webkit-mask-composite: xor;

        >span {
            z-index: 11;
            position: absolute;
            right: 0vh;
            top: 1vh;


            >i {
                cursor: pointer;
                font-size: 40px;
            }

            &:nth-child(1) {
                display: block;
            }

            &:nth-child(2) {
                display: none;
            }

            &:hover {
                transition: 0.1s;
                transform: scale(1.1);
            }
        }

        .placeName {
            font-size: 200px;
            font-weight: 700;
            text-shadow: 2px 10px #000;
            color: #fff;


        }

        .topContentLeftInfo {

            font-size: 25px;
            position: absolute;
            bottom: 3vh;
            left: 3vh;
            color: #fff;
            padding-right: 3vh;
            font-family: "Caveat", cursive;

            >span {
                text-decoration: underline;
                font-size: 50px;
                letter-spacing: 5px;
            }

            >button {
                cursor: pointer;
                font-family: "Caveat", cursive;
                margin-top: 1vh;
                width: 250px;
                height: 80px;
                font-size: 50px;
                border-radius: 20px;
                border: 3px solid black;


                &:hover {
                    transition: 0.3s;
                    color: #fff;
                    background: transparent;
                }
            }
        }
    }

    .topContentRight {
        transition: 0.5s ease-in-out;
        flex: 1;
        background-color: rgba(0, 0, 0, 0.1);
        position: relative;
        display: flex;
        justify-content: center;
        flex-direction: column;

        .placeName {
            font-size: 200px;
            font-weight: 700;
            color: #fff;
            text-shadow: 2px 10px rgba(133, 132, 132, 0.644);
            /* font-family: "Caveat", cursive; */
        }

        .placeType {
            position: absolute;
            font-size: 60px;
            color: #fff;
            transform: translateY(170%);
            margin-left: 2vh;
        }

    }
}

.hideContent {

    .openContent {
        left: -34px;
    }


    .topContentLeft {
        opacity: 0;
        transform: translateX(-100%);
    }

    .topContentRight {
        opacity: 0;
        transform: translateX(100%);
    }
}
</style>