<template>
  <section class="mt-5 pt-2">

    <div id="listTable" v-if="!isWork">
      <WordsTable :words="this.$store.getters['words/getWords']"/>
      <div class="text-right">
        <Button @click="isWork=true" class="btn btn-dark" type="button"><i class="fas fa-question"></i> Çeviriyi Tahmin Et</Button>
        <NuxtLink :to="this.$route.path.replace('words', 'exercise')+'-test'" class="btn btn-success"><i class="fas fa-check"></i> Test Çöz</NuxtLink>
      </div>
    </div>

    <section id="workTable" class="position-relative w-100" style="height: 600px" v-else>
      <CardStatusProgressBar :percent="percent"/>
      <WordWorkCard v-if="showedIndex==index" v-for="(word, index) in this.$store.getters['words/getWords']" :word="word" :key="index" :nextCard="nextCard"/>
    </section>

  </section>
</template>

<script>
import WordsTable from "~/components/mobile/WordsTable";
import CardStatusProgressBar from "~/components/mobile/CardStatusProgressBar";
import WordWorkCard from "~/components/mobile/WordWorkCard";
import {upgradeWordsForList} from "~/plugins/helpers";
export default {
  name: "type",
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
    let typeId = context.params.number
    let requestUrl = `/words/${typeId}/type`;
    return context.store.dispatch("words/fillWords", {url:requestUrl});
  }, //asyncData

  created() {
    this.isWork = this.$route.query.work || false;
    this.$store.commit("setHeaderBar", {title:this.$store.getters["words/getType"].tax_name, prevUrl: '/mobile/words/types'});
    this.typeId = this.$route.params.number;
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
