
export const state = ()=>({
    mobileMainItems: [
      {label:'Paketler',      icon:'fas fa-parachute-box',    href:'/mobile/words/packets'},
      {label:'Egzersiz',      icon:'fas fa-brain',            href:'/mobile/words/exercise'},
      {label:'Sınıflar',      icon:'fas fa-shapes',           href:'/mobile/words/types'},
      {label:'Kategoriler',   icon:'fas fa-folder-open',      href:'/mobile/words/categories'},
      {label:'Çeviri',        icon:'fas fa-language',         href:'/mobile/translate'},
      {label:'Makaleler',     icon:'fas fa-quote-right',      href:'/mobile/blog'},
      {label:'Kelimeler',     icon:'fas fa-quote-right',      href:'/mobile/words'},
      {label:'Cümleler',     icon:'fas fa-quote-right',      href:'/mobile/sentences'},
    ],

    words: []
  })//state

export const getters ={

    getMobileMainItems(state){
      return state.mobileMainItems
    },

    getAllWords(state){
      return this.$store.getters["words/getWords"];
    }

  }

export const mutations = {}
export const actions = {}

