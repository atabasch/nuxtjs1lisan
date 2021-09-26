<template>
  <div>
    <div class="row px-1" id="mainApp">
      <div class="col-6 col-sm-6 col-lg-4 p-1 m-0" v-for="(item, index) in this.$store.getters['mobile/getMobileMainItems']">
        <section class="m-0 border shadow text-center bg-white text-blue jumbotron py-4 position-relative">
          <span><i class="fa-2x" :class="item.icon"></i></span>
          <h6>{{ item.label }}</h6>
          <a :href="item.href" class="stretched-link"></a>
        </section>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "index",
  layout: 'mobile',
}
</script>

<style scoped>

</style>
