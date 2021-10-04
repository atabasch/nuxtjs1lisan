<template>
  <section class="my-5 py-2 mb-4">

    <div class="row">
      <ExercisesListItem v-for="(item, index) in items" :item="item" :key="index" :class-value="'col-sm-6 col-xl-3 p-2'"/>
    </div>


  </section>
</template>

<script>
import ExercisesListItem from "../../../components/mobile/ExercisesListItem";
export default {
  name: "index",
  components: {ExercisesListItem},
  layout: "mobile",

  data(){
    return {
      items: [
        {title: 'Tahmin Et', image:'/images/mobile/bg-work-test.jpg', url: '/mobile/exercise/test', description: 'Çeviriyi', content:'Seçilen 4 kelime arasından doğru olanı tahmin et.'},
        //  {title: 'Geçmiş Zamanı Bul', image:'/images/mobile/bg-work-perfect.jpg', url: '/mobile/exercise/perfekt/list', description: 'ist, hat', content:'Fiillerin geçmiş zaman çevirilerini bul'},
        //  {title: 'Yazma Sınavı', image:'/images/mobile/bg-work-fill.jpg', url: '/mobile/exercise/fill/list', description: 'Boşluk Doldur', content:'Yazarak öğren'},
        //  {title: 'Artikel Tahmini', image:'/images/mobile/bg-work-artikel.jpg', url: '/mobile/exercise/artikel/list', description: 'der, die, das', content:'İsimlerin artikellerini bulmaya çalış.'},
      ]
    }
  },

  asyncData(context){
    context.store.commit("setHeaderBar", {title:"Egzersizler", prevUrl: "/mobile"})
  }
}
</script>

<style scoped>
</style>
