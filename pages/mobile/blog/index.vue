<template>
  <div id="blogPosts" class="p-2 pt-3 mt-4">
    <div class="row justify-content-center">
      <div class="col-12 col-md-9 col-lg-8 p-0">
        <BlogListItem v-for="(post, index) in posts" :item="post" :key="index"></BlogListItem>
      </div>
    </div>

  </div>
</template>

<script>
import BlogListItem from "~/components/mobile/BlogListItem";
export default {
  name: "blog",
  components: {BlogListItem},
  layout: "mobile",

  asyncData(context){
    context.store.commit("setHeaderBar", {title: "1 Lisan Blog", prevUrl: "/mobile"});
    return context.$axios.post('/blog').then(response => {
      return {
        ...response.data
      }
    });
  }, //asyncData
}
</script>

<style scoped>

</style>
