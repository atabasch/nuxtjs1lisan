<template>

  <div class="bg-white border rounded text-center p-1 pt position-absolute workCard" >
    <div class="row h-100">
      <div class="col-12">
        <h3 class="text-secondary" v-html="word.original"></h3>
        <h3 class="text-primary" :class="{invisible:!showWord}" v-html="word.translation"></h3>
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



      <div class="col-12 align-self-end p-0">
          <button class="btn btn-block btn-lg btn-dark" :disabled="answerDisabled" @click="checkSelected" v-for="answer in answers" :value="answer">{{ answer }}</button>
      </div><!-- col-12 align-self- end -->
    </div>
  </div>
</template>

<script>
import {arrayShuffle} from "~/plugins/helpers";
export default {
  name: "WordTestCard",

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
      percent: 10,
      answerDisabled: false,
      answers: []
    }
  },

  created() {
    this.answers = arrayShuffle(JSON.parse(this.word.answers));
  },

  methods: {
    checkSelected(el){
      this.answerDisabled=true;
      console.log(el)
      if(el.target.value==this.word.translation){
         el.target.classList.replace('btn-dark', 'btn-success');
      }else{
         el.target.classList.replace('btn-dark', 'btn-danger');
      }
      this.showSentence = true;
      this.showWord = true;
      this.showPerfekt = true;
      setTimeout(this.nextCard, 1000);
    },
  } // methods
}
</script>

<style scoped>

</style>
