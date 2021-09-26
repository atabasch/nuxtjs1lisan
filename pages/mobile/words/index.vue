<template>
  <section class="mt-5">
    <div class="row">
      <div class="col-4 col-sm-3 p-2" v-for="i in getTotalPage">
        <a :href="'/mobile/words/'+Math.floor(totalWord/totalPage*i-14)+'/list'" class="btn bg-white btn-block py-5 text-center border">
          <strong>Liste {{ i }}</strong> <br>
          <small><em>({{ Math.floor(totalWord/totalPage*i-14) }}..{{ Math.floor(totalWord/totalPage*i) }})</em></small>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "index",
  layout:'mobile',

  data(){return {
    totalPage:0,
    totalWord:0
    }},

  asyncData(context){
    return context.$axios.get('/words/count')
      .then( response => {
        return {
          totalWord:response.data.count,
          totalPage: Math.floor((response.data.count / 15))
        }
      } );
  },

  created(){
    this.$store.commit("setHeaderBar", {title:"Kelime Listeleri", prevUrl: '/mobile'});
  },


  computed: {
    getTotalPage(){
      return this.totalPage;
    }
  },

}
</script>

<style scoped>
a:hover{ border-color: #0E4C75 !important; }
</style>
