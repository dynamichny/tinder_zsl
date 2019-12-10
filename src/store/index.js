import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
    matches: []
  },
  mutations: {
    setUser(state, user) {
      state.currentUser = user;
    },
    setMatches(state, data) {
      state.matches = data;
    }
  },
  actions: {},
  modules: {}
});
