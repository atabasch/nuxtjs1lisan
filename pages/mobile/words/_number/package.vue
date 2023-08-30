<template>
  <!--<section class="mt-5 pt-2">
   <PageWord  :words="this.$store.getters['words/getWords']"/>
 </section>
 -->
 <section class="mt-5 pt-2">

   <div id="listTable" v-if="!isWork">
     <WordsTable :words="this.$store.getters['words/getWords']"/>
     <div class="text-right">
       <Button @click="isWork=true" class="btn btn-dark" type="button"><i class="fas fa-question"></i> Çeviriyi Tahmin Et</Button>
       <NuxtLink :to="this.$route.path.replace('words', 'exercise')+'-test'" class="btn btn-success"><i class="fas fa-check"></i> Test Çöz</NuxtLink>
     </div>
   </div>

   <div id="workTable" class="position-relative w-100" style="height: 600px" v-else>
     <CardStatusProgressBar :percent="percent"/>
     <WordWorkCard v-if="showedIndex==index" v-for="(word, index) in this.$store.getters['words/getWords']" :word="word" :key="index" :nextCard="nextCard"/>
   </div>

 </section>

</template>

<script>
import PageWord from "../../../../components/mobile/PageWord";
import WordsTable from "../../../../components/mobile/WordsTable";
import CardStatusProgressBar from "~/components/mobile/CardStatusProgressBar";
import WordWorkCard from "~/components/mobile/WordWorkCard";
import {upgradeWordsForList} from "../../../../plugins/helpers";

export default {
  name: "package",
  layout: 'mobile',

  components:{
    PageWord,
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
