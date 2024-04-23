<template>
    <div class="logo-box">
        <div class="logo">
            <i class='bx bx-landscape bx-tada'></i>
            <em>૮(˶ᵔ ᵕ ᵔ˶)ა </em>
        </div>
        <div class="introduce">
            <em>"</em>
            <h3>一个建于21世纪的小站，存活于互联网的边缘</h3>
            <em>"</em>
        </div>
        <div class="icon">
            <a href="https://github.com/Iork04/Web-design-24" target="_blank"><i class='bx bxl-github'></i></a>
            <a href="https://github.com/Iork04/Web-design-24" target="_blank"><i class='bx bx-envelope'></i></a>

        </div>
    </div>
</template>
<script></script>
<style>
    .logo-box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-110%, -50%);

        .logo {

            >i {
                color: aliceblue;
                font-size: 100px;
                margin-right: 20px;
            }

            >em {
                color: aliceblue;
                user-select: none;
                position: relative;
                top: -15px;
                font-size: 80px;
            }
        }

        .introduce {
            padding: 30px 50px;
            position: relative;
            margin-top: 10px;
            width: 100%;
            height: 100px;
            border-radius: 15px;
            background-color: rgba(0, 0, 0, 0.582);

            >em {
                user-select: none;
                position: absolute;
                color: aliceblue;
                font-size: 20px;
                font-size: 60px;
            }

            >em:nth-child(1) {
                top: 0px;
                left: 0px;
            }

            >h3 {
                font-size: 20px;
                font-family: "Caveat", cursive;
                display: inline-block;
                position: relative;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: rgb(210, 222, 233);
            }

            >em:nth-child(3) {
                bottom: -30px;
                right: 15px;
            }
        }

        .icon {
            margin-top: 20px;

            >a {
                margin-right: 10px;

                >i {
                    cursor: pointer;
                    font-size: 35px;
                    color: rgb(212, 222, 233);
                }
            }

        }
    }
</style>