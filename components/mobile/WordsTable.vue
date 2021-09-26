<template>
  <table class="table table-bordered table-hovered table-striped table-sm bg-white">
    <thead>
    <tr>
      <th width="20">#</th>
      <th>Orjinal</th>
      <th>Çeviri</th>
    </tr>
    </thead>

    <tbody>

    <tr v-for="(item, index) in words">
      <td>{{ index+1 }}</td>
      <td v-html="item.original"></td>
      <td v-html="item.translation"></td>
    </tr>

    </tbody>
  </table>
</template>

<script>
export default {
  name: "WordTable",
  props:{
    words: Object
  }
}
</script>

<style scoped>

</style>
