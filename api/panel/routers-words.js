import {request} from "express";

const router = require("express").Router();
import aswDB from "../../db";




router.post("/list", (request, response)=>{
  let sql = `SELECT * FROM asw_words AS W INNER JOIN asw_taxonomies AS T ON T.tax_id=W.word_type ORDER BY word_id DESC`;
  aswDB.getAll(sql)
    .catch(error => {
      response.status(202).json( {status:false, error} );
    })
    .then(result => {
      response.status(200).json( {status:true, items: result.rows} );
    })
});





router.post("/get", (request, response)=>{
  let sql = `SELECT * FROM asw_words AS W INNER JOIN asw_taxonomies AS T ON T.tax_id=W.word_type WHERE W.word_id=? ORDER BY word_id DESC`;
  aswDB.getOne(sql, { values: [request.body.id] })
    .catch(error => {
      response.status(202).json( {status:false, error} );
    })
    .then(result => {
      response.status(200).json( {status:true, word: result.row } );
    })
});





router.post("/create", (request, response)=>{
  // todo: asagidaki sorguyu sequelizeye göre düzenle
  let sql = `INSERT INTO asw_words SET ?`;
  let insertDatas = request.body.datas;
  insertDatas.word_categories = JSON.stringify(request.body.datas.word_categories);
  insertDatas.word_datas = JSON.stringify(request.body.datas.word_datas);
  aswDB.insert(sql, {values: insertDatas})
    .catch(error=>{ response.status(202).json({ status:false, error:error });    })
    .then(result=>{ response.status(200).json({ status:true, result:result }); })
});




router.post("/update", (request, response)=>{
  // todo: asagidaki sorguyu sequelizeye göre düzenle
  let sql = `UPDATE asw_words SET ? WHERE word_id=?`;
  let id = request.body.datas.word_id;

  let updateDatas = {
    word_original: request.body.datas.word_original,
    word_translation: request.body.datas.word_translation,
    word_type: request.body.datas.word_type,
    word_categories: JSON.stringify(request.body.datas.word_categories),
    word_datas: JSON.stringify(request.body.datas.word_datas),
    word_status: request.body.datas.word_status,
  }
  aswDB.update(sql, { values: [updateDatas, id] })
    .catch(error=>{ response.status(202).json(error);    })
    .then(result=>{ response.status(200).json( {...result, word:{word_id:id, ...updateDatas} } ); })
});





router.post('/delete', (request, response) => {
  // todo: asagidaki sorguyu sequelizeye göre düzenle
  if( !(request.body.word.word_id || false) ){
    response.status(202).json({error:"Birincil anahtar gönderilmedi"})
  }else{
    let sql = "DELETE FROM asw_words WHERE word_id=?";
    aswDB.delete(sql, { values: [request.body.word.word_id] })
      .catch(error=>{ response.status(202).json(error); })
      .then(result=>{ response.status(200).json(result); })
  }
});

module.exports = router;
