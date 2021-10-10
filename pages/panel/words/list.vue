<template>
<section>



</section>
</template>

<script>
export default {
  name: "list",
  layout: "panel",
  asyncData(context){
    return context.store.commit("panel/setContentHeader", {
      title: "Kelimeler",
      icon: 'fa fa-font',
      iconClass: 'bg-success text-light',
      buttons: [
        { label: 'Kelime Ekle', icon:'fas fa-plus', class:'btn btn-primary', href:'/panel/word/create' }
      ]
    }); // panel/setContentHeader

  }, //asyncData
}
</script>

<style scoped>

</style>
