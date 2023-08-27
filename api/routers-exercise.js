const router = require("express").Router();
import aswDB from '../db'
import {arrayShuffle} from "../plugins/helpers";

function getSelectedByDirectory(request, preTable='asw_words'){
  return ((request.session.langdir ==='tr-de')? `${preTable}.word_translation AS original, ${preTable}.word_original AS translation` : `${preTable}.word_original AS original, ${preTable}.word_translation AS translation`);
} // getSelectedByDirectory






function getSqlForTest(request, limit=15, extraSql='', extraInSql=''){
  let selected = getSelectedByDirectory(request, 'mt');
  let answersSelected = (request.session.langdir==='tr-de')? 'word_original' : 'word_translation';

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
  let id    = request.query.id || null;

  let sqlTaxonomy = `SELECT package_items, package_id as tax_id, package_name as tax_name, package_cover as tax_cover, package_datas as tax_datas, JSON_LENGTH(package_items) AS word_count FROM asw_packets WHERE package_status=1 AND package_id=${id} LIMIT 1`;
  let objTaxonomy = {};

  return aswDB.getOne(sqlTaxonomy)
    .then(resultTaxonomy => {
      objTaxonomy = resultTaxonomy;
      let itemIds = JSON.parse(resultTaxonomy.row.package_items);
      let sql     = getSqlForTest(request, limit, `AND mt.word_id IN (${itemIds}) ORDER BY rand()`, `AND word_id IN (${itemIds.join(',')}) `);
      return aswDB.getAll(sql);
    })
    .then(result => {
      return response.status(200).json({taxonomy:objTaxonomy.row, words: result.rows});
    })
    .catch(error => {
      return response.status(202).json({ status:false, error })
    })

} //getTestResultForPackage,


function getTestResultForType(request, response){
  let limit = request.query.limit || 15;
  let id    = request.query.id || null;

  let sqlTaxonomy = `SELECT * FROM asw_taxonomies WHERE tax_type='word_type' AND tax_status=1 AND tax_id=${id} LIMIT 1`;
  let objTaxonomy = {};

  return aswDB.getOne(sqlTaxonomy)
    .then(resultTaxonomy => {
      objTaxonomy = resultTaxonomy;
      let sql = getSqlForTest(request, limit, `AND mt.word_type=${id} ORDER BY rand()`, `AND word_type=${id}`);
      return aswDB.getAll(sql);
    })
    .then(result => {
      return response.status(200).json({taxonomy:objTaxonomy.row, words: result.rows});
    })
    .catch(error => {
      return response.status(202).json({ status:false, error })
    });
} //getTestResultForPackage



function getTestResultForCategory(request, response){
  let limit = request.query.limit || 15;
  let id    = request.query.id || null;

  let sqlTaxonomy = `SELECT * FROM asw_taxonomies WHERE tax_type='word_category' AND tax_status=1 AND tax_id=${id} LIMIT 1`;
  let objTaxonomy = {};

  return aswDB.getOne(sqlTaxonomy)
    .then(resultTaxonomy => {
      objTaxonomy = resultTaxonomy;
      let sql = getSqlForTest(request, limit, `AND mt.word_categories LIKE \'%"${id}"%\' ORDER BY rand()`, `AND word_categories LIKE \'%"${id}"%\'`);
      return aswDB.getAll(sql);
    })
    .then(result => {
      return response.status(200).json({category:objTaxonomy.row, words: result.rows});
    })
    .catch(error => {
      return response.status(202).json({ status:false, error })
    });
} //getTestResultForCategory


function getTestResultForList(request, response){
  let limit = request.query.limit || 15;
  let id    = request.query.id || null;

  let sql = getSqlForTest(request, `${id}, ${limit}`, ` ORDER BY rand()`, ``);

  return aswDB.getAll(sql)
    .then(result => {
      return response.status(200).json( {
        words:result.rows,
        taxonomy: {
          tax_id:1,
          tax_name: "Kelime Listesi",
          tax_description: ""
        }
      } );

    })
    .catch(error => {
      return response.status(202).json({ status:false, error })
    });

} //getTestResultForList




router.post('/test', (request, response)=>{
  let taxonomy = request.query.taxonomy || null;
  if(taxonomy==='package'){ // EĞER TAXONOMY PACKAGE OLARAK GELDİYSE
    return getTestResultForPackage(request, response);
  }else if(taxonomy==='type'){
    return getTestResultForType(request, response);
  }else if(taxonomy==='category'){
    return getTestResultForCategory(request, response);
  }else if(taxonomy==='list'){
    return getTestResultForList(request, response);
  }else{ // EĞER TAXONOMY BOŞ GELDİYSE

  }



}); // /words/test


module.exports = router;
