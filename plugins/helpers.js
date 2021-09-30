export const upgradeWordsForList = function (words){
  words.forEach(async (item, index) => {
    let word = item;
    let datas = JSON.parse(word.word_datas);
    if(typeof datas.sentences != 'undefined'){
      if(datas.sentences.length > 0){
        let randomSnt = datas.sentences[Math.floor((Math.random()*datas.sentences.length))];
        word.sentence = (Object.keys(randomSnt).indexOf('original')<0)? {original:'', translation:''} : randomSnt;
      }else{
        word.sentence = {original:'', translation:''};
      }
    }else{
      word.sentence = {original:'', translation:''};
    }
    word.perfekt = (typeof datas.perfekt == 'undefined')? null : datas.perfekt;
    word.conjugations = (typeof datas.conjugations == 'undefined')? null : datas.conjugations.map((item, i) => { return `<div class="col-6 py-0 px-1" style="font-size:0.90rem; line-height: 0.95rem;">${item}</div>`; }).join('');

    word.original = (word.original.indexOf('+')<0)? word.original : '<span class="text-dark">'+word.original.replace('+', '</span>');
    word.translation = (word.translation.indexOf('+')<0)? word.translation : '<span class="text-dark">'+word.translation.replace('+', '</span>');
    words[index] = word;
  });//foreach
  return words;
}//


export const arrayShuffle = function(array) {
  return array.sort(() => Math.random() - 0.5);
}
