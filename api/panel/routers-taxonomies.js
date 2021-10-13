const router = require("express").Router();
import aswDB from "../../plugins/aswDB";

router.post('/get', (request, response)=>{
  let sqlItems = [];
  if(!(request.body.tax_type || false)){
    sqlItems = [ "SELECT * FROM asw_taxonomies ORDER BY tax_id DESC" ];
    aswDB(sqlItems.join(" "))
      .catch(error=>{
        response.status(202).json( {error} );
      })
      .then(result => {
        response.status(200).json( {result} );
      })
  }else{
    request.body.tax_type.forEach(type => {
      sqlItems.push(`SELECT * FROM asw_taxonomies WHERE tax_type='${type}' ORDER BY tax_id DESC;`);
    });

    aswDB(sqlItems.join(" "))
      .catch(error=>{
        response.status(202).json( {error} );
      })
      .then(result => {
        let resultObject= {};
        request.body.tax_type.forEach((type, index) => {
          resultObject[type] = result[index];
        });
        response.status(200).json( resultObject );
      })
  } //else

}); // get

module.exports = router;
