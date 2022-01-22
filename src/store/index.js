import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    checkEmail(_, email) {
      return new Promise((resolve, reject) => {
        this._vm.axios
          .post("auth/check-email", {
            email,
          })
          .then(({ data }) => {
            resolve(data.exists);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    register(_, input) {
      return new Promise((resolve, reject) => {
        this._vm.axios
          .post("auth/register", {
            input,
          })
          .then(({ data }) => {
            resolve(data.exists);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  modules: {},
});
