const express = require("express");
const router = express.Router();
import aswDB from "../db";

function getSelectedByDirectory(request, preTable='asw_words'){
  return ((request.session.langdir=='tr-de')? `${preTable}.word_translation AS original, ${preTable}.word_original AS translation` : `${preTable}.word_original AS original, ${preTable}.word_translation AS translation`);
} // getSelectedByDirectory

let sqlWordsAll = `SELECT asw_words.*, asw_taxonomies.tax_name FROM asw_words
                    INNER JOIN asw_taxonomies ON asw_taxonomies.tax_id=asw_words.word_type
                    ORDER BY asw_words.word_id ASC`;

router.post("/", (request, response)=>{
  return aswDB.getAll(sqlWordsAll)
    .catch(error => {
      return response.status(202).json({error:error});
    })
    .then(result => {
      return response.status(200).json({words:result.rows})
    })
});




router.post("/random", (request, response)=>{
  let limit = request.body.limit || 15;
  let sql = `SELECT * FROM asw_words ORDER BY RAND() LIMIT ${limit}`
  return aswDB.getAll(sql)
    .catch(error => {
      return response.status(202).json({error:error});
    })
    .then(result => {
      return response.status(200).json({words:result.rows})
    })
});


router.get("/count", (request, response)=>{
  let sql = 'SELECT COUNT(word_id) as total FROM asw_words';
  return aswDB.getOne(sql)
    .catch(error => {
      return response.status(202).json({error:error});
    })
    .then(result => {
      return response.status(200).json({count:result.row.total})
    })
}); // "/count"

//===PACKETS==============================================================================================
// PAKET LİSTESİ
router.post('/packets', async (request, response)=>{
  let sql = `SELECT package_id as tax_id, package_name as tax_name, package_cover as tax_cover, package_datas as tax_datas, JSON_LENGTH(package_items) AS word_count FROM asw_packets WHERE package_status=1 ORDER BY package_id DESC`;
  aswDB.getAll(sql).catch(error => {
    return response.status(202).json( {status:false, err:error} )
  }).then(result => {
    return response.status(200).json({status:true, items:result.rows})
  });
});

// PAKETLERE GÖRE KELİMELER.
router.post('/:package_id/package', (request, response)=>{
  let selected = getSelectedByDirectory(request);
  let sqlPackage = `SELECT package_items, package_id as tax_id, package_name as tax_name, package_cover as tax_cover, package_datas as tax_datas, JSON_LENGTH(package_items) AS word_count FROM asw_packets WHERE package_status=1 AND package_id=${request.params.package_id} LIMIT 1`;

  let currentPackage = {};
  aswDB.getOne(sqlPackage)
    .then(resultPackage => {
        currentPackage = resultPackage;
        let itemIds = JSON.parse(resultPackage.row.package_items).join(',');
        let sqlWord = `SELECT *, ${selected} FROM asw_words WHERE word_status=1 AND word_id IN (${itemIds}) ORDER BY rand() DESC LIMIT 15`;
        return aswDB.getAll(sqlWord);
    })
    .then(resultWords => {
      return response.status(200).json( {package:currentPackage.row, words:resultWords.rows} );
    })
    .catch(error => {
      return response.status(202).json( {error} );
    })
});


//===CATEGORIES==============================================================================================
/*
  Route: /words/categories
  İşlem: Kategoriler tablosundan tüm kategorileri getirir.
 */
router.post('/categories', (request, response)=>{
  let sql = `SELECT *,
    (SELECT COUNT(*) FROM asw_words WHERE word_categories LIKE CONCAT('%"', tax_id, '"%')) AS word_count
    FROM asw_taxonomies WHERE tax_type='word_category' AND tax_status=1 HAVING word_count>3 ORDER BY tax_name ASC`;

  aswDB.getAll(sql).catch(error => {
    return response.status(202).json( {status:false, err:error} )
  }).then(result => {
    return response.status(200).json({status:true, items:result.rows})
  });
});



// KATEGORİYE GÖRE KELİMELER.
router.post('/:category_id/category', (request, response)=>{
  let selected = getSelectedByDirectory(request);
  let limit = request.body.limit || 15 ;
  let sqlCategory = `SELECT * FROM asw_taxonomies WHERE tax_type='word_category' AND tax_status=1 AND tax_id=${request.params.category_id} LIMIT 1`;
  let sqlWord = `SELECT *, ${selected} FROM asw_words WHERE word_categories LIKE \'%"${request.params.category_id}"%\' AND word_status>0 ORDER BY rand() LIMIT ${limit}`;

  let currentCategory  = {};
  aswDB.getOne(sqlCategory)
    .then(resultCategory => {
      currentCategory = resultCategory
      return aswDB.getAll(sqlWord);
    })
    .then(resultWords => {
      return response.status(200).json( {category:currentCategory.row, words:resultWords.rows} )
    })
    .catch(error => {
      return response.status(202).json( {error} )
    });
});


//===TYPES==============================================================================================

// KELİME SINIFLARI
router.post('/types', (request, response)=>{
  let sql = `SELECT *,
    (SELECT COUNT(*) FROM asw_words WHERE word_status=1 AND word_type=tax_id) AS word_count
    FROM asw_taxonomies WHERE tax_type='word_type' AND tax_status=1 HAVING word_count>3 ORDER BY tax_name ASC`;
    aswDB.getAll(sql).catch(error => {
      return response.status(202).json( {status:false, error:error} );
    }).then(result => {
      return response.status(200).json({status:true, items:result.rows})
    });
});


// SINIFA GÖRE KELİMELER.
router.post('/:type_id/type', (request, response)=>{
  let selected = getSelectedByDirectory(request);
  let limit = request.body.limit || 15 ;
  let sqlType = `SELECT * FROM asw_taxonomies WHERE tax_type='word_type' AND tax_status=1 AND tax_id=${request.params.type_id} LIMIT 1`;
  let sqlWord = `SELECT *, ${selected} FROM asw_words WHERE word_status=1 AND word_type=${request.params.type_id} ORDER BY rand() DESC LIMIT ${limit}`;

  let currentType  = {};
  aswDB.getOne(sqlType)
    .then(resultType => {
      currentType = resultType
      return aswDB.getAll(sqlWord);
    })
    .then(resultWords => {
      return response.status(200).json( {type:currentType.row, words:resultWords.rows} )
    })
    .catch(error => {
      return response.status(202).json( {error} )
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
  aswDB.getAll(sql).catch(error => {
    return response.status(202).json( {status:false, error:error} )
  }).then(result => {
    return response.status(200).json({status:true, words:result.rows})
  });
});



module.exports = router;
