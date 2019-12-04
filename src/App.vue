<template>
  <div id="app">
    <h1>今期は何見てる?</h1>
    {{ content }}
  </div>
</template>

<script>
//import {fetchOgpImage} from "./store"

const data = new Date();
const year = data.getFullYear();
const month = data.getMonth();
//fetchOgpImage('http://0x6d61.github.io')
const getSeason = month => {
  if (1 <= month && month <= 3) {
    return 1;
  } else if (4 <= month && month <= 6) {
    return 2;
  } else if (7 <= month && month <= 9) {
    return 3;
  } else {
    return 4;
  }
};

export default {
  name: "app",
  data() {
    return {
      year: year,
      season: getSeason(month)
    };
  },
  computed: {
    content() {
      this.fetchAnimeList();
      return this.$store.state.animeList;
    }
  },
  methods: {
    fetchAnimeList() {
      this.$store.dispatch("fetchAnimeList", {
        year: this.year,
        season: this.season
      });
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
