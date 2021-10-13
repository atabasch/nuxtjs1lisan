<template>
  <div class="sidebar-sticky pt-3">
    <ul class="nav flex-column">
      <li class="nav-item"><NuxtLink to="/panel" class="nav-link"><i class="fas fa-tachometer-alt"></i> Başlangıç</NuxtLink></li>
    </ul>

    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-3 mb-1 text-muted"><span>Sözlük</span></h6>
    <ul class="nav flex-column">
      <li class="nav-item"><NuxtLink to="/panel/words/list" class="nav-link"><i class="fas fa-font"></i> Kelimeler</NuxtLink></li>
      <li class="nav-item"><NuxtLink to="/panel/sentence/list" class="nav-link"><i class="fas fa-comment-dots"></i> Cümleler</NuxtLink></li>
      <li class="nav-item"><NuxtLink to="/panel/package/list" class="nav-link"><i class="fas fa-gifts"></i> Paketler</NuxtLink></li>
      <li class="nav-item"><NuxtLink to="/panel/taxonomy/list" class="nav-link"><i class="fas fa-tags"></i> Etiketler</NuxtLink></li>
    </ul>

    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-3 mb-1 text-muted"><span>Metinsel</span></h6>
    <ul class="nav flex-column">
      <li class="nav-item"><NuxtLink to="/panel/page/list" class="nav-link"><i class="fas fa-file-alt"></i> Sayfalar</NuxtLink></li>
      <li class="nav-item"><NuxtLink to="/panel/article/list" class="nav-link"><i class="fas fa-book"></i> Yazılar</NuxtLink></li>
      <li class="nav-item"><NuxtLink to="/panel/category/list" class="nav-link"><i class="fas fa-stream"></i> Kategoriler</NuxtLink></li>
    </ul>

    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-3 mb-1 text-muted"><span>Sistem</span></h6>
    <ul class="nav flex-column">
      <li class="nav-item"><NuxtLink to="/panel/user/list" class="nav-link"><i class="fas fa-users"></i> Kullanıcılar</NuxtLink></li>
      <li class="nav-item"><NuxtLink to="/panel/media/list" class="nav-link"><i class="fas fa-photo-video"></i> Medya</NuxtLink></li>
    </ul>

    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-3 mb-1 text-muted"><span>Geri Bildirim</span></h6>
    <ul class="nav flex-column">
      <li class="nav-item"><NuxtLink to="/panel/comment/list" class="nav-link"><i class="fas fa-comments"></i> Yorumlar</NuxtLink></li>
      <li class="nav-item"><NuxtLink to="/panel/contact/list" class="nav-link"><i class="fas fa-envelope-open-text"></i> İletişim</NuxtLink></li>
    </ul>

    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-3 mb-1 text-muted"><span>Oturum</span></h6>
    <ul class="nav flex-column">
      <li class="nav-item"><a href="#" @click.prevent="logout" class="nav-link"><i class="fas fa-door-open"></i> Çıkış Yap</a></li>
    </ul>

  </div>
</template>

<script>
export default {
  name: "Sidebar",
  methods: {
    logout: function(){
      this.$store.dispatch("panel/logout", null);
    }
  }
}
</script>

<style scoped>

</style>
