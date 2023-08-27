const router = require("express").Router();
import aswDB from "../db";

router.post("/", (request, response) => {
  let sql = `SELECT * FROM asw_posts WHERE post_type='post' AND post_status='publish' ORDER BY post_id DESC`;
  return aswDB.getAll(sql)
    .then(result => {
      return response.status(200).json( {status:true, posts: result.rows} );
    })
    .catch(error => {
      return response.status(202).json( {status:false, error: error} );
    });
});

router.post("/:slug/:id", (request, response) => {
  let sql = `SELECT * FROM asw_posts WHERE post_type='post' AND post_status='publish' AND post_id=${request.params.id} LIMIT 1`;
  return aswDB.getOne(sql)
    .then(result => {
      return response.status(200).json( {status:true, post: result.row} );
    })
    .catch(error => {
      return response.status(202).json( {status:false, error: error} );
    });
});

module.exports = router;
