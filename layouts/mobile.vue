<template>
<section class="w-100 h-100" id="asw">
  <div class="container-fluid p-0">
  <div class="row justify-content-center">
  <div class="p-0 col-12 col-sm-12 col-lg-10 pb-5">
    <Header/>
    <Nuxt/>
    <Navbar/>
    <a href="/mobile/work" id="workFixButton" class="bg-success text-center text-light rounded-circle shadow-lg border-bottom border-dark"><i class="fas fa-dumbbell"></i></a>
  </div>
  </div>
  </div>
</section>
</template>

<script>
import Header from "~/components/mobile/Header"
import Navbar from "~/components/mobile/Navbar"
export default {
  name: "mobile",
  components: { Header, Navbar }
}
</script>

<style scoped>

</style>
