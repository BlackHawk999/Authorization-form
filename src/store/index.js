import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    token: null,
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    UPDATE_TOKEN(state, payload) {
      state.token = payload;
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
    registerUser(_, input) {
      return new Promise((resolve, reject) => {
        this._vm.axios
          .post("auth/register", input)
          .then(({ data }) => {
            resolve(data);
          })
          .catch((err) => {
            if (err.response) {
              reject(err.response.data.error);
            }
            reject(err.message);
          });
      });
    },
    login({ commit }, { email, password }) {
      return new Promise((resolve, reject) => {
        this._vm.axios
          .post("auth/login", {
            email,
            password,
          })
          .then(({ data }) => {
            commit("SET_USER", data.user);
            commit("UPDATE_TOKEN", data.token);
            resolve(data.user);
          })
          .catch((err) => {
            console.log("err.response :>> ", err.response);
            if (err.response) {
              reject(err.response.data.errors);
            }
            reject(err.message);
          });
      });
    },
  },
});
