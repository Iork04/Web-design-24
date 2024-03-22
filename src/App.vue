<template>
  <rain></rain>
  <!-- <chatgpt></chatgpt> -->
  <shadowCurtain></shadowCurtain>
  <navigation></navigation>
  <topContent></topContent>
  <updateBackground></updateBackground>
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

  data() {
    return {

    }
  }
  ,
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