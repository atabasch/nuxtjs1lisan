<template>
<section class="container-fluid">
<div class="row justify-content-center align-items-center">
        <Nuxt/>
</div>
</section>
</template>

<script>
export default {
  name: "login",
  head(){ return {
    title: "1 Lisan Yönetim Paneli",
    meta: [
      { name: "robots", content: "noindex, nofollow, noimageindex, nosnippet" },
      { name: "description", content: "Panel Girişi" },
    ],
    link: [
      {rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700;1,900&family=Titillium+Web:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap"},
      {rel: "stylesheet", href: "/summernote/summernote-bs4.min.css"},
      {rel: "stylesheet", href: "/admin/style.css"},
    ],
    script: [

    ],
    bodyAttrs: {
      class: "bg-white pt-5",
      style: "background: black url('/images/login-bg.jpg') center no-repeat; background-size: cover;"
    }
  } }, // head
}
</script>

<style scoped>
.container-fluid, .row{ height: 100%; }
</style>
