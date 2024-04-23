<template>
    <div class="aichat-main">
        <!-- 图标 -->
        <div class="aichat-icon" @click="OpenChat">
            <i class="bx bx-message-rounded-dots"></i>
        </div>

        <!-- 聊天框主体 -->
        <div class="chat-box-main" :class="{ 'chat-box-main-hovered': inputMessage }">
            <div class="chat-message-box">
                <div class="message-box message-left">
                    <div class="message-avatar">
                        <i class='bx bx-bot'></i>
                    </div>
                    <div class="message-text-box">
                        <div class="message-text">
                            你好！我是一个AI助手！可以简单的为你介绍一些的景点的相关信息！
                        </div>
                    </div>
                </div>

                <!-- 渲染消息列表 -->
                <div class="message-box" v-for="(message, index) in  messageList.slice(1) " :key="index"
                    :class="GetClass(message.role)">
                    <div class="message-avatar">
                        <i v-if="message.role === 'user'" class='bx bx-meh-blank'></i>
                        <i v-else class='bx bx-bot' :class="{ 'bx-tada': IsLoading(message.content) }"></i>
                    </div>
                    <div class="message-text-box">
                        <div class="message-text">
                            <div :class="{ 'message-text-loading': IsLoading(message.content) }">loading</div>
                            {{ message.content }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- 输入框 -->
            <div class="input-box">
                <input placeholder="请输入内容" v-model="inputMessage">
                <span @click="SendMessage" :class="{ 'send-responding': isResponding }">Send</span>
            </div>


        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                messageList: [{
                    role: "system",
                    content: "现在充当我的助手，主要为我介绍一些四川的景点!",
                }],
                inputMessage: "",
                isResponding: false,
            }
        },
        methods: {
            GetClass(role) {
                return role === "user" ? "message-right" : "message-left";
            },
            IsLoading(msg) {
                return msg === "" ? true : false;
            },
            SendMessage() {
                if (!this.inputMessage.length) {
                    console.log("输入为空");
                    return;
                }

                if (this.isResponding) {
                    console.log("请勿重复请求");
                    return;
                }

                // 设置响应状态防止重复请求
                this.isResponding = true;

                // 更新信息列表
                const message = {
                    role: "user",
                    content: this.inputMessage,
                };
                this.messageList.push(message)
                this.inputMessage = ""

                // 封装请求信息
                let askInfo = [];
                askInfo.push(this.messageList[0])
                for (let i = this.messageList.length - 1, cnt = 0; i > 0 && cnt < 5; i--, cnt++) {
                    askInfo.push(this.messageList[i]);
                }
                const data = {
                    messages: askInfo,
                };

                // 发起请求
                this.messageList.push({ role: "assistant", content: "" });
                axios
                    .post(`http://${this.$store.state.serverAddress}/api/chatgpt`, data)
                    .then((response) => {
                        const responseContent = response.data.choices[0].message.content;
                        let index = 0;
                        const intervalId = setInterval(() => {
                            this.messageList[this.messageList.length - 1].content += responseContent[index];
                            index += 1;

                            // msg解析完毕
                            if (index == responseContent.length) {
                                this.isResponding = false;
                                clearInterval(intervalId);
                            }
                        }, 50);
                    })
                    .catch((error) => {
                        console.error("请求失败", error);
                        this.isResponding = false;
                        this.messageList[this.messageList.length - 1].content = error;
                    });
            }
        }
    }
</script>
<style>
    .aichat-main {
        display: flex;
        position: relative;

        /* 图标 */
        .aichat-icon {
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

        /* 聊天框主体显示 */
        &:hover {
            .chat-box-main {
                visibility: visible;
                opacity: 1;
                top: -420px;
            }
        }

        .chat-box-main-hovered {
            visibility: visible !important;
            opacity: 1 !important;
            top: -420px !important;
        }

        /* 聊天框主体 */
        .chat-box-main {
            transition: 0.3s ease-out;
            visibility: hidden;
            opacity: 0;
            z-index: 10;
            position: absolute;
            background-color: rgb(141, 150, 160);
            width: auto;
            padding: 10px;
            top: -470px;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 20px;
            overflow: hidden;

            /* 信息主体 */
            .chat-message-box {
                height: 350px;
                background-color: rgba(240, 248, 255, 0.664);
                border-radius: 20px;
                margin-bottom: 5px;
                overflow: scroll;

                /* 消息主体 */
                .message-box {
                    width: 100%;
                    padding: 10px 20px;
                    overflow: hidden;

                    /* 头像框 */
                    .message-avatar {
                        user-select: none;
                        font-size: 40px;
                        pointer-events: none;

                        >i {
                            display: block;
                        }
                    }

                    /* msg-text */
                    .message-text-box {
                        margin-top: 10px;
                        width: 70%;

                        .message-text {
                            display: inline-block;
                            background-color: rgb(176, 174, 184);
                            border-radius: 10px 10px 10px 10px;
                            padding: 8px;
                            font-size: 15px;

                            >div {
                                display: none;
                            }

                            /* msg加载样式 */
                            .message-text-loading {
                                display: block;
                                text-align: center;
                                letter-spacing: 4px;
                                width: 100px;
                                height: 20px;
                                border-radius: 5px;
                                background-color: rgba(201, 207, 228, 0.637);
                            }
                        }
                    }
                }

                /* 右边 */
                .message-left {
                    .message-avatar {
                        float: left;
                    }

                    .message-text-box {
                        float: left;

                        .message-text {
                            float: left;
                        }
                    }
                }

                /* 左边 */
                .message-right {
                    .message-avatar {
                        float: right;
                    }

                    .message-text-box {
                        float: right;

                        .message-text {
                            float: right;
                        }
                    }
                }

            }


            /* 底部输入框 */
            .input-box {
                padding: 5px;
                border-radius: 20px;
                width: auto;
                white-space: nowrap;
                background-color: rgba(240, 248, 255, 0.664);

                >input {
                    padding: 5px;
                    font-size: 20px;
                    width: 400px;
                    background-color: rgba(255, 255, 255, 0);
                    outline: none;
                    border: none;
                }

                /* 禁止发送样式 */
                .send-responding {
                    cursor: not-allowed;
                    background-color: rgb(10, 69, 121);
                }

                /* 发送 */
                >span {
                    user-select: none;
                    cursor: pointer;
                    background-color: rgb(61, 137, 204);
                    padding: 5px;
                    font-size: 18px;
                    border-radius: 20px;
                    transition: 0.3s;

                    &:hover {
                        background-color: rgb(10, 69, 121);
                    }
                }
            }
        }
    }
</style>