<template>
  <section>

    <div id="listTable" v-if="!isWork">
      <WordsTable :words="words"/>
      <div class="text-right">
        <NuxtLink :to="this.$route.path+'?work=true'" class="btn btn-dark" type="button"><i class="fas fa-question"></i> Çeviriyi Tahmin Et</NuxtLink>
        <NuxtLink :to="this.$route.path.replace('words', 'exercise')+'-test'" class="btn btn-success"><i class="fas fa-check"></i> Test Çöz</NuxtLink>
      </div>
    </div>

    <section id="workTable" class="position-relative w-100" v-else>
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
  name: "PageWord",
  props: {
    words: Object
  },

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


  async created(){
    this.words = await upgradeWordsForList(this.words);
    this.listParams = this.$route.params.number;
  }, //created
  mounted(){
    this.changeIsWork()
    this.updateProgress();
  },
  updated() {
    this.changeIsWork()
  },
  methods: {
    changeIsWork(){
      if(this.$route.query.work=='true'){
        this.isWork = true;
      }else{
        this.isWork = false;
      }
    },
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
