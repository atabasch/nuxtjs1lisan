<template>
<section class="my-5 py-2 row">

  <WordTaxGridItem v-for="(item, index) in items"
                   :item="item"
                   :key="index"
                   :class-value="'col-6 col-sm-4 col-lg-3 p-2'"
                   :url="`/mobile/words/${item.tax_id}/category`" />

</section>
</template>

<script>
import WordTaxGridItem from "../../../components/mobile/WordTaxGridItem";
export default {
  name: "categories",
  layout: "mobile",

  components: {
    WordTaxGridItem
  },

  asyncData(context){
    let startNumber = context.params.number
    context.store.commit("setHeaderBar", {title: 'Kategoriler', prevUrl:'/mobile' })
    return context.$axios.get(`/words/categories`)
      .then(response => {
        return {
          ...response.data,
          startNumber,
          workUrl: '/mobile/words/'+startNumber+'/work'
        };
      });
  }, //asyncData

  created(){

  }//created
}
</script>

<style scoped>

</style>
