import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const initialSnackState = {
  color: "",
  text: "",
  showSnackbar: false,
  timeout: 3000
};

export default new Vuex.Store({
  state: {
    rotas: [],
    users: [],
    singleRota: null,
    error: false,
    errorMessage: null,
    rotaLoading: false,
    userError: null,
    snackbarData: initialSnackState
  },
  getters: {
    getRotas: state => state.rotas,
    getUsers: state => state.users,
    getSingleRota: state => state.singleRota,
    getErrorState: state => state.error,
    getErrorMessage: state => state.errorMessage,
    getRotaLoading: state => state.rotaLoading,
    getSnackbarData: state => state.snackbarData,
    getUserError: state => state.userError,
  },
  mutations: {
    setRotas: (state, data) => {
      state.rotas = data;
    },
    setUsers: (state, data) => {
      state.users = data;
    },
    setSingleRota: (state, data) => {
      state.singleRota = data;
    },
    setErrorState: (state, data) => {
      state.error = data;
    },
    setErrorMessage: (state, data) => {
      state.errorMessage = data;
    },
    setRotaLoading: (state, data) => {
      state.rotaLoading = data
    },
    setUserError: (state, data) => {
      state.userError = data
    },
    updateSnackbar: (state, data) => {
      if (data.timeout === 0) {
          state.snackbarData = { ...data };
      } else if (data.timeout === null) {
          state.snackbarData = { ...initialSnackState, ...data };
      } else {
          state.snackbarData = { ...initialSnackState, ...data };
          setTimeout(() => {
              state.snackbarData = { ...initialSnackState };
          }, data.timeout || 2000);
      }
    }
  },
  actions: {
    fetchRotas: async({commit}) => {
      try {
        commit('setErrorState', false)
        commit('setSingleRota', null)
        commit('setRotaLoading', true)
        const res = await axios.get(`https://my.api.mockaroo.com/rotas?key=${process.env.VUE_APP_KEY}`)
        if(res.status === 200) {
          commit('setRotas', res.data)
          commit('setRotaLoading', false)
          commit(
            "updateSnackbar",
            {
                color: "success",
                text: "Rota fetched succesfully",
                showSnackbar: true
            },
            { root: true }
          );
        }
        
      } catch (error: any) {
        commit('setErrorState', true)
        commit('setErrorMessage', error?.response.data.error)
        commit('setRotaLoading', false)
        commit(
          "updateSnackbar",
          {
              color: "error",
              text: error.response.data.error,
              showSnackbar: true
          },
          { root: true }
        );
        
        return error
      }
    },
    fetchUsers: async ({commit}) => {
      try {
        commit('setUserError', null)
        const res = await axios.get(`https://my.api.mockaroo.com/users?key=${process.env.VUE_APP_KEY}`)
        if(res.status === 200) {
          commit('setUsers', res.data)
        }
        
      } catch (error: any) {
        commit('setUserError', error?.response.data.error)
        return error

      }
    },
    fetSingleRota: async ({commit}, val) => {
      try {
        commit('setErrorState', false)
        commit('setRotaLoading', true)
        const res = await axios.get(`https://my.api.mockaroo.com/rotas/${val}?key=${process.env.VUE_APP_KEY}`)
        if(res.status === 200) {
          commit('setSingleRota', res.data)
          commit('setRotaLoading', false)
          commit(
            "updateSnackbar",
            {
                color: "success",
                text: "Rota fetched succesfully",
                showSnackbar: true
            },
            { root: true }
          );
        }
        
      } catch (error: any) {
        commit('setErrorState', true)
        commit('setErrorMessage', error?.response.data.error)
        commit('setRotaLoading', false)
        commit(
          "updateSnackbar",
          {
              color: "error",
              text: error.response.data.error,
              showSnackbar: true
          },
          { root: true }
        );

        return error
      }
    },
  },
  modules: {
  }
})
