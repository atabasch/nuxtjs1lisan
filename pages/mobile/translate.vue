<template>
  <section id="app" class=" position-relative w-100" style="padding:60px 10px 10px;">

    <div class="row bg-white text-center font-weight-bold">
      <div class="p-1 col"><input type="hidden" v-model="from.code">{{ from.label }}</div>
      <div class="p-1 col-1" @click="changeRoute"><i class="fas fa-exchange-alt"></i></div>
      <div class="p-1 col"><input type="hidden" v-model="to.code">{{ to.label }}</div>
    </div>

    <div class="input-group mb-3">
      <input rows="1" type="search" class="form-control" placeholder="Aranacak kelime" v-model="original" @keyup.enter="translate()" autofocus/>
      <div class="input-group-append">
        <button class="btn btn-success" type="button" @click="translate()">Çevir</button>
      </div>
    </div>

    <div class="form-group">

    </div>

    <div id="translation" class="bg-light p-1 minh-50" v-show="translationOriginal!=''">
      <template v-for="result in results">
        <div class="bg-secondary text-light p-2" v-html="result.headword_full"></div>
        <ul v-for="arabs in result.arabs">
          <li v-for="translation in arabs.translations" v-html=" '<em>['+translation.source+']:</em> '+translation.target "></li>
        </ul>
      </template>
    </div>

  </section>
</template>

<script>
export default {
  name: "translate",
  layout: "mobile",
  data(){ return {
    from: {code:'de', label:'Almanca'},
    to: {code:'tr', label:'Türkçe'},
    original: '',
    translationOriginal: '',
    translations: '',
    results: []
  } },
  fetch() {
    this.$store.commit("setHeaderBar", {title: "Sözlük", prevUrl: '/mobile'})
  },

  methods: {
    changeRoute: function(){
      let oldFrom = this.from;
      this.from = this.to;
      this.to = oldFrom;
    },
    translate: function(){
      let thisContext = this;
      this.$axios.post('/translate', {original:this.original, from:this.from.code, to:this.to.code})
      .then(response => {
        if(typeof response.data.error != 'undefined'){

        }else{
          thisContext.translationOriginal = response.data.originalFull;
          thisContext.translations = response.data.items;
          thisContext.results = response.data.roms;
        }
      })

    }
  }// methods
}
</script>

<style scoped>

</style>
