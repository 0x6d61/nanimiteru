import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

const fetchAnimeList = async (year, season) => {
  const atnimeTitle = await axios.get(
    `https://api.moemoe.tokyo/anime/v1/master/${year}/${season}`
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
