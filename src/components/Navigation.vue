<template>
    <div class="navigationMain">

        <div class="leftMain">
            <span><i class='bx bx-search'></i></span>
            <span><i class='bx bxs-volume-full'></i></span>
            <span><i class='bx bxs-volume-low'></i></span>
            <span><i class='bx bxs-volume-mute'></i></span>
            <span><i class='bx bxs-volume'></i></span>
        </div>

        <div class="rightMain">

            <div class="meun"> <a href="" class="fontShadow">WebsiteSituation
                    <hr>
                </a>

            </div>
            <div class="meun"> <a href="" class="fontShadow">Contact
                    <hr>
                </a>

            </div>

        </div>
    </div>

    <div class="pageArrow">
        <span><i class='bx bx-chevron-left'></i></span>
        <span><i class='bx bx-chevron-right'></i></span>
    </div>


</template>

<script>

</script>

<style>
.navigationMain {
    position: relative;

    .leftMain {
        z-index: 10;
        display: flex;
        position: fixed;
        left: 4vh;
        top: 2vh;
        gap: 2vh;

        >span {
            display: inline-flex;
            cursor: pointer;
            position: relative;
            border: 2px solid rgba(0, 0, 0, 0);
            gap: 10px;

            >i {
                font-size: 65px;
            }

            &:hover {
                transition: 0.5s;
                border: 2px solid black;
                border-radius: 1vh;
            }
        }
    }

    .rightMain {
        border-radius: 4vh;
        z-index: 10;
        display: flex;
        position: fixed;
        right: 2vh;
        top: 2vh;
        padding: 1vh 2vh;
        gap: 2vh;

        .meun {
            display: flex;

            >a {
                font-size: 30px;
                color: aliceblue;
            }

            hr {
                float: left;
                height: 8px;
                border: 0px;
                background-color: rgb(139, 179, 179);
                border-radius: 10px;
                width: 1%;
                opacity: 0;
            }

            &:hover {
                >a {
                    transition: 0.5s;
                    color: black;
                }

                hr {
                    transition: 0.5s;
                    background-color: black;
                    opacity: 1;
                    width: 100%;
                }
            }
        }

        &:hover {
            transition: 1s ease-out;
            background-color: rgba(255, 255, 255, 0.774);
        }

    }
}

.pageArrow {
    z-index: 10;
    display: flex;
    position: fixed;
    bottom: 10%;
    right: 5%;
    gap: 40px;

    >span {
        display: inline-flex;
        width: 80px;
        height: 80px;
        border: 0.3vh solid #fff;
        border-radius: 2vh;
        cursor: pointer;
        justify-self: center;
        align-items: center;

        >i {
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
}
</style>