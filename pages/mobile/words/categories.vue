<template>
  <section class="my-5 py-2 row">
    <WordTaxGridItem
      v-for="(item, index) in this.$store.getters['branches/getItems']"
      :item="item"
      :key="index"
      :class-value="'col-6 col-sm-4 col-lg-3 p-2'"
      :url="`/mobile/words/${item.tax_id}/category`" />
  </section>
</template>

<script>
import WordTaxGridItem from "~/components/mobile/WordTaxGridItem";
export default {
  name: "categories",
  layout: "mobile",
  components: { WordTaxGridItem },
  asyncData(context){
    context.store.commit("setHeaderBar", {title: 'Kategoriler', prevUrl:'/mobile' })
    return context.store.dispatch("branches/fillItems", {url: '/words/categories'})
  }, //asyncData
}
</script>

<style scoped>

</style>
