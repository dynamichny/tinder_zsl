import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
    matches: [],
    isMore: false,
    moreData: null,
    convos: [],
    users: [],
    isChat: false,
    chatTarget: null
  },
  mutations: {
    setUser(state, user) {
      state.currentUser = user;
    },
    setMatches(state, data) {
      state.matches = data;
    },
    changeIsMore(state, data) {
      state.isMore = data;
    },
    setMoreData(state, data) {
      state.moreData = data;
    },
    setConversations(state, data) {
      state.convos = data;
    },
    setUsers(state, data) {
      state.users = data;
    },
    setChatState(state, data) {
      state.isChat = data;
    },
    setChatTarget(state, data) {
      state.chatTarget = data;
    }
  },
  actions: {},
  modules: {}
});
