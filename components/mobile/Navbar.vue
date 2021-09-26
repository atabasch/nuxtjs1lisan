<template>
  <div id="bottomNav" class="container-fluid p-0 fixed-bottom">
    <div class="row justify-content-center">
      <div class="p-0 col-12 col-md-9 col-lg-7">

        <ul class="nav nav-pills nav-justified bg-light border-top">
          <li class="nav-item"><a href="/mobile" class="nav-link text-dark py-3"><i class="fa-lg fa fa-home"></i></a></li>
          <li class="nav-item"><a href="/mobile/packets" class="nav-link text-dark py-3"><i class="fa-lg fa fa-parachute-box"></i></a></li>
          <li class="nav-item"><a href="/mobile/exercise" class="nav-link text-dark py-3"><i class="fa-lg fa fa-brain"></i></a></li>
          <li class="nav-item"><a href="/mobile/translate" class="nav-link text-dark py-3"><i class="fa-lg fa fa-language"></i></a></li>
          <li class="nav-item">
            <a @click.prevent="changeDirection" class="nav-link text-white py-3 bg-danger"><span style="font-size: 0.7rem;">{{ this.$store.getters.getLangDir=='de-tr'? 'DE»TR' : 'TR»DE' }}</span></a>
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    changeDirection(){
      this.$store.dispatch('changeDirection')
    }
  }
}
</script>

<style scoped>

</style>
