const router = require("express").Router();
import aswDB from "../../db";


router.post('/get', async (request, response)=>{
  let sqlItems = [];
  if(!(request.body.tax_type || false)){

    let sql = "SELECT * FROM asw_taxonomies ORDER BY tax_id DESC";
    aswDB.getAll(sql)
      .catch(error=>{
        response.status(202).json( {status:false, error} );
      })
      .then(result => {
        response.status(200).json( {status:true, result:result.rows} );
      })


  }else{

      try {
          let resultObject = {};
          const promises = request.body.tax_type.map(async (type) => {
              let sql = `SELECT * FROM asw_taxonomies WHERE tax_type='${type}' ORDER BY tax_id DESC`;
              const result = await aswDB.getAll(sql);
              resultObject[type] = result.rows;
          });
      
          await Promise.all(promises);
          return response.status(200).json({ status: true, result:resultObject });
      
      } catch (error) {
          return response.status(202).json({ status: false, error });
      }
    
  } //else

}); // get

module.exports = router;
