const router = require("express").Router();
import aswDB from "../../plugins/aswDB";

router.post("/dashboard", (request, response)=>{
  let sql = `SELECT
       (SELECT COUNT(*) FROM asw_posts WHERE post_status>0 AND post_type='post') as blog,
       (SELECT COUNT(*) FROM asw_media) as media,
       (SELECT COUNT(*) FROM asw_users) as users,
       (SELECT COUNT(*) FROM asw_comments) as comments;
    SELECT * FROM asw_posts WHERE post_status>0 AND post_type='post' ORDER BY post_id DESC LIMIT 10;
       `;
  aswDB(sql, null)
    .catch(error => {
      response.status(202).json( {status:false, error:error} );
    })
    .then(result => {
      response.status(200).json( {status:true, counters:result[0][0], posts:result[1]} );
    })
});

module.exports = router;
