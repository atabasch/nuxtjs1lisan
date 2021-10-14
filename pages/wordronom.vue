<template>
<section class="card">
  <div class="card-header p-0">
    <div class="row p-0 m-0">
        <div class="col-12 col-sm p-1 m-0">
          <select class="form-control" v-model="options.taxtype" @change="changedType">
            <option value="0">Rastgele Kelimeler</option>
            <option value="category">Kategoriye Göre</option>
            <option value="type">Sınıfa Göre</option>
          </select>
        </div>

        <div class="col-12 col-sm p-1 m-0">
          <select class="form-control" v-model="options.taxid" @change="loadWords">
            <option value="0">Filtre Seç: </option>
            <option v-for="taxonomy in taxonomies" :value="taxonomy.tax_id">({{ taxonomy.word_count }}) - {{taxonomy.tax_name }}</option>
          </select>
        </div>

      <div class="col-12 col-sm p-1 m-0">
        <select v-model="options.limit" class="form-control" @change="loadWords">
          <option v-for="limit in limits" :value="limit">Maks. {{ limit }} Kelimeyi</option>
        </select>
      </div>

        <div class="col-12 col-sm p-1 m-0">
          <select class="form-control" v-model="options.time">
            <option v-for="time in times" :value="time" >{{ time }} Sn'de bir</option>
          </select>
        </div>

      <div class="col-12 col-sm p-1 m-0">
        <select class="form-control" v-model="options.order">
          <option value="random" >Rastgele getir</option>
          <option value="order" >Sırayla getir</option>
        </select>
      </div>


    </div>
  </div>

  <div class="card-body text-center py-5">
      <span class="text-success">{{ this.options.counter.second }}</span>
      <h1>{{ getWord.word_original }}</h1>
      <hr>
      <h4 class="text-secondary">{{ getWord.word_translation }}</h4>
      <hr>
      <p v-if="getWord.sentence">{{ getWord.sentence.original }}</p>
      <button class="btn btn-success" @click="play" v-if="!options.play && options.taxtype==0"><i class="far fa-play-circle"></i> Şu anki ayarlarla başlat</button>


  </div>
</section>
</template>

<script>
export default {
  name: "wordronom",
  layout:"mobile",
  head(){ return {
    title: "Wordronom 1 Lisan",
    meta: [
      { name: "robots", content: "noindex, nofollow, noimageindex, nosnippet" }
    ]
  } },
  data(){ return {
    options: {
      play: false,
      taxtype: 0,
      taxid: 0,
      time: 15,
      limit: 15,
      order: 'random',
      counter: {
        loop: null,
        second: 0
      }
    },

    appInterval: null,

    taxonomies: [],
    taxonomy: {},
    words: [],
    wordIndex: 0,
    word: {
      word_original: "1 Lisan Wordronom",
      word_translation: "Otomatik Almanca kelimeler getirir.",
    },


    times: [5, 10, 15, 30, 45, 60, 90, 120],
    limits: [5, 10, 15, 20, 25, 30, 50, 75, 100, 150]
  } }, // data
  computed: {
    getWords(){ return this.words; },
    getWord(){
      if(this.words.length<1 || !this.options.play){ return this.word; }else{
        let word = this.getWords[this.wordIndex];
        if(typeof word.word_datas=="string"){
          word.word_datas = JSON.parse(word.word_datas.toString());
        }
        word.sentence = null;
        if(word.word_datas.sentences.length>0){
          if(typeof word.word_datas.sentences[0].original != 'undefined'){
            word.sentence = word.word_datas.sentences[ Math.floor(Math.random()*word.word_datas.sentences.length) ]
          }
        }
        return word;
      }
    }, // getWords
  }, //computed

  created(){
    if(this.words.length>0){
      this.options.play = true;
      this.initSetInterval();
    } // if(this.words.length>0)
  }, // created

  updated() {
    if(this.options.play!=true && this.options.taxid>0 && this.options.taxtype!=0){
      this.options.play = true;
      this.initSetInterval();
    }
    if(this.options.taxtype!=0 && this.options.taxid==0){
      this.stopIntervals();
    }
  },

  watch: {

    "options.time": function(value){
      if(this.options.play){
        this.initSetInterval();
      } // play
    }, //"options.time"

  }, //watch



  methods: {

    stopIntervals: function(){
      this.options.play = false;
      this.options.counter.second = this.options.time;
      clearInterval(this.appInterval);
      clearInterval(this.options.counter.loop);
    }, // stopIntervals

    initSetInterval: function(){
      let context = this;
      clearInterval(this.appInterval);
      context.setCounterLoop();
      this.appInterval = setInterval(function(){
        context.changeWord();
        context.setCounterLoop();
      }, (this.options.time*1000)); // setInterval
    }, // initSetInterval

    setCounterLoop: function(){
      let context = this;
      clearInterval(this.options.counter.loop);
      this.options.counter.loop = null;
      this.options.counter.second = this.options.time;
      this.options.counter.loop = setInterval(function(){
        if(context.options.play){ context.options.counter.second--; }
      }, 1000);

    }, // setCounterLoop

    changedType: function(){
      let context = this;
      this.options.taxid=0;
      this.taxonomies=[];
      if(this.options.taxtype=='category'){
        this.options.play=false;
        context.setCounterLoop(true);
        this.$axios.post("/words/categories")
          .catch(error => { console.log(error) })
          .then(result => { context.taxonomies = result.data.items; })

      }else if(this.options.taxtype=='type'){
        this.options.play=false;
        context.setCounterLoop(true);
        this.$axios.post("/words/types")
          .catch(error => { console.log(error) })
          .then(result => { context.taxonomies = result.data.items; })

      }else{
        this.loadWords();
      } // else

    }, // changedType



    loadWords: function(){
      let context = this;
      if(this.options.taxtype=='category'){

        this.$axios.post(`/words/${this.options.taxid}/category`, {limit: this.options.limit}).catch(error => { console.log(error) })
          .then(result => { context.taxonomy = result.data.category; context.words = Object.values(result.data.words); })

      }else if(this.options.taxtype=='type'){

        this.$axios.post(`/words/${this.options.taxid}/type`, {limit: this.options.limit}).catch(error => { console.log(error) })
          .then(result => { context.taxonomy = result.data.type; context.words = Object.values(result.data.words); })

      }else {
        this.$axios.post(`/words/random`, {limit: this.options.limit}).catch(error => { console.log(error) })
          .then(result => { context.taxonomy = {}, context.words = Object.values(result.data.words); })
      }

    }, // loadWords

    changeWord: function(){
      if(this.options.order=='order'){
        this.wordIndex = (this.wordIndex<(this.words.length-1))? this.wordIndex+1 : 0;
      }else{
        this.wordIndex = Math.floor( Math.random() * this.words.length );
      }
    }, // changeWord

    play: function (){
      if(!this.options.play){
        this.options.play = true;
        this.loadWords();
        this.initSetInterval()
      }
    }, //play

  }, // methods
}
</script>

<style scoped>

</style>
