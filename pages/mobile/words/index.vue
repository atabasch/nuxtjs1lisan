<template>
  <section class="mt-5">
    <div class="row">
      <WordTaxGridItem v-for="(item, index) in getItems"
                       :item="item"
                       :key="index"
                       :class-value="'col-6 col-sm-4 col-lg-3 p-2'"
                       :url="`/mobile/words/${item.tax_id},${limitWordList}`" />
    </div>
  </section>
</template>

<script>
import WordTaxGridItem from "../../../components/mobile/WordTaxGridItem";
const limitWordList = 15;
export default {
  name: "index",
  components: {WordTaxGridItem},
  layout:'mobile',

  data(){return {
    items:[],
    totalPage:0,
    totalWord:0,
    limitWordList: limitWordList
    }},

  asyncData(context){
    return context.$axios.post('/words/count')
      .then( response => {
        let totalPage = Math.floor((response.data.count / limitWordList));
        let data = {
          items: new Array(totalPage).fill({}).map((v,i)=> { return {
            tax_id: i+1,
            word_count: limitWordList,
            tax_name: `Liste ${i+1}`,
            tax_datas: JSON.stringify( {"description": Math.floor(limitWordList*(i+1)-(limitWordList-1)) +'..'+ Math.floor(response.data.count/totalPage*(i+1))}),

          } } ),
          totalWord:response.data.count,
          totalPage: totalPage
        };
        return data;
      } );
  },

  created(){
    this.$store.commit("setHeaderBar", {title:"Kelime Listeleri", prevUrl: '/mobile'});
  },


  computed: {
    getTotalPage(){
      return this.totalPage;
    },
    getItems() {
      return this.items
    }
  },

}
</script>

<style scoped>
a:hover{ border-color: #0E4C75 !important; }
</style>
