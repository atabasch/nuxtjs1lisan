<template>
  <section>
    <Navbar/>
    <div class="container-fluid" id="outerWrap">
      <div class="row">
        <aside id="sidebarMenu" class="col-md-2 col-lg-1 d-md-block bg-light sidebar collapse p-0">
          <Sidebar />
        </aside>
        <main id="wrap" class="col-md-10 col-lg-11 ml-sm-auto pt-3 pb-4 px-md-4 pb-3aad justify-content-center">
          <HeadSection :item="this.$store.getters['panel/getContentHeader']"/>
          <Nuxt/>
        </main>
      </div>
    </div>
  </section>
</template>

<script>
import Navbar from "~/components/panel/Navbar";
import Sidebar from "~/components/panel/Sidebar";
import HeadSection from "~/components/panel/HeadSection";
export default {
  name: "panel",
  components: {
    Navbar,
    Sidebar,
    HeadSection
  },
  head(){ return {
    title: "1 Lisan Yönetim Paneli",
    meta: [
      { name: "robots", content: "noindex, nofollow, noimageindex, nosnippet" },
      { name: "description", content: "1 Lisan Yönetici Paneli" },
    ],
    link: [
      {rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700;1,900&family=Titillium+Web:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap"},
      {rel: "stylesheet", href: "/summernote/summernote-bs4.min.css"},
      {rel: "stylesheet", href: "/admin/style.css"},
    ],
    script: [
      {src: "//cdn.jsdelivr.net/npm/sweetalert2@11", mode: "client"},
      {src: "/summernote/summernote-bs4.min.js", mode: "client"},
      {src: "/js/speakingurl.min.js", mode: "client"},
      {src: "/admin/custom.js", mode: "client"},
      //{src: "/admin/vjscript.js", mode: "client"},
    ],
    bodyAttrs: {
      class: "bg-white pt-5"
    }
  } }
}
</script>

<style scoped>
#sidebarMenu{
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}
</style>
