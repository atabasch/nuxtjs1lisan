<template>
  <section class="mt-5 pt-2">
    <PageWord  :words="words"/>
  </section>
<!--
<section class="mt-5 pt-2">

  <div id="listTable" v-if="!isWork">
    <WordsTable :words="words"/>
    <div class="text-right">
      <NuxtLink :to="this.$route.path+'?work=true'" class="btn btn-dark" type="button"><i class="fas fa-question"></i> Çeviriyi Tahmin Et</NuxtLink>
      <NuxtLink :to="this.$route.path.replace('words', 'exercsie')+'-test'" class="btn btn-success"><i class="fas fa-check"></i> Test Çöz</NuxtLink>
    </div>
  </div>

  <section id="workTable" class="position-relative w-100" v-else>
    <CardStatusProgressBar :percent="percent"/>
    <WordWorkCard v-if="showedIndex==index" v-for="(word, index) in words" :word="word" :key="index" :nextCard="nextCard"/>
  </section>

</section> -->
</template>

<script>
import PageWord from "../../../../components/mobile/PageWord";
import WordsTable from "~/components/mobile/WordsTable";
import CardStatusProgressBar from "~/components/mobile/CardStatusProgressBar";
import WordWorkCard from "~/components/mobile/WordWorkCard";
import {upgradeWordsForList} from "~/plugins/helpers";
export default {
  name: "list",
  layout: 'mobile',

  components:{
    PageWord,
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
    let params = context.params.number.split(",")

    context.store.commit("setHeaderBar", {title:"Kelime Listesi", prevUrl: '/mobile/words/list'});
    return context.$axios.post(`/words/${params[0]}/${params[1]}`)
      .then(response => {
        return {
          ...response.data,
          offset:params[0],
          limit: response.data.words.length,
        };
      });
  }, //asyncData

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
      this.isWork = this.$route.query.work=='true'? true : false;
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
