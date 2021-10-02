import {response} from "express";

const express = require("express");
const router = express.Router();
import db from "../db";

function getSelectedByDirectory(request, preTable='asw_words'){
  return ((request.session.langdir=='tr-de')? `${preTable}.word_translation AS original, ${preTable}.word_original AS translation` : `${preTable}.word_original AS original, ${preTable}.word_translation AS translation`);
} // getSelectedByDirectory

let sqlWordsAll = `SELECT asw_words.*, asw_taxonomies.tax_name FROM asw_words
                    INNER JOIN asw_taxonomies ON asw_taxonomies.tax_id=asw_words.word_type
                    ORDER BY asw_words.word_id ASC`;

router.post("/", (request, response)=>{

  db.query(sqlWordsAll, (err, res, fields)=>{
    return response.status(200).json({ words:res });
  });
});


router.get("/count", (request, response)=>{
  db.query("SELECT count(*) as total FROM asw_words", (err, res, fields) => {
    console.log(res)
    return response.status(200).json({count:res[0].total})
  })
});

//===PACKETS==============================================================================================
// PAKET LİSTESİ
router.post('/packets', (request, response)=>{
  let sql = `SELECT package_id as tax_id, package_name as tax_name, package_cover as tax_cover, package_datas as tax_datas, JSON_LENGTH(package_items) AS word_count FROM asw_packets WHERE package_status=1 ORDER BY package_id DESC`;
  db.query(sql, (err, res, fields) => {
    console.log("==============DB============")
    console.log(db)
    if(err){ return response.status(200).json( {err} ) }
    return response.status(200).json({items:res})
  });
});

// PAKETLERE GÖRE KELİMELER.
router.post('/:package_id/package', (request, response)=>{
  let selected = getSelectedByDirectory(request);

  let sqlPackage = `SELECT package_items, package_id as tax_id, package_name as tax_name, package_cover as tax_cover, package_datas as tax_datas, JSON_LENGTH(package_items) AS word_count FROM asw_packets WHERE package_status=1 AND package_id=${request.params.package_id} LIMIT 1`;
  db.query(sqlPackage, (err, resultPackage, fields)=>{
    if(err){      return response.status(404).json( {err} );     }else{
      let itemIds = JSON.parse(resultPackage[0].package_items).join(',');

      let sqlWord = `SELECT *, ${selected} FROM asw_words WHERE word_status=1 AND word_id IN (${itemIds}) ORDER BY rand() DESC LIMIT 20`;

      db.query(sqlWord, (err, result, fields) => {
        if(err){      return response.status(404).json( {err} );     }else{

          return response.status(200).json( {package:resultPackage[0], words:result} );
        } //if(err)
      });

    } //if(err)
  });
});


//===CATEGORIES==============================================================================================
// TÜM KATEGORİLER
router.post('/categories', (request, response)=>{
  let sql = `SELECT *,
    (SELECT COUNT(*) FROM asw_words WHERE word_categories LIKE CONCAT('%"', tax_id, '"%')) AS word_count
    FROM asw_taxonomies WHERE tax_type='word_category' AND tax_status=1 HAVING word_count>3 ORDER BY tax_name ASC`;
  db.query(sql, (err, res, fields) => {
    return response.status(200).json({items:res})
  });
});

// KATEGORİYE GÖRE KELİMELER.
router.post('/:category_id/category', (request, response)=>{
  let selected = getSelectedByDirectory(request);
  let sqlCategory = `SELECT * FROM asw_taxonomies WHERE tax_type='word_category' AND tax_status=1 AND tax_id=${request.params.category_id} LIMIT 1`;
  let sqlWord = `SELECT *, ${selected} FROM asw_words WHERE word_categories LIKE \'%"${request.params.category_id}"%\' AND word_status>0 ORDER BY rand()`;

  db.query(sqlCategory, (err, res, fields)=>{
    if(err){      return response.status(404).json( {err} );     }else{
      let category = res;
      db.query(sqlWord, (err, result, fields) => {
        if(err){      return response.status(404).json( {err} );     }else{

          return response.status(200).json( {category:category[0], words:result} );
        } //if(err)
      });

    } //if(err)
  });
});


//===TYPES==============================================================================================

// KELİME SINIFLARI
router.post('/types', (request, response)=>{
  let sql = `SELECT *,
    (SELECT COUNT(*) FROM asw_words WHERE word_status=1 AND word_type=tax_id) AS word_count
    FROM asw_taxonomies WHERE tax_type='word_type' AND tax_status=1 HAVING word_count>3 ORDER BY tax_name ASC`;
  db.query(sql, (err, res, fields)=>{
    return response.status(200).json({items:res});
  });
});


// SINIFA GÖRE KELİMELER.
router.post('/:type_id/type', (request, response)=>{
  let selected = getSelectedByDirectory(request);
  let sqlType = `SELECT * FROM asw_taxonomies WHERE tax_type='word_type' AND tax_status=1 AND tax_id=${request.params.type_id} LIMIT 1`;
  let sqlWord = `SELECT *, ${selected} FROM asw_words WHERE word_status=1 AND word_type=${request.params.type_id} ORDER BY rand() DESC`;

  db.query(sqlType, (err, res, fields)=>{
    if(err){      return response.status(404).json( {err} );     }else{
      let type = res;
      db.query(sqlWord, (err, result, fields) => {
        if(err){      return response.status(404).json( {err} );     }else{

          return response.status(200).json( {type:type[0], words:result} );
        } //if(err)
      });

    } //if(err)
  });
});


// KELİME GETİRME
router.post('/:start/:limit', (request, response)=>{
  let start = request.params.start;
  let limit = request.params.limit;
  let selected = getSelectedByDirectory(request);
  let sql = `SELECT asw_words.*, ${selected}, asw_taxonomies.tax_name FROM asw_words
                    INNER JOIN asw_taxonomies ON asw_taxonomies.tax_id=asw_words.word_type
                    ORDER BY asw_words.word_id ASC LIMIT ${start}, ${limit}`
  db.query(sql, (err, res, fields)=>{ return response.status(200).json({ words:res }); });
});



module.exports = router;
