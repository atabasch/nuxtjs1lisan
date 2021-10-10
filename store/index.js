export const state = ()=>({
  headerBar: null,
  langdir:'de-tr',
  head: {}
});

// this.$store.getters.methodName
export const getters = {
  getHeaderBar(state){ return state.headerBar },
  getLangDir(state){ return state.langdir },
  getHead(state){ return state.head; }
}

// this.$store.commit("methodName", data)
export const mutations = {
  setHeaderBar(state, data){ state.headerBar = data; },
  setLangDir(state, data){ state.langdir = data; },
  setHead(state, data){
    state.head = { title: data.title, meta: [ { hid: 'description',  name: 'description',  content: data.description } ] };
  }, // setHead
}

// this.$store.dispatch('methodName', data)
export const actions = {
  nuxtServerInit(vuexContext, context){
    return context.$axios.post("/words").then(response => {
    });
  },
  changeDirection(context){
    this.$axios.post('/change-direction').then(response => {
      context.commit('setLangDir', response.data.langdir);
    });
  } //changeDirection
}//actions
