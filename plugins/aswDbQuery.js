module.exports = (db, sql, datas=null, error_tag=null, error_default=null) => {
  return new Promise((resolve, reject) => {
    db.query(sql, datas, (error, result, fields) => {
      if(error){
        reject({
          error: error,
          tag: error_tag==null? 'asw-db-query' : error_tag,
          message: 'Veritabanı işemi sırasında bir sorun oluştu.'
        });
      }else{
        resolve(result);
      }
    });
  });
}
