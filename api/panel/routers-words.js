const router = require("express").Router();
import aswDB from "../../plugins/aswDB";

router.post("/list", (request, response)=>{
  let sql = `SELECT * FROM asw_words ORDER BY word_id DESC`;
  aswDB(sql, null)
    .catch(error => {
      response.status(202).json( {error} );
    })
    .then(result => {
      response.status(200).json( {items: result} );
    })
});

module.exports = router;
