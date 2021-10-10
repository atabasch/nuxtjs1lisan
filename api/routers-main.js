import {response} from "express";

const router = require("express").Router();
const slugify = require('slugify')
import fetch from 'node-fetch';
import db from "../db";

function getSelectedByDirectory(request){
  return ((request.session.langdir=='tr-de')? 'asw_words.word_translation AS original, asw_words.word_original AS translation' : 'asw_words.word_original AS original, asw_words.word_translation AS translation');
} // getSelectedByDirectory

router.post("/", (request, response) => {
  response.status(200).json({
  });
});


router.post("/work", async (request, response)=>{
  let whereNotIn = '';
  if(typeof request.cookies.correctWords != 'undefined'){
    let correctWords = await JSON.parse(request.cookies.correctWords);
    let correctWordsString = await correctWords.join(',');
    whereNotIn = `AND word_id NOT IN (${correctWordsString})`;
  }

  let selected = getSelectedByDirectory(request);
  let sqlWord = `SELECT *, ${selected} FROM asw_words WHERE word_status=1 ${whereNotIn} ORDER BY rand() DESC LIMIT 20`;
  db.query(sqlWord, (err, result, fields) => {
    if(err){      response.status(404).json( {err} );     }else{
      response.status(200).json( {words:result} );
    } //if(err)
  });

});




// SESSION İLE DİL DEĞİŞTİRMEK
router.post('/change-direction', async (request, response) => {
  if(typeof request.session.langdir == "undefined"){
    request.session.langdir = 'tr-de';
  }else{
    request.session.langdir = request.session.langdir=='tr-de'? 'de-tr' : 'tr-de' ;
  }
  response.status(200).json({langdir:request.session.langdir});
});



function translatePons(language='de', item, callback){
  let url = `https://api.pons.com/v1/dictionary?l=detr&in=${language}&q=${item}`;
  fetch(url, {
    headers: { 'X-Secret': 'ec501ec58ad6cd4ece81e4672479fcf7cfa0cac6eed8eff5aa49ed64200cb43c' }
  })
    .then(result => {
      return result.status==200? result.json() : {error:true, status:result.status} ;
    })
    .then(json => {
      callback(json);
    })
    .catch(err => { callback({error:true}) } );
} //translatePons

function clearOriginal(original){
  return original.replace(/^(das |der |die |Das |Der |Die )/g, '');
} //clearOriginal

router.post('/translate', async (request, response, next) => {
  let original = request.body.original;
  let from     = request.body.from;
  let to       = request.body.to;
  original     = await clearOriginal(original);
  original     = await slugify(original, {lower:true, locale: from, replacement:'+', strict: false});
  await translatePons(from, original, async function(datas){


    if(typeof datas.error != 'undefined'){
      response.json(datas);
    }else{

      let results = datas[0].hits[0].roms[0].arabs[0];
      let items = [];

     //await results.forEach((itemr, i) => {
     await results.translations.forEach(async (item, i) => {
       if(item.source.indexOf('headword')>=0){
         let source = item.source.match(/class="headword">(.*)<\//)[1];
         let sourceslug = await slugify(source, {lower:true, locale: from, replacement:'', strict: false});
         //if(sourceslug.indexOf(original)>=0){
         items.push(item.target);
         //}
       }
     });
     //});
     let headword = datas[0].hits[0].roms[0].headword;
     let wordclass = datas[0].hits[0].roms[0].wordclass;
     let headword_full = datas[0].hits[0].roms[0].headword_full;
     let genus = await headword_full.match(/(feminine|neuter|masculine){1}/g, '');

     let originalFull = headword;
     if(genus){
       let artikel = await genus[0].replace('feminine', 'die ').replace('neuter','das ').replace('masculine', 'der ');
       originalFull = artikel+headword;
     }
     response.status(200).json({ original, originalFull,
       from, to,
       //items,
       datas,
       headword,
       wordclass,
       headword_full,
       //results: datas[0].hits[0].roms[0].arabs,
       roms: datas[0].hits[0].roms
     });

    } // else


  });
}); //translate

module.exports = router;
