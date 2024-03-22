<template>
  <rain></rain>
  <!-- <chatgpt></chatgpt> -->
  <shadowCurtain></shadowCurtain>
  <navigation :_number="_number" :_host="_host"></navigation>
  <topContent :_number="_number" :_host="_host"></topContent>
  <updateBackground :_number="_number" :_host="_host"></updateBackground>
  <div class="test"></div>
</template>


<script>


import shadowCurtain from "./components/shadowCurtain.vue";
import navigation from "./components/navigation.vue";
import topContent from "./components/topContent.vue";
import rain from "./components/rain.vue";
import updateBackground from "./components/updateBackground.vue"
import chatgpt from "./components/chatgpt.vue"


export default {
  beforeMount() {
    this.GetInitNumber();
  },
  data() {
    return {
      _number: 1,
      _host: "127.0.0.1:25001",
    }
  },
  methods: {
    GetInitNumber() {
      if (!window.location.search) {
        // 如果没有查询参数，则添加默认参数
        const newParams = new URLSearchParams(window.location.search);
        newParams.set('number', '1');
        const newUrl = `${window.location.pathname}?${newParams.toString()}`;
        history.pushState({}, '', newUrl);
      }
      const urlParams = new URLSearchParams(window.location.search);
      const number = urlParams.get('number');
      this._number = parseInt(number);
    }
  },
  components: {
    shadowCurtain,
    navigation,
    topContent,
    rain,
    updateBackground,
    chatgpt
  }
}




</script>

<style>
.test {
  position: relative;
  z-index: 0;
  height: 500vh;
  width: 100%;
  /* background-color: rgb(172, 148, 148); */
}
</style>./components/navigation.vue