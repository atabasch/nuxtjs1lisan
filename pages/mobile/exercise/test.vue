<template>
  <div>
    <div class="row px-1 py-5">
      <div class="col-6 col-sm-6 col-lg-4 p-1 m-0" v-for="(item, index) in this.$store.getters['mobile/getMobileMainItems']" v-if="item.exercise">
        <section class="m-0 border shadow text-center bg-white text-blue jumbotron py-5 position-relative">
          <span><i class="fa-2x" :class="item.icon"></i></span>
          <h6>{{ item.label }}</h6>
          <NuxtLink :to="item.href" class="stretched-link"></NuxtLink>
        </section>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "test",
  layout: 'mobile',
  created() {
    this.$store.commit("setHeaderBar", {title:'Test Çözerek Almanca Çalış', prevUrl: '/mobile/exercise'});
    this.$store.commit("setHead", {title:"Test Çözerek Almanca Çalış", description: "1 Lisan ile Almanca egzersizleri yaparak hızlıca Almanca kelimeleri öğren."})
  },
  head(){
    return this.$store.getters.getHead;
  }
}
</script>

<style scoped>

</style>
