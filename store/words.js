export const state = ()=>({
  words:[],
  totalWordCount:0,
  selectedWordLimit: 15
});

export const getters = {
  getWords(state){          return state.words; }, //getwords
  getTotalWordCount(state){ return state.totalWordCount; },
}//getters


export const mutations = {
  setWords: (state, data)=>{ state.words = data; },
  setTotalWordCount: (state, data)=>{ state.totalWordCount = data; },
} //mutations

export const actions = {
  totalWordCount(context, data){
    this.$axios.get('/words/count').then( response => {
      context.commit('setTotalWordCount', response.data.count);
    } );
  },


  fillWordsAll(vueContext, data){

    /*
    let listNumber = data.limit.length
    if(!listNumber){
      let url = "/words";
    }else{
      let url = "/words/";
    }
    this.$axios.get()
      .then(response => {
        vueContext.commit("setWords", response.data.words)
      })
    */
  }, //fillWordsAll
}//actions
