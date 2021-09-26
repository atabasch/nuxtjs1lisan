<template>
  <section class="my-5 py-2 row">

    <WordTaxGridItem v-for="(item, index) in items"
                     :item="item"
                     :key="index"
                     :class-value="'col-6 col-sm-4 col-lg-3 p-2'"
                     :url="`/mobile/words/${item.tax_id}/package`" />

  </section>
</template>

<script>
import WordTaxGridItem from "../../../components/mobile/WordTaxGridItem";
export default {
  name: "packets",
  layout: "mobile",

  components: {
    WordTaxGridItem
  },

  asyncData(context){
    let id = context.params.number
    context.store.commit("setHeaderBar", {title: 'Kelime Paketleri', prevUrl:'/mobile' })
    return context.$axios.get(`/words/packets`)
      .then(response => {
        return {
          ...response.data,
          packetId:id,
        };
      });
  }, //asyncData

  created(){

  }//created
}
</script>

<style scoped>

</style>
