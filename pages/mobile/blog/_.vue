<template>
  <div id="blogPost" class="p-2 pt-3 mt-4">
    <div class="row justify-content-center">
      <div class="col-12 col-md-9 col-lg-8 p-0">


        <section class="mt-3 mb-3">
          <figure class="m-0" v-if="post.post_cover.length>10"><img :src="'/uploads/'+post.post_cove" class="card-img-top" :alt="post.post_title"></figure>
          <header class="bg-white p-2"><h1 class="m-0">{{ post.post_title }}</h1><hr class="mb-0"/></header>
          <article class="bg-white p-2" v-html="post.post_content"></article>
        </section>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "_.vue",
  layout: "mobile",

  asyncData(context){
    let params = context.params.pathMatch.split("/");
    if(typeof params[1] == "undefined" || typeof params[2] != "undefined"){
      context.redirect("/mobile/blog");
    }else{
      return context.$axios.post(`/blog/${params[0]}/${params[1]}`).then(response => {
        context.store.commit("setHeaderBar", {title:response.data.post.post_title, prevUrl:"/mobile/blog"})
        return {
          ...response.data
        }
      });
    }
  }, // asyncData

}
</script>

<style scoped>

</style>
