<template>
  <section class="mt-5 pt-2">

    <div id="listTable" v-if="!isWork">
      <WordsTable :words="this.$store.getters['words/getWords']"/>
      <div class="text-right">
        <button class="btn bg-success text-white" type="button" @click="isWork=true">Kelimeleri Çalış</button>
      </div>
    </div>

    <section id="workTable" class="position-relative w-100" style="height: 600px" v-else>
      <CardStatusProgressBar :percent="percent"/>
      <WordTestCard v-if="showedIndex==index" v-for="(word, index) in this.$store.getters['words/getWords']" :word="word" :key="index" :nextCard="nextCard"/>
    </section>

  </section>
</template>

<script>
import WordsTable from "../../../../components/mobile/WordsTable";
import CardStatusProgressBar from "~/components/mobile/CardStatusProgressBar";
import WordWorkCard from "~/components/mobile/WordWorkCard";
import WordTestCard from "../../../../components/mobile/WordTestCard";

export default {
  name: "list-test",
  layout: 'mobile',

  components:{
    WordTestCard,
    WordsTable,
    WordWorkCard,
    CardStatusProgressBar
  },

  data(){
    return {
      sentences: {},
      showedIndex: 0,
      percent: 0,
      isWork:true
    }
  },

  asyncData(context){
    let id = context.params.id.split(',');
    let requestUrl = `/exercise/test?taxonomy=list&id=${id[0]}&limit=15`;
    return context.store.dispatch("words/fillWords", {url:requestUrl});
  }, //asyncData

  created() {
    this.$store.commit("setHeaderBar", {title:this.$store.getters["words/getTaxonomy"].tax_name, prevUrl: '/mobile/words/list'});
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
