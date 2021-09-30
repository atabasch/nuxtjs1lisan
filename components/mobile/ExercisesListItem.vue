<template>
  <section :class="classValue">
    <div class="shadow bg-white item-in">
      <img :src="item.image" :alt="item.title" class="card-img-top"/>
      <div class="media-body p-2 pt-2">
        <span class="wordCount">{{ item.description }}</span>
        <h3 class="m-0">{{ item.title }}</h3><hr>
        <p>{{ item.content }}</p>
      </div>
      <NuxtLink :to="item.url" class="stretched-link"></NuxtLink>
    </div>
  </section>
</template>

<script>
export default {
  name: "ExercisesListItem",
  props: {
    item: Object,
    classValue: String,
    url: String
  }
}
</script>

<style scoped>
.item-in{
  position: relative;
  text-align: center;
}
.wordCount{
  top:0;
  font-size: 14px;
  line-height: 18px;
  padding: 5px 10px;
  font-weight: 500;
  color: red;
}

h3{
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}
p{
  font-size: 0.9rem;
  line-height: 1.2rem;
  height: 3rem;
  margin: 0;
  padding: 0;
}
</style>
