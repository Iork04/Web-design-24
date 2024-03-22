<template>
    <div class="topContentMain" :class="{ 'hideContent': _isHide, 'hideButton': _isHideButton }">
        <span class="openContent" @click="CloseOpenContent"> <i class='bx bxs-chevron-right'></i></span>
        <div class="topContentLeft">
            <span class="closeContent" @click="CloseOpenContent"><i class='bx bx-x-circle'></i></span>
            <div class="placeName">{{ _placeName.substring(0,
        Math.ceil(_placeName.length / 2)) }}</div>
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
import axios from 'axios';
export default {
    props: {
        _number: {
            required: true
        },
        _host: { required: true }
    },
    watch: {
        _number: function (newValue, oldValue) {
            this.fetchData();
        }
    },
    mounted() {
        this.fetchData()
    },
    data() {
        return {
            _placeName: "",
            _placeType: "",
            _topContentLeftTitle: "",
            _topContentLeftInfo: "",
            _isHide: false,
            _isHideButton: false,
        }
    },
    methods: {
        CloseOpenContent() {
            this._isHideButton = !this._isHideButton;
            this._isHide = !this._isHide;
        },
        fetchData() {
            this._isHide = true;
            this._isHideButton = false;
            const textMask = document.querySelector(".topContentLeft");

            const newParams = new URLSearchParams(window.location.search);
            newParams.set('number', this._number);
            const newUrl = `${window.location.pathname}?${newParams.toString()}`;
            history.pushState({}, '', newUrl);
            axios.get(`http://${this._host}/resource/getContent?number=${this._number}`).then(response => {
                const jsonData = response.data;

                setTimeout(() => {
                    this._placeName = jsonData.placeName;
                    this._placeType = jsonData.placeType;
                    this._topContentLeftTitle = jsonData.topContentLeftTitle;
                    this._topContentLeftInfo = jsonData.topContentLeftInfo;
                    this._isHide = false;
                }, 500);
            }).catch(error => { console.error('Error fetching data:', error) });

            console.log(textMask)
        }
    }
}
</script>

<style>
.topContentMain {
    width: 100%;
    height: 100vh;
    display: flex;
    overflow: hidden;

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

.hideButton {
    .openContent {
        left: -34px;
    }
}

.hideContent {

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