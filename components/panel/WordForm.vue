<template>
<section>
  <button type="button" class=" d-sm-none btn btn-outline-primary btn-block mb-2" data-toggle="collapse" data-target="#postForm" aria-expanded="false" aria-controls="postForm">Formu Aç/Kapat</button>
  <div class="<%= collapseClass %> border-bottom mb-2" id="postForm">
    <h4>{{ title }}</h4>
    <form @submit.prevent="postForm((typeof word.word_id!='undefined'))" ref="form">

      <div class="form-group row mb-1">
        <div class="col-lg-6 py-0 pr-lg-1">
          <fieldset class="aswflin">
            <legend>Kelime:</legend>
            <input type="text" placeholder="Kelime" @input="changedOriginal" name="original"  required autofocus v-model="word.word_original">
          </fieldset>
        </div>
        <div class="col-lg-6 py-0 pl-lg-1">
          <fieldset class="aswflin">
            <legend>Çeviri:</legend>
            <input type="text" placeholder="Çeviri" name="translation" v-model="word.word_translation" required>
          </fieldset>
        </div>
      </div>



      <div class="form-group row mb-1">
        <div class="col-lg-6 py-0 pr-lg-1">
          <fieldset class="aswflin"><legend>Telaffuz:</legend>
            <input type="text" placeholder="Telaffuz" name="pronunciation" v-model="word.word_datas.pronunciation">
          </fieldset>
        </div>
        <div class="col-lg-6 py-0 pl-lg-1">
          <fieldset class="aswflin"><legend>Geçmiş Zaman:</legend>
            <input type="text" placeholder="Geçmiş zaman değişimi" name="perfekt" v-model="word.word_datas.perfekt">
          </fieldset>
        </div>
      </div>



      <div class="form-group row mb-1">
        <div class="col-sm-12 py-0">
          <fieldset class="aswflin"><legend>Sınıf:</legend>
            <div class="row px-2 py-1">
              <label class="col-2 text-left" v-for="(item, index) in taxonomies.word_type">
                <input type="radio" name="type" v-model="word.word_type" :data-slug="item.tax_slug" :value="item.tax_id" :checked="word.word_type==item.tax_id"> {{ item.tax_name }}</label>
            </div>
          </fieldset>
        </div>
      </div>




      <div class="form-group row mb-1">
        <div class="col-sm-12 py-0">
          <fieldset class="aswflin"><legend>Kategoriler:</legend>
            <div class="clearfix miniSelectList">
              <div v-for="(item, index) in taxonomies.word_category">
                <label :for="'cb-'+index">
                  <input type="checkbox" :checked="word.word_categories.find((v,i) => v==item.tax_id)" v-model="word.word_categories" name="categories" :value="item.tax_id" :id="'cb-'+index">
                  <span>{{ item.tax_name }}</span>
                </label>
              </div>
            </div>
          </fieldset>
        </div>
      </div>

      <hr class="mb-2 mt-3">


      <div id="formSentences" ref="formSentences" class="form-group row mb-1">

        <div ref="sentenceBoxes" class="col-12 row p-0 m-0 " v-for="(item, index) in word.word_datas.sentences">
          <div class="col-lg-6 py-0 pr-lg-1">
            <fieldset class="aswflin"><legend>Örnek Cümle:</legend>
              <input type="text" placeholder="Orjinal cümle" name="sentence" v-model="item.original">
            </fieldset>
          </div>
          <div class="col-lg-6 py-0 pl-lg-1">
            <fieldset class="aswflin"><legend>Cümle Çeviri:</legend>
              <input type="text" placeholder="Cümlenin çevirisi" name="sentence_translation"  v-model="item.translation">
            </fieldset>
          </div>
        </div>

      </div><!-- formSentences -->

      <div class="form-group text-right">
        <h6 class="d-inline m-0">Örnek Cümle Ekle </h6><button class="btn btn-success btn-sm" type="button" @click="newSentence"><i class="fas fa-plus"></i></button>
      </div>

      <hr class="mb-2 mt-3">
      <div class="form-group row mb-1">
        <div class="col-sm-12 py-0">
          <fieldset class="aswflin">
            <legend role="button" data-toggle="collapse" data-target="#desc" aria-expanded="false" aria-controls="desc">Açıklama: (Tıkla Aç/Kapat)</legend>
            <div  id="desc" class="collapse" :class="{show: word.word_datas.description.length>0}">
              <textarea name="description" rows="5" placeholder="Bir açıklamaya ihtiyacı varsa buraya yazın" v-model="word.word_datas.description"></textarea>
            </div>
          </fieldset>
        </div>
      </div>
      <hr class="mb-2 mt-3">
      <div class="form-group row mb-1">
        <div class="col-sm-12 py-0">
          <fieldset class="aswflin">
            <legend role="button" data-toggle="collapse" data-target="#conjugations" aria-expanded="false" aria-controls="conjugations">Fiil Çekimleri: (Tıkla Aç/Kapat)</legend>
            <div id="conjugations" class="collapse" :class="{show: word.word_datas.conjugations.length>0}">
              <textarea name="conjugations" rows="8" placeholder="Fiil çekimlerini her satıra sadece 1 adet olacak şekilde yazın." v-model="word.word_datas.conjugations"></textarea>
              <small><um>Fiil çekimlerini her satıra sadece 1 adet olacak şekilde yazın.</um></small>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="form-group">
        <button v-if="!word.word_id" class="btn btn-primary btn-sm" type="submit"><i class="fas fa-check"></i> Ekle</button>
        <button v-if="word.word_id" class="btn btn-success btn-sm" type="submit"><i class="fas fa-check"></i> Güncelle</button>
        <button v-if="word.word_id" @click="cancelEdit" type="button" class="btn btn-danger btn-sm"><i class="fas fa-chevron-left"></i> Vazgeç</button>
      </div>

    </form>
  </div>
