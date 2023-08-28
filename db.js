const { Sequelize, QueryTypes } = require('sequelize');

class AtabaschDatabase{
  connection  = null;
  options     = {
    host:     process.env.DB_HOST || 'localhost',
    user:     process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME,
    port:     process.env.DB_PORT || 3306,
  }


  constructor(){
    this.connection = new Sequelize(
      this.options.database,
      this.options.user,
      this.options.password,
      {
        host: this.options.host,
        dialect: 'mysql',
        port: this.options.port
      }
    );
  } // constructor

  getConnection(){
    return this.connection;
  }


  getQuery(sql, params= {}, type=null){

      let connection = this.connection;
      let queryType = !type? QueryTypes.SELECT : type;

      return new Promise(async function(success, fail){

        return connection.query(sql, {
          plain:  params.returnSingle || false,
          raw:    true,
          type:   queryType,
          // todo: verilerin obj yada array olarak gelmesine göre ayarlaniyor mu
          replacements: params.values || []
        })

        .catch(function(error){
            return fail({
              error: error,
              tag: params.errorTag || 'asw-db-query',
              message: 'Veritabanı işemi sırasında bir sorun oluştu.'
            })
        }) // catch

        .then(function(results){
            return success( {
              length: results.length || -1, // satır sayısı
              rows: !params.returnSingle? results : [],
              row: !params.returnSingle? [] : results ,
            } );
        }); // then

      }); // return new Promise

  }// getQuery



  getAll(sql, params={}){
    params.values = params.values || []
    params.returnSingle = false
    params.errorTag = params.errorTag || 'asw-db-query' 
    return this.getQuery(sql, params)
  } // getAll();

  getOne(sql, params={}){
    params.values = params.values || []
    params.returnSingle = true
    params.errorTag = params.errorTag || 'asw-db-query' 

    return this.getQuery(sql, params)
  } // getOne();

  insert(sql, params={}){
    params.values = params.values || []
    params.errorTag = params.errorTag || 'asw-db-query' 
    return this.getQuery(sql, params, QueryTypes.INSERT);
  } // insert();

  update(sql, params={}){
    params.values = params.values || []
    params.errorTag = params.errorTag || 'asw-db-query' 
    return this.getQuery(sql, params, QueryTypes.UPDATE);
  } // update();

  delete(sql, params={}){
    params.values = params.values || []
    params.errorTag = params.errorTag || 'asw-db-query' 
    return this.getQuery(sql, params, QueryTypes.DELETE);
  } // delete();



} // class


let connection  = new AtabaschDatabase;
export default connection;


