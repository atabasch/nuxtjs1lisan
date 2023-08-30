<template>
  <section :class="classValue">
      <div class="card shadow bg-white item-in">
        <div class="card-body p-2 pt-2 position-relative">
          <span class="wordCount">{{ item.word_count }} kelime</span>
          <h3 class="m-0">{{ item.tax_name }}</h3><hr>
          <p>{{ getDescription }}</p>
          <NuxtLink :to="url" class="stretched-link"></NuxtLink>
        </div>

        <div class="card-footer row p-0">
          <div class="col p-0 btn-group">
            <NuxtLink class="btn btn-primary btn-block py-3 px-1 m-0" :to="`${url}?work=true`"><em class="fas fa-question"></em> Tahmin</NuxtLink>
            <NuxtLink class="btn btn-success btn-block py-3 px-1 m-0" :to="`${url.replace('words', 'exercise')}-test`"><em class="fas fa-check"></em> Test</NuxtLink>
          </div>
        </div>
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
  },
  computed: {
    getDescription(){
      try {
        return JSON.parse(this.item.tax_datas).description;
      } catch (error) {
        return ''; // Veya uygun bir varsayılan değer
      }
    }
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
  font-size: 0.8rem;
  line-height: 1rem;
  height:  2rem;
  margin: 0;
  padding: 0;
}
</style>
