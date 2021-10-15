<template>
<section class="card">
  <div class="card-header p-0">
    <div class="row p-0 m-0">
        <div class="col-12 col-sm p-1 m-0">
          <select class="form-control" v-model="options.taxtype" @change="stopLoop(), changedType()">
            <option value="0">Rastgele Kelimeler</option>
            <option value="category">Kategoriye Göre</option>
            <option value="type">Sınıfa Göre</option>
          </select>
        </div>

        <div class="col-12 col-sm p-1 m-0">
          <select class="form-control" v-model="options.taxid" @change="stopLoop(), loadWords()">
            <option value="0">Filtre Seç: </option>
            <option v-for="taxonomy in taxonomies" :value="taxonomy.tax_id">({{ taxonomy.word_count }}) - {{taxonomy.tax_name }}</option>
          </select>
        </div>

      <div class="col-12 col-sm p-1 m-0">
        <select v-model="options.limit" class="form-control" @change="stopLoop(), loadWords()">
          <option v-for="limit in limits" :value="limit">Maks. {{ limit }} Kelimeyi</option>
        </select>
      </div>

        <div class="col-12 col-sm p-1 m-0">
          <select class="form-control" v-model="options.time" @change="stopLoop()">
            <option v-for="time in times" :value="time" >{{ time }} Sn'de bir</option>
          </select>
        </div>

      <div class="col-12 col-sm p-1 m-0">
        <select class="form-control" v-model="options.order" @change="stopLoop()">
          <option value="random" >Rastgele getir</option>
          <option value="order" >Sırayla getir</option>
        </select>
      </div>


    </div>
  </div>

  <div class="card-body text-center py-5">

      <h1>{{ getWord.word_original }}</h1>
      <hr>
      <h4 class="text-secondary">{{ getWord.word_translation }}</h4>
      <hr>
      <p v-if="getWord.sentence">{{ getWord.sentence.original }}</p>
      <button class="btn btn-success" @click="play" v-if="!options.play"><i class="far fa-play-circle"></i> Başlat</button>

    <span class="timer"><strong>{{ this.options.counter.second }}</strong></span>
    <button class="controlerButton btn btn-success" @click="play" v-show="!options.play"><em class="fa fa-play"></em></button>
    <button class="controlerButton btn btn-danger" @click="stop" v-show="options.play"><em class="fa fa-stop"></em></button>
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


    times: [ 5, 10, 15, 30, 45, 60, 90, 120],
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
      this.startLoop();
    } // if(this.words.length>0)
  }, // created

  methods: {

    stopLoop: function(){
      this.options.play = false;
      this.options.counter.second = this.options.time;
      clearInterval(this.appInterval);
      clearInterval(this.options.counter.loop);
    }, // stopLoop

    startLoop: function(){
      let context = this;
      clearInterval(this.appInterval);
      context.setCounterLoop();
      this.appInterval = setInterval(function(){
        context.changeWord();
        context.setCounterLoop();
      }, (this.options.time*1000)); // setInterval
    }, // startLoop

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
        this.$axios.post("/words/categories").catch(error => { console.log(error) }).then(result => {  context.taxonomies = result.data.items; })
      }else if(this.options.taxtype=='type'){
        this.$axios.post("/words/types").catch(error => { console.log(error) }).then(result => {  context.taxonomies = result.data.items; })
      }else{
        this.loadWords();
      } // else
    }, // changedType


    loadWords: function(){
      let context = this;
      if(this.options.taxtype=='category'){

        this.$axios.post(`/words/${this.options.taxid}/category`, {limit: this.options.limit}).catch(error => { console.log(error) })
          .then(result => { context.taxonomy = result.data.category; context.words = result.data.words; })

      }else if(this.options.taxtype=='type'){

        this.$axios.post(`/words/${this.options.taxid}/type`, {limit: this.options.limit}).catch(error => { console.log(error) })
          .then(result => { context.taxonomy = result.data.type; context.words = result.data.words; })

      }else{
        this.$axios.post(`/words/random`, {limit: this.options.limit}).catch(error => { console.log(error) })
          .then(result => { context.taxonomy = {}, context.words = result.data.words; })
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
      this.options.play = true;
      this.loadWords();
      this.startLoop()
    }, //play


    stop: function (){
      this.options.play = false;
      this.stopLoop()
    }, //stop

  }, // methods
}
</script>

<style scoped>
  .card-body{
    position: relative;
  }
  .timer{
    position: absolute;
    top:10px;
    left: 10px;
    width: 2.5rem;
    height: 2.5rem;
    border: 3px solid rgba(28,116,48, 1);
    background:rgba(28,116,48, 0.2);
    text-align: center;
    line-height: 2rem;
    font-size: 1.3rem;
    border-radius: 50%;
    -webkit-border-radius: 50% !important;
    border-radius: 50% !important;
  }

  .controlerButton{
    position: absolute;
    right: 10px;
    top: 10px;
  }
</style>
