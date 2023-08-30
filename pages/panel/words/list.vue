<template>
<section class="row">
  <div class="col-12"></div>
  <div class="col-sm-5 border-right">
    <WordForm :title="'Kelime Ekle'" v-if="!word"  @wordCreated="updateWordInList($event, false)" @changedOriginal="searchedValue=$event"/>
    <WordForm :title="'Kelime Düzenle'" v-else :word="word"  @wordUpdated="updateWordInList($event, true)" @changedOriginal="searchedValue=$event"/>
  </div>

  <div class="col">
    <div class="form-inline clearfix">
      <h4>Kelime Listesi {{ searchedValue }}</h4>
      <div class="form-group ml-auto pb-1"><input type="search" class="form-control form-control-sm" placeholder="Listede ara" v-model="searchedValue"></div></div>
    <div class="table-responsive asw-table">
      <table class="table table-striped table-bordered table-hover border">
        <thead>
        <tr>
          <th width="25">#</th>
          <th>Kelime</th>
          <th>Çeviri</th>
          <th>Sınıf</th>
          <th width="25"></th>
          <th width="25"></th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="(item, index) in items"
            :id="'item-tr-'+item.word_id"
            v-show="((item.word_original.replace(/[\+,]/g, '')+' '+item.word_translation).toLowerCase()).search(searchedValue.toLowerCase())>=0">
          <td>{{ item.word_id }}</td>
          <td>{{ item.word_original.replace('+', '') }}</td>
          <td>{{ item.word_translation }}</td>
          <td>{{ item.tax_name }}</td>
          <td>
            <button @click="editWord(item, index)" class="btn btn-warning" style="height:20px; padding: 0px 7px; line-height:18px;"><em class="fas fa-edit fa-xs"></em></button>
          </td>
          <td>
            <button class="btn btn-danger" @click="deleteWord(item,index)" style="height:20px; padding: 0px 7px; line-height:18px;"><em class="fas fa-trash fa-xs"></em></button>
          </td>
        </tr>

        </tbody>
      </table>
    </div>
  </div>


</section>
</template>

<script>
import WordForm from "~/components/panel/WordForm";
export default {
  name: "list",
  layout: "panel",
  components: {WordForm},
  data(){ return {
    word:null,
    searchedValue: "",
    currentIndex: 0,
  } },
  asyncData(context){
    context.store.commit("panel/setContentHeader", {
      title: "Kelimeler",
      icon: 'fa fa-font',
      iconClass: 'bg-success text-light',
      buttons: [
        { label: 'Kelime Ekle', icon:'fas fa-plus', class:'btn btn-primary', href:'/panel/words/create' }
      ]
    }); // panel/setContentHeader



    return context.$axios.post("/panel/words/list")
      .then(response => {
        if(response.status!=200){
          return { items: [] }
        }else{
          return response.data;
        }
      })
  }, //asyncData

  methods: {
    updateWordInList:function(word, isUpdate){
      if(!isUpdate){
        this.items.unshift(word);
      }else{
        this.items[this.currentIndex] = word;
      }
      this.currentIndex=0;
    },

    deleteWord:function(word, index){
      let context = this;
      const swalWithBootstrapButtons = Swal.mixin({customClass: { confirmButton: 'btn btn-success mr-2',  cancelButton: 'btn btn-danger' }, buttonsStyling: false });
      swalWithBootstrapButtons.fire({
        title: 'Emin misiniz?',
        text: `"${word.word_original}" silinecek!. Bu işlemi yapmak istediğinizden emin misiz? İşlem bir daha geri alınamaz.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Evet, Eminin!',
        cancelButtonText: 'Hayır, Vazgeç!',
        //reverseButtons: true
      }).then((result) => {
          if(result.value){
            context.$axios.post('/panel/words/delete', {word:word}).then(result=>{
              if(result.status==200){
                context.items.splice(index, 1);
              }
            }); //axios
          } //if
        }); //then

    }, //deleteWord

    editWord:function(word, index){
      this.currentIndex = index;
      let context = this;
      this.$axios.post("/panel/words/get", {id:word.word_id})
        .catch(error=>{ console.log(error) })
        .then(response=>{
          let word = {
            ...response.data.word,
            word_categories: JSON.parse(response.data.word.word_categories),
            word_datas: JSON.parse(response.data.word.word_datas),
          }
          word.word_datas.conjugations = word.word_datas.conjugations.join("\n");
          context.word = word;
        })

    }, //editWord

  }, // methods
}
</script>

<style scoped>

</style>
