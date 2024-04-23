<template>
    <!-- 左上角导航栏 -->
    <div class="right-top-box">
        <div class="right-top-box-meun" :class="{ 'right-top-box-hide': !this.$store.state.ContentClose }">
            <a href="" class="fontShadow">WebsiteSituation
                <hr>
            </a>
        </div>
        <div class="right-top-box-meun" :class="{ 'right-top-box-hide': !this.$store.state.ContentClose }"> <a href=""
                class="fontShadow">Contact
                <hr>
            </a>
        </div>
        <!-- 搜索栏 -->
        <div class="search-bar" :class="{ 'search-bar-show': this.searchQuery }">
            <input type="text" v-model="searchQuery" placeholder="请输入搜索内容">
            <a :href="_searchUrl" target="_blank" @click="HandleSearch"><i class='bx bx-search'></i></a>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                searchQuery: '',
            };
        },
        computed: {
            _searchUrl() {
                return `https://www.bing.com/search?q=${this.searchQuery}`;
            }
        },
        methods: {
            HandleSearch(event) {
                if (!this.searchQuery.trim())
                    event.preventDefault();
            },
        }
    }
</script>

<style>
    .right-top-box-hide {
        display: none !important;
    }

    .right-top-box {
        transition: 0.5s ease-out;
        border-radius: 4vh;
        z-index: 10;
        display: grid;
        grid-template-columns: auto auto auto;
        position: absolute;
        right: 2vh;
        top: 2vh;
        padding: 1vh 2vh;

        .search-bar {
            position: relative;
            display: inline-flex;
            height: 50px;
            border-radius: 50px;
            padding: 0px 0px 0px 10px;
            background-color: #2f3640;
            transform: 0.4;

            >input {

                border: none;
                background: none;
                outline: none;
                width: 0;
                padding: 0;
                font-size: 20px;
                transition: 0.4s;
                color: wheat;
            }

            >a {
                color: #e94118;
                width: 40px;
                height: 40px;
                margin: 5px;
                border-radius: 50%;
                background-color: #2f3640;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: 0.4s;
                margin-right: 10px;

                >i {
                    font-size: 30px;
                }
            }

            &:hover {
                >input {
                    width: 160px;
                    padding: 0 6px;
                }

                >a {
                    background-color: wheat;
                }
            }
        }

        .search-bar-show {
            >input {
                width: 160px;
                padding: 0 6px;
            }

            >a {
                background-color: wheat;
            }
        }

        .right-top-box-meun {
            display: flex;
            margin-right: 20px;

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

            background-color: rgba(255, 255, 255, 0.774);

            .right-top-box-meun {


                >a {
                    transition: 0.5s;
                    color: #6e7379;
                }
            }
        }

    }
</style>