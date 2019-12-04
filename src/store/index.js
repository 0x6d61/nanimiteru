import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import cheerio from "cheerio";

export const fetchOgpIameg = async url => {
  const html = await axios.get(url);
  const $ = cheerio.load(html.data);
  $("head meta").each((i, el) => {
    const property = $(el).attr("property");
    if (property === "og:image") {
      return $(el).attr("content");
    }
  });
};
fetchOgpIameg("http://www.nhk.or.jp/anime/radiant/");
const fetchAnimeList = async (year, season) => {
  const atnimeTitle = await axios.get(
    `http://api.moemoe.tokyo/anime/v1/master/${year}/${season}`
  );

  return atnimeTitle.data.map(async i => {
    return {
      title: i.title,
      public_url: i.public_url,
      image_url: await fetchOgpIameg(i.public_url)
    };
  });
};

const animeList = {
  state: {
    animeList: {}
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
