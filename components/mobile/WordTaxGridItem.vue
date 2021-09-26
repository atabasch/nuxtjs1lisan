<template>
  <section :class="classValue">
      <div class="border shadow bg-white p-2 item-in">
        <div class="media-body p-1 pt-2">
          <span class="wordCount">{{ item.word_count }} kelime</span>
          <h3 class="m-0">{{ item.tax_name }}</h3><hr>
          <p>{{ JSON.parse(item.tax_datas).description }}</p>
        </div>
        <a :href="url" class="stretched-link"></a>
      </div>
  </section>
</template>

<script>
export default {
  name: "WordGridItem",
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
  height:150px;
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
  font-size: 0.8rem;
  line-height: 1rem;
  margin: 0;
  padding: 0;
}
</style>
