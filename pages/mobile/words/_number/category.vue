<template>
  <section class="mt-5 pt-2">

    <div id="listTable" v-if="!isWork">
      <WordsTable :words="words"/>
      <div class="text-right">
        <button class="btn bg-success text-white" type="button" @click="isWork=true">Kelimeleri Çalış</button>
      </div>
    </div>

    <section id="workTable" class="position-relative w-100" style="height: 600px" v-else>
      <CardStatusProgressBar :percent="percent"/>
      <WordWorkCard v-if="showedIndex==index" v-for="(word, index) in words" :word="word" :key="index" :nextCard="nextCard"/>
    </section>

  </section>
</template>

<script>
import WordsTable from "../../../../components/mobile/WordsTable";
import CardStatusProgressBar from "~/components/mobile/CardStatusProgressBar";
import WordWorkCard from "~/components/mobile/WordWorkCard";
export default {
  name: "category",
  layout: 'mobile',

  components:{
    WordsTable,
    WordWorkCard,
    CardStatusProgressBar
  },

  data(){
    return {
      words: [],
      sentences: {},
      finished: [],
      showedIndex: 0,
      percent: 0,
      isWork:false
    }
  },

  asyncData(context){
    let categoryId = context.params.number
    return context.$axios.get(`/words/${categoryId}/category`)
      .then(response => {
        console.log(response.data);
        return {
          ...response.data,
          categoryId,
          limit: response.data.words.length,
        };
      });
  }, //asyncData

  created(){
    this.$store.commit("setHeaderBar", {title:this.category.tax_name, prevUrl: '/mobile/words/categories'});
    this.words.forEach(async (item, index) => {
      let word = item;
      let datas = JSON.parse(word.word_datas);
      if(typeof datas.sentences != 'undefined'){
        if(datas.sentences.length > 0){
          let randomSnt = datas.sentences[Math.floor((Math.random()*datas.sentences.length))];
          word.sentence = (Object.keys(randomSnt).indexOf('original')<0)? {original:'', translation:''} : randomSnt;
        }else{
          word.sentence = {original:'', translation:''};
        }
      }else{
        word.sentence = {original:'', translation:''};
      }
      word.perfekt = (typeof datas.perfekt == 'undefined')? null : datas.perfekt;
      word.conjugations = (typeof datas.conjugations == 'undefined')? null : datas.conjugations.map((item, i) => { return `<div class="col-6 py-0 px-1" style="font-size:0.90rem; line-height: 0.95rem;">${item}</div>`; }).join('');

      word.original = (word.original.indexOf('+')<0)? word.original : '<span class="text-dark">'+word.original.replace('+', '</span>');
      word.translation = (word.translation.indexOf('+')<0)? word.translation : '<span class="text-dark">'+word.translation.replace('+', '</span>');
      this.words[index] = word;


    });//foreach

  }, //created
  mounted(){
    this.updateProgress();
  },

  methods: {
    updateProgress(){
      this.percent = Math.ceil((100/this.limit)*(this.showedIndex+1));
    },
    nextCard(){
      if(this.showedIndex<this.limit-1){
        this.showedIndex++;
        this.updateProgress();
      }else{
        this.isWork=false;
      }
    },

  } //methods


}
</script>

<style scoped>

</style>
