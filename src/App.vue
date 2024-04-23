<template>
  <BackGrpimdStyles></BackGrpimdStyles>
  <Navigation></Navigation>
  <Content></Content>
  <BackgroundShow></BackgroundShow>
  <WebCrawler></WebCrawler>
  <TheFooter></TheFooter>
</template>


<script>


  import BackGrpimdStyles from "./components/BackGrpimdStyles/Main.vue";
  import Navigation from "./components/Navigation/Main.vue"
  import Content from "./components/Content/ContentMain.vue";
  import BackgroundShow from "./components/BackgroundShow.vue"
  import WebCrawler from "./components/WebCrawler/WebCrawlerMain.vue"
  import TheFooter from "./components/TheFooter.vue"


  export default {
    beforeMount() {
      this.GetInitNumber();
    },

    methods: {
      GetInitNumber() {
        const urlParams = new URLSearchParams(window.location.search);
        if (!window.location.search) {
          urlParams.set('number', '1');
          const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
          history.pushState({}, '', newUrl);
        }
        let number = parseInt(urlParams.get('number'));
        if (number < 1)
          number = 1;
        if (number > this.$store.state.maxPage)
          number = this.$store.state.maxPage;
        urlParams.set('number', number);
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
        history.pushState({}, '', newUrl);
        this.$store.state.page = number;
      }
    },
    components: {
      BackGrpimdStyles,
      Navigation,
      Content,
      BackgroundShow,
      WebCrawler,
      TheFooter
    }
  }




</script>

<style></style>