const router = require("express").Router();
const db = require("../db");
import {arrayShuffle} from "../plugins/helpers";

function getSelectedByDirectory(request, preTable='asw_words'){
  return ((request.session.langdir=='tr-de')? `${preTable}.word_translation AS original, ${preTable}.word_original AS translation` : `${preTable}.word_original AS original, ${preTable}.word_translation AS translation`);
} // getSelectedByDirectory






function getSqlForTest(request, limit=15, extraSql='', extraInSql=''){
  let selected = getSelectedByDirectory(request, 'mt');
  let answersSelected = (request.session.langdir=='tr-de')? 'word_original' : 'word_translation';

  let sql = `SELECT mt.*, ${selected},
       (SELECT
             CONCAT('["', translation, '","',REPLACE(SUBSTRING_INDEX(GROUP_CONCAT(DISTINCT ${answersSelected} ORDER BY rand() SEPARATOR '#'), '#', 3), '#', '","'), '"]')
        as word_answers FROM asw_words WHERE word_id != mt.word_id ${extraInSql}) as answers
FROM asw_words as mt
WHERE mt.word_status=1
${extraSql}
LIMIT ${limit}`;
  return sql;
} //getSqlForTest







function getTestResultForPackage(request, response){
  let limit = request.query.limit || 15;
  let id = request.query.id || null;

  let sqlTaxonomy = `SELECT package_items, package_id as tax_id, package_name as tax_name, package_cover as tax_cover, package_datas as tax_datas, JSON_LENGTH(package_items) AS word_count FROM asw_packets WHERE package_status=1 AND package_id=${id} LIMIT 1`;
  db.query(sqlTaxonomy, (err, resultTaxonomy, fields)=>{
    let itemIds = JSON.parse(resultTaxonomy[0].package_items);
    let sql = getSqlForTest(request, limit, `AND mt.word_id IN (${itemIds}) ORDER BY rand()`, `AND word_id IN (${itemIds.join(',')}) `);
    db.query(sql, (err, result, fields)=>{
      if(err){ response.status(200).json(err); }else{
        response.status(200).json({taxonomy:resultTaxonomy[0], words: result});
      }
    });
  }); // query
} //getTestResultForPackage,


function getTestResultForType(request, response){
  let limit = request.query.limit || 15;
  let id = request.query.id || null;
  let sqlTaxonomy = `SELECT * FROM asw_taxonomies WHERE tax_type='word_type' AND tax_status=1 AND tax_id=${id} LIMIT 1`;
  db.query(sqlTaxonomy, (err, resultTaxonomy, fields)=>{
    let sql = getSqlForTest(request, limit, `AND mt.word_type=${id} ORDER BY rand()`, `AND word_type=${id}`);
    db.query(sql, (err, result, fields)=>{
      if(err){ response.status(200).json(err); }else{
        response.status(200).json({taxonomy:resultTaxonomy, words: result});
      }
    });
  }); // query
} //getTestResultForPackage







router.post('/test', (request, response)=>{
  let taxonomy = request.query.taxonomy || null;
  if(taxonomy=='package'){ // EĞER TAXONOMY PACKAGE OLARAK GELDİYSE
    getTestResultForPackage(request, response);
  }else if(taxonomy=='type'){
    getTestResultForType(request, response);
  }else{ // EĞER TAXONOMY BOŞ GELDİYSE

  }



}); // /words/test


module.exports = router;
