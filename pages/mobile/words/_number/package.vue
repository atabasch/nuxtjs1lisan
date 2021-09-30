<template>
  <section class="mt-5 pt-2">

    <div id="listTable" v-if="!isWork">
      <WordsTable :words="this.$store.getters['words/getWords']"/>
      <div class="text-right">
        <button class="btn btn-primary text-white" type="button" @click="isWork=true"><i class="fas fa-question"></i> Tahmin Et</button>
        <NuxtLink :to='`/mobile/exercise/${packageId}/package-test`' class="btn btn-success text-white"><i class="fas fa-check"></i> Test Çöz</NuxtLink>
      </div>
    </div>

    <section id="workTable" class="position-relative w-100" style="height: 600px" v-else>
      <CardStatusProgressBar :percent="percent"/>
      <WordWorkCard v-if="showedIndex==index" v-for="(word, index) in this.$store.getters['words/getWords']" :word="word" :key="index" :nextCard="nextCard"/>
    </section>

  </section>
</template>

<script>
import WordsTable from "../../../../components/mobile/WordsTable";
import CardStatusProgressBar from "~/components/mobile/CardStatusProgressBar";
import WordWorkCard from "~/components/mobile/WordWorkCard";
import {upgradeWordsForList} from "../../../../plugins/helpers";

export default {
  name: "package",
  layout: 'mobile',

  components:{
    WordsTable,
    WordWorkCard,
    CardStatusProgressBar
  },

  data(){
    return {
      sentences: {},
      showedIndex: 0,
      percent: 0,
      isWork:false
    }
  },

  asyncData(context){
    let packageId = context.params.number
    let requestUrl = `/words/${packageId}/package`;
    return context.store.dispatch("words/fillWords", {url:requestUrl});
   }, //asyncData

  created() {
    this.$store.commit("setHeaderBar", {title:this.$store.getters["words/getPackage"].tax_name, prevUrl: '/mobile/words/packets'});
    this.isWork = this.$route.query.work || false;
    this.packageId = this.$route.params.number;
  },

  mounted(){
    this.updateProgress();
  },

  methods: {
    updateProgress(){
      this.percent = Math.ceil((100/this.$store.getters["words/getTotalWordCount"])*(this.showedIndex+1));
    },
    nextCard(){
      if(this.showedIndex<this.$store.getters["words/getTotalWordCount"]-1){
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
