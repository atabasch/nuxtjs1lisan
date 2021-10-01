import {upgradeWordsForList} from "../plugins/helpers";

export const state = ()=>({
  words:[],
  package:{},
  type:{},
  category:{},
  taxonomy:{},
  totalWordCount:0,
  selectedWordLimit: 15
});

export const getters = {
  getWords(state){          return state.words; }, //getwords
  getPackage(state){          return state.package || state.taxonomy; }, //getPackage
  getType(state){          return state.type || state.taxonomy; }, //getType
  getCategory(state){          return state.category; }, //getType
  getTaxonomy(state){          return state.taxonomy; }, //getType
  getTotalWordCount(state){ return state.totalWordCount; },
}//getters


export const mutations = {
  setWords: (state, data)=>{
    state.words = data;
    state.totalWordCount = data.length;
    },
  setPackage: (state, data)=>{ state.package = data;},
  setType: (state, data)=>{ state.type = data;},
  setCategory: (state, data)=>{ state.category = data;},
  setTaxonomy: (state, data)=>{ state.taxonomy = data;},
} //mutations

export const actions = {

  async fillWords(context, data){
    return this.$axios.post(data.url)
      .then(async response => {
        context.commit("setWords", await upgradeWordsForList(response.data.words))
        if(typeof response.data.package != "undefined"){
          context.commit("setPackage", response.data.package)
        }
        if(typeof response.data.type != "undefined"){
          context.commit("setType", response.data.type)
        }
        if(typeof response.data.category != "undefined"){
          context.commit("setCategory", response.data.category)
        }
        if(typeof response.data.taxonomy != "undefined"){
          context.commit("setTaxonomy", response.data.taxonomy)
        }
      });
  }, //fillWords

}//actions
