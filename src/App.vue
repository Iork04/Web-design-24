<template>
  <shadowCurtain></shadowCurtain>
  <Navigation></Navigation>
  <topContent></topContent>
</template>


<script>

import shadowCurtain from "./components/shadowCurtain.vue";
import Navigation from "./components/Navigation.vue";
import topContent from "./components/topContent.vue";

export default {
  data() {
    return {

    }
  }
  ,
  components: {
    shadowCurtain,
    Navigation,
    topContent
  }
}

</script>

<style></style>