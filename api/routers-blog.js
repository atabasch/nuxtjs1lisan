const router = require("express").Router();
const db = require("../db");

router.post("/", (request, response) => {
  let sql = `SELECT * FROM asw_posts WHERE post_type='post' AND post_status='publish' ORDER BY post_id DESC`;
  db.query(sql, (err, result, fields) => {
    if(err){ response.status(404).json( {err:err} ); }else{
      response.status(200).json( {posts: result} );
    }
  });
});

router.post("/:slug/:id", (request, response) => {
  let sql = `SELECT * FROM asw_posts WHERE post_type='post' AND post_status='publish' AND post_id=${request.params.id} LIMIT 1`;
  db.query(sql, (err, result, fields) => {
    if(err){ response.status(404).json( {err:err} ); }else{
      response.status(200).json( {post: result[0]} );
    }
  });
});

module.exports = router;
