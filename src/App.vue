<template>
  <rain></rain>
  <shadowCurtain></shadowCurtain>
  <Navigation></Navigation>
  <topContent></topContent>
</template>


<script>

import shadowCurtain from "./components/shadowCurtain.vue";
import Navigation from "./components/Navigation.vue";
import topContent from "./components/topContent.vue";
import rain from "./components/rain.vue";

export default {
  data() {
    return {

    }
  }
  ,
  components: {
    shadowCurtain,
    Navigation,
    topContent,
    rain
  }
}

</script>

<style></style>