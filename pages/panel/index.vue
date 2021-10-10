<template>
<section>

  <div class="row">
    <div class="text-center text-sm-left col-6 col-sm-3 p-3" v-for="item in getCounters">
      <div class="bg-white shadow-lg p-4 rounded d-block d-sm-flex">
        <div class="mr-3 text-center p-3 rounded" :class="item.iconClass" style="font-size:1.3rem"><i :class="item.icon"></i></div>
        <div>
          <span class="text-secondary">{{ item.title }}</span>
          <h3 class="text-dark m-0 p-0 font-weight-bold">{{ item.content }}</h3>
        </div>
      </div>
    </div>
  </div>

  <div class="row mt-3">
    <div class="col-sm-8 p-1">
      <div class="card">
        <div class="card-header p-3"><h5 class="card-title m-0 text-dark">Son Makaleler</h5></div>
        <div class="card-body p-0">

          <div class="table-responsive">
            <table class="table table-striped table-hovered m-0 border-white">
              <thead>
              <tr>
                <th>#</th>
                <th>Başlık</th>
                <th width="20">Durum</th>
              </tr>
              </thead>
              <tbody>


              <tr v-for="(item, index) in posts" :key="index">
                <td>{{ item.post_id }}</td>
                <td><NuxtLink :to="`/panel/article/${item.post_id}/edit`" class="text-dark font-weight-bold">{{ item.post_title }}</NuxtLink></td>
                <td>
                  <span v-if="item.post_status=='publish'" class="badge d-block badge-success">Yayında</span>
                  <span v-if="item.post_status=='draft'" class="badge d-block badge-warning">Taslak</span>
                  <span v-if="item.post_status=='trash'" class="badge d-block badge-danger">Çöp</span>
                </td>
              </tr>

              </tbody>
            </table>
            </div>

        </div><!-- .card-body-->

        <div class="card-footer clearfix bg-white  border-top">
          <a href="/admin/article/list" class="btn btn-dark btn-sm float-left">Tüm Yazılar</a>
          <a href="/admin/article/create" class="btn btn-primary btn-sm float-right"><i class="fas fa-plus"></i> Makale Yaz</a>
        </div>

      </div><!-- card -->
    </div><!-- .col-sm-8 -->
  </div><!-- .row -->

</section>
</template>

<script>
export default {
  name: "index",
  layout: "panel",
  asyncData(context){
    let contentHeader = {
      title: "1 Lisan Panel",
      icon: 'fa fa-tachometer-alt',
      iconClass: 'bg-primary text-light',
      buttons: [ { label: "Siteyi Önizle",  href: '/',  class: 'btn btn-info',  icon: 'fas fa-eye',  target: '_blank' } ]
    };
    context.store.commit('panel/setContentHeader', contentHeader);
    return context.$axios.post("/panel/dashboard").then(response => {
      if(response.status==200){
        return response.data
      }
    })
  }, //asyncData

  computed:{

    getCounters:function(){

      return [
        { title: 'Yayımlanmış Makale',  content: this.counters.blog,      icon: 'fas fa-quote-right',   iconClass:'bg-info text-white' },
        { title: 'Medya Dosyaları',     content: this.counters.media,     icon: 'fas fa-photo-video',   iconClass:'bg-danger text-white' },
        { title: 'Kayıtlı Kullanıcı',   content: this.counters.users,     icon: 'fas fa-users',         iconClass:'bg-success text-white' },
        { title: 'Yorumlar',            content: this.counters.comments,  icon: 'fas fa-comments',      iconClass:'bg-warning text-white' },
      ]
    }, // getCOunters

  }
}
</script>

<style scoped>

</style>
