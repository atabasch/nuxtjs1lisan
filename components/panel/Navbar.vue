<template>
  <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow" style="height:50px;">
    <NuxtLink to="/panel" class="navbar-brand col-9 col-md-2 col-lg-1 mr-0 py-0 px-3 bg-black" style="background:rgba(0,0,0,0.25); height:100%; line-height:50px;"><strong>1 Lisan</strong></NuxtLink>
    <button class="navbar-toggler d-md-none mx-auto collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="w-100 d-none d-md-block"></div>
    <ul class="navbar-nav px-3 d-none d-md-block">
      <li class="nav-item" style="min-width:60px;"><a href="/panel/logout" class="nav-link  ml-auto fas fa-door-open">Çıkış</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped>

</style>
