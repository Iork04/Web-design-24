// store/index.js
import { createStore } from "vuex";

export default createStore({
  state: {
    // 状态
    page: 1,
    maxPage: 7,
    serverAddress: "192.168.31.29:25001",

    curTextContent: {
      placeName: "",
      placeType: "",
      topContentLeftTitle: "",
      topContentLeftInfo: "",
      location: "",
      lon: "",
      lat: "",
    },

    style: {
      number: 0,
      contentClose: true,
      slidingSpeed: 100,
      slidingQuantity: 100,
    },

    key: {
      weatherKey: "6cd94573bb4f457f94add9cc2a60e641",
      mapWebJsKey: "e61a48757d8503a327693f25f8903bdc",
      mapWebJsKey_a: "63e309dc98673dd5a0b6f7492c6a5f2c",
      mapWebKey: "d937bbba6273c4b3af8a0507787f4115",
    },
  },
  mutations: {
    // 修改状态的方法
  },
  actions: {
    // 处理异步操作的方法
  },
  getters: {
    // 从状态中派生新状态的方法
  },
});
