<template>
  <div class="row">
    <div class="col-12 px-0 clearfix" id="headTitleSection">
      <h4 class="m-0 text-dark d-inline mr-auto"><span class="p-1 pl-2 pr-2 rounded text-center" :class="item.iconClass || 'bg-dark text-light'"><i :class="item.icon || 'fa fa-chevron-right'"></i></span> {{ item.title }}</h4>
      <NuxtLink
        v-for="(button, index) in item.buttons"
        :key="index"
        :to="button.href"
        :target="(button.target || '_self')"
        :class="(button.class || 'btn btn-primary')+' btn-sm float-right ml-2'"><em v-if="button.icon" :class="button.icon"></em> {{ button.label }}</NuxtLink>
      <hr>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeadSection",
  props: {
    item: Object
  }
}
</script>

<style scoped>
</style>
