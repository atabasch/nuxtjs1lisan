
export const state = ()=>({
    mobileMainItems: [
      {label:'Paketler',      icon:'fas fa-parachute-box',    href:'/mobile/words/packets',       exercise:true,},
      {label:'Egzersiz',      icon:'fas fa-brain',            href:'/mobile/exercise',            exercise:false,},
      {label:'Sınıflar',      icon:'fas fa-shapes',           href:'/mobile/words/types',         exercise:true,},
      {label:'Kategoriler',   icon:'fas fa-folder-open',      href:'/mobile/words/categories',    exercise:true,},
      {label:'Çeviri',        icon:'fas fa-language',         href:'/mobile/translate',           exercise:false,},
      {label:'Makaleler',     icon:'fas fa-quote-right',      href:'/mobile/blog',                exercise:false,},
      {label:'Kelimeler',     icon:'fas fa-quote-right',      href:'/mobile/words/list',               exercise:true,},
      //{label:'Cümleler',     icon:'fas fa-quote-right',      href:'/mobile/sentences'},
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

