<template>
<section class="w-100 h-100" id="asw">
  <div class="container-fluid p-0">
  <div class="row justify-content-center">
  <div class="p-0 col-12 col-sm-12 col-lg-10 pb-5">
    <Header/>
    <Nuxt/>
    <Navbar/>
    <NuxtLink to="/mobile/work" id="workFixButton" class="bg-success text-center text-light rounded-circle shadow-lg border-bottom border-dark"><i class="fas fa-dumbbell"></i></NuxtLink>
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
