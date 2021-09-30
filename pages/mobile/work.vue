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
import WordsTable from "~/components/mobile/WordsTable";
import CardStatusProgressBar from "~/components/mobile/CardStatusProgressBar";
import WordWorkCard from "~/components/mobile/WordWorkCard";
import {upgradeWordsForList} from "~/plugins/helpers";

export default {
  name: "work",
  layout: "mobile",

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
    return context.$axios.get(`/work`)
      .then(response => {
        return {
          ...response.data,
          limit: response.data.words.length,
        };
      });
  }, //asyncData

  async created(){
    this.$store.commit("setHeaderBar", {title:"Kelime Çalışması", prevUrl: '/mobile'});
    this.words = await upgradeWordsForList(this.words);
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
