<template>
  <section>
  <div class="jumbotron bg-blue text-center mb-1 py-3" v-if="!this.$store.getters.getHeaderBar">
    <div class="d-inline-block bg-white text-blue px-3 py-4 shadow rounded-circle"><em class="fas fa-graduation-cap fa-2x"></em></div>
    <h1 class="text-light">1 Lisan Mobil</h1>
  </div>

  <div class="bg-blue py-1 px-2 clearfix fixed-top" v-else>
    <NuxtLink :to="getHeaderBar.prevUrl" class="btn btn-sm text-light mr-2"><em class="fas fa-angle-left fa-2x "></em></NuxtLink>
    <h1 style="font-size: 1rem" class="d-inline text-light">{{ getHeaderBar.title }}</h1>
  </div>
  </section>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: "Header",

  created(){
    this.header = this.$store.getters.getHeaderBar;
  },

  computed: {
    ...mapGetters(["getHeaderBar"])
  }
}
</script>

<style scoped>

</style>
