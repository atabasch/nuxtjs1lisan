<template>
      <div class="progress mb-2" style="height:5px;">
        <div class="progress-bar progress-bar-striped bg-success" role="progressbar" :style="'width: '+percent+'%'" :aria-valuenow="percent" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
</template>

<script>
export default {
  name: "CardStatusProgressBar",
  props: {
    percent: Number
  }
}
</script>

<style scoped>

</style>
