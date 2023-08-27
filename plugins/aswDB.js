import {QueryTypes} from "sequelize"
import {connection as db,sequelize} from "../db";

module.exports = (sql, datas=null, error_tag=null, error_default=null) => {
  return new Promise(async (resolve, reject) => {
    // todo: plain=true olursa sadece tek bir satır döner ayarla.
    return sequelize.query(sql, { replacements: datas })
      .catch(error => {
        return reject({
          error: error,
          tag: error_tag==null? 'asw-db-query' : error_tag,
          message: 'Veritabanı işemi sırasında bir sorun oluştu.'
        });
      })
      .then((result) => {
        return resolve(result);
      });
  });
}

//
//
// module.exports = (sql, datas=null, error_tag=null, error_default=null) => {
//   return new Promise((resolve, reject) => {
//     db.query(sql, datas, (error, result, fields) => {
//       if(error){
//         reject({
//           error: error,
//           tag: error_tag==null? 'asw-db-query' : error_tag,
//           message: 'Veritabanı işemi sırasında bir sorun oluştu.'
//         });
//       }else{
//         resolve(result);
//       }
//     });
//   });
// }

