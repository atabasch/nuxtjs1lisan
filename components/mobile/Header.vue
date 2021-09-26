<template>
  <section>
  <div class="jumbotron bg-blue text-center mb-1 py-3" v-if="!this.$store.getters.getHeaderBar">
    <span class="d-inline-block bg-white text-blue px-3 py-4 shadow rounded-circle"><i class="fas fa-graduation-cap fa-2x"></i></span>
    <h4 class="text-light">1 Lisan Mobil</h4>
  </div>

  <div class="bg-blue py-1 px-2 clearfix fixed-top" v-else>
    <a :href="header.prevUrl" class="btn btn-sm text-light mr-2"><i class="fas fa-angle-left fa-2x "></i></a>
    <h1 style="font-size: 1rem" class="d-inline text-light">{{ header.title }}</h1>
  </div>
  </section>
</template>

<script>
export default {
  name: "Header",

  created(){
    this.header = this.$store.getters.getHeaderBar;
  }
}
</script>

<style scoped>

</style>
