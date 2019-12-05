<template>
  <div id="app">
    <h1>今期は何見てる?</h1>
    <div v-if="lookingAnime.length">
      <md-button class="md-accent md-raised" :href="tweet()">見てるアニメをツイート!</md-button>
    </div>
    <div class="md-layout md-gutter">
      <div
        v-for="item in content.animeList"
        v-bind:key="item.title"
        class="md-layout-item md-medium-size-30 md-small-size-50 md-xsmall-size-100"
      >
        <link-prevue v-bind:url="item.public_url">
          <template slot-scope="props">
            <md-card>
              <md-card-media md-ratio="16:9">
                <img v-bind:src="props.img" />
              </md-card-media>
              <md-card-area>
                <md-card-header>
                  <span class="md-title">{{ item.title }}</span>
                </md-card-header>
              </md-card-area>
              <md-card-actions>
                <md-checkbox v-model="lookingAnime" v-bind:value="item.title">見てる</md-checkbox>
              </md-card-actions>
            </md-card>
          </template>
        </link-prevue>
      </div>
    </div>
  </div>
</template>

<script>
import LinkPrevue from "link-prevue";

const data = new Date();
const year = data.getFullYear();
const month = data.getMonth();

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
      season: getSeason(month),
      lookingAnime:[]
    };
  },
  components: {
    LinkPrevue: LinkPrevue
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
    },
    tweet() {
      return `https://twitter.com/intent/tweet/?text=今期見ているアニメは%0A${this.lookingAnime.join("%0A")}`
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

.md-card {
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
/*.md-button.md-theme-default {
  color: white;
  background-color: #2BA1F2;
}*/
</style>
