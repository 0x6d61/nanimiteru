import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
//import cheerio from "cheerio";

/*const fetchOgpImage = async url => {
  let content;
  try {
    const html = await fetch(url, { mode: "cors" });
    const $ = cheerio.load(html.data);
    $("head meta").each((i, el) => {
      const property = $(el).attr("property");
      if (property === "og:image") {
        content = $(el).attr("content");
      }
    });
  } catch (error) {
    return console.log("error");
  }
  return content;
};*/

const fetchAnimeList = async (year, season) => {
  const atnimeTitle = await axios.get(
    `http://api.moemoe.tokyo/anime/v1/master/${year}/${season}`
  );

  return atnimeTitle.data.map(i => {
    return {
      title: i.title,
      public_url: i.public_url
    };
  });
};

const animeList = {
  state: {
    animeList: {},
    lookingAnime: []
  },
  mutations: {
    getAnimeList(state, data) {
      state.animeList = data;
    }
  },
  actions: {
    async fetchAnimeList({ commit }, data) {
      const animeList = await fetchAnimeList(data.year, data.season);
      commit("getAnimeList", animeList);
    }
  }
};

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    animeList
  }
});
