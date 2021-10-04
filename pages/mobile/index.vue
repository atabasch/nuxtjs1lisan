<template>
  <div>
    <div class="row px-1" id="mainApp">
      <div class="col-6 col-sm-6 col-lg-4 p-1 m-0" v-for="(item, index) in this.$store.getters['mobile/getMobileMainItems']">
        <section class="m-0 border shadow text-center bg-white text-blue jumbotron py-5 position-relative">
          <span><i class="fa-2x" :class="item.icon"></i></span>
          <h6>{{ item.label }}</h6>
          <NuxtLink :to="item.href" class="stretched-link"></NuxtLink>
        </section>
      </div>
    </div>
    <NuxtLink to="/mobile/work" id="workFixButton" class="bg-success text-center text-light rounded-circle shadow-lg border-bottom border-dark"><i class="fas fa-dumbbell"></i></NuxtLink>
  </div>
</template>

<script>
export default {
  name: "index",
  layout: 'mobile',
  created() {
    this.$store.commit("setHeaderBar", null);
    this.$store.commit("setHead", {title:"1 Lisan Almanca Egzersizleri", description: "1 Lisan ile Almanca egzersizleri yaparak hızlıca Almanca kelimeleri öğren."})
  },
  head(){
    return this.$store.getters.getHead;
  }
}
</script>

<style scoped>

</style>
