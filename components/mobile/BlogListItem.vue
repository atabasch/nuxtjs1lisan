<template>
  <article class="mt-3 mb-3">
    <div class="card border-0 rounded shadow">
      <NuxtLink :to="`/mobile/blog/${item.post_seflink}/${item.post_id}`" v-if="item.post_cover.length>10"><img :src="'/uploads/'+item.post_cover" class="card-img-top rounded" :alt="item.post_title"></NuxtLink>
      <div class="card-body">
        <h5 class="card-title"><NuxtLink :to="`/mobile/blog/${item.post_seflink}/${item.post_id}`" class="text-dark">{{ item.post_title }}</NuxtLink></h5>
        <p class="card-text" v-html="item.post_description"></p>
        <NuxtLink :to="`/mobile/blog/${item.post_seflink}/${item.post_id}`" class="btn btn-primary rounded"><i class="fas fa-eye"></i> Görüntüle</NuxtLink>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "BlogListItem",
  props: {
    item: Object
  }
}
</script>

<style scoped>

</style>
