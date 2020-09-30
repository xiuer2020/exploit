import types from "./types";
import modules from "./modules/modules";
import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
   
  },
  getters: {

  },
  mutations: {
    [types.UPDATE](state, payload) {
      if (payload.name) {
        state[payload.name][payload.key] = payload.value;
      } else {
        state[payload.key] = payload.value;
      }
    }
  },
  actions: {
    [types.UPDATE]({ commit }, n) {
      commit(types.UPDATE, {
        n
      });
    }
  },
  modules
});