</section>
</template>

<script>
export default {
  name: "WordForm",
  props: {
    title: String,
    word: { type: Object,
            required: false,
            default: function(){ return {  word_original: "",  word_translation: "", word_type: null, word_categories: [], word_status: 1,
              word_datas: {   pronunciation: "",    perfekt: "",    sentences: [{original:"", translation:""}],     description: "",    conjugations: "",   }, }  } //default
        }, // word
  },

  data(){
    return {
      selected:   { word_category: [],  word_type: [] },
      taxonomies: { word_category: [],  word_type: [] }
    } //return
  }, //data

  fetch() {
    return this.$axios.post("/panel/taxonomy/get", {tax_type: ["word_type", "word_category"]})
      .then(result => { this.taxonomies =  result.data; })
      .catch(error=>{ console.log(error) });
  }, //asyncData

  methods:{
    setDefaultWord:function(){
        return {  word_original: "",  word_translation: "", word_type: null, word_categories: [], word_status: 1,
          word_datas: {   pronunciation: "",    perfekt: "",    sentences: [{original:"", translation:""}],     description: "",    conjugations: "",   }, } //return
    },
    newSentence:function(){
      this.word.word_datas.sentences.push({original:"", translation:""})
    }, // newSentence

    postForm:function(isUpdate){
      if(this.word.word_original.length>2 && this.word.word_translation.length>2 && this.word.word_type>0){
        let postDatas = Object.assign({}, this.word);
        let axiosUrl = !isUpdate? '/panel/words/create' : '/panel/words/update'
        postDatas.word_datas.conjugations = postDatas.word_datas.conjugations.replace(/\r/g, '').split('\n');

        this.$axios.post(axiosUrl, {datas: postDatas})
          .catch(error=>{ console.log(error) })
          .then(result=>{

            if(result.data.affectedRows>0){
              if(!isUpdate){
                this.$emit("wordCreated", {...postDatas, word_id:result.data.insertId});
              }else{
                this.$emit("wordUpdated", result.data.word);
              }
              this.$refs.form.reset();
              this.$emit('changedOriginal', "");
            }
          });
      } // if validate
    }, //postForm

    changedOriginal:function(){
      this.$emit('changedOriginal', this.word.word_original);
      if(this.word.word_original.indexOf('babla')>=0){
        this.$axios.post('/panel/bot/get-word-data', {word:this.word.word_original})
        .catch(error => {
          console.log(error)
        })
        .then(result => {
          // Kelime Çevirisi Geldi
        });
      }
    }, //changedOriginal

    cancelEdit:function(){
      this.$refs.form.reset();
      this.word = this.setDefaultWord();
      this.$emit('changedOriginal', "");
    }

  }, // methods
}
</script>

<style scoped>

</style>
