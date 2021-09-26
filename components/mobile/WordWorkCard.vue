<template>

    <div class="bg-white border rounded text-center p-1 pt position-absolute" style="width: calc(100% - 20px); height: 580px;" >
      <div class="row h-100">
        <div class="col-12">
          <h3 class="text-secondary" v-if="!showWord" v-html="word.original"></h3>
          <h3 class="text-secondary" v-if="showWord" v-html="word.translation"></h3>
          <hr>
        </div>

        <div class="col-12">
          <h6>Örnek Cümle</h6>
          <p :class="{invisible:!showWord}" v-show="!showSentence" @click="showSentence = !showSentence">{{ word.sentence.original }}</p>
          <p :class="{invisible:!showWord}" v-show="showSentence" @click="showSentence = !showSentence">{{ word.sentence.translation }}</p>
          <hr>
        </div>

        <div class="col-12">
          <h6>{{ !word.perfekt? ' ' : 'Geçmiş Zaman' }}</h6>
          <p></p>
          <p v-show="!showPerfekt" @click="showPerfekt=true"><i class="fas fa-eye-slash"></i></p>
          <p v-show="showPerfekt">{{ word.perfekt }}</p>
          <hr>
        </div>

        <div class="col-12">
          <h6>{{ !word.conjugations? ' ' : 'Çekimler' }}</h6>
          <div class="row text-left" style="height:45px;" :class="{invisible: !showConjugations}" v-html="word.conjugations">
            {{ word.conjugations }}
          </div>
          <!-- <p :data-target="'showConjugations-'+word.word_id" class="text-left m-0 pl-5 invisible" style="line-height:17px; height:102px; font-size:15px;" v-html="word.conjugations"></p> -->
        </div>


        <div class="col-12 align-self-end p-0">
          <div class="row p-0">

            <div class="col-3 p-1">
              <button type="button"
                      :disabled="!word.conjugations"
                      @click="showConjugations=!showConjugations"
                      class="btn btn-dark btn-block rounded text-center"><i class="fas fa-list-ul"></i><div><small>Çekimler</small></div></button>
            </div>

            <div class="col-3 p-1">
              <button type="button"
                      :disabled="!word.perfekt"
                      @click="showPerfekt=!showPerfekt"
                      class="btn btn-warning btn-block rounded text-center"><i class="fas fa-history"></i><div><small>G.Zaman</small></div></button>
            </div>

            <div class="col-6 p-1" v-if="!showWord">
              <button type="button"
                      @click="showWord=true"
                      class="btn btn-info btn-block rounded text-center"><i class="fas fa-eye"></i><div><small>Göster</small></div></button>
            </div>

            <div class="col-3 p-1" v-if="showWord">
              <button type="button"
                      @click="nextCard"
                      class="btn btn-danger btn-block rounded text-center"><i class="fas fa-times"></i><div><small>Yanlış</small></div></button>
            </div>

            <div class="col-3 p-1" v-if="showWord">
              <button type="button"
                      @click="nextCard"
                      class="btn btn-success btn-block rounded text-center"><i class="fas fa-check"></i><div><small>Doğru</small></div></button>
            </div>
          </div><!-- row p-0 -->
        </div><!-- col-12 align-self-end -->
      </div>
    </div>
</template>

<script>
export default {
  name: "WordWorkCard",

  props: {
    word:Object,
    nextCard: Function
  },

  data(){
    return {
      showWord:false,
      showSentence:false,
      showConjugations:false,
      showPerfekt: false,
      sentences: {},
      finished: [],
      showedIndex: 0,
      percent: 10
    }
  },

  created() {
    console.log(this.sonraki)
  },

  methods: {

  } // methods
}
</script>

<style scoped>

</style>
