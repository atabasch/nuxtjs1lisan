const router = require("express").Router();
import aswDB from "../../plugins/aswDB";
import aswCrypto from '../../plugins/aswCrypto';




router.post("/login", (request, response)=>{
  let user = request.body.user;
  user.pass = aswCrypto.mix(user.pass);
  let sql = "SELECT * FROM asw_users WHERE user_username=? AND user_password=? AND user_status=? AND user_level>? LIMIT 1";
  aswDB(sql, [user.name, user.pass, true, 1])
    .catch(error=>{ response.status(202).json( error ); })
    .then( result =>{

      let user = result[0] || false;
      if(!user){
        response.status(202).json( {status:false, message:'Hesap bilgileri hatalı'} );
      }else{
        delete(user["user_password"]);
        delete(user["user_create"]);
        delete(user["user_update"]);
        // if(user.rememberMe){
        //   let hour4ses = 3600000;
        //   request.session.cookie.expires = new Date(Date.now() + ((hour4ses*24)*15) );
        //   request.session.cookie.maxAge = ((hour4ses*24)*15);
        // }

        request.session.user = user;
        request.session.save();
        response.status(200).json( user );
      }
    });

});


router.post("/logout", (request, response)=>{
    request.session.destroy(err => {
      if(err){
        response.status(202).json( {user:false, error:err} );
      }else{
        response.status(200).json( {user:false} );
      }
    });
});







router.post("/dashboard", (request, response)=>{
  let sql = `SELECT
       (SELECT COUNT(*) FROM asw_posts WHERE post_status>0 AND post_type='post') as blog,
       (SELECT COUNT(*) FROM asw_media) as media,
       (SELECT COUNT(*) FROM asw_users) as users,
       (SELECT COUNT(*) FROM asw_comments) as comments`;
  aswDB(sql)
    .catch(error => {
      response.status(202).json( {status:false, error:error} );
    })
    .then(countResult => {

      const data = { counter: countResult[0][0] || {} }

      sql = "SELECT * FROM asw_posts WHERE post_status>0 AND post_type='post' ORDER BY post_id DESC LIMIT 10";

      aswDB(sql).catch(err => response.status(202).json( {status:false, error:err} ) )
        .then(result => {

          data.status = true;
          data.posts  = result[0] || [];

          response.status(200).json( data );

        })

    })
});

router.post("/")

module.exports = router;
