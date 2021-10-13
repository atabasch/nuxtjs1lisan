let crypto = require('crypto');
module.exports = {

  md5: (content, isBase64=false) => {
    let dig = !isBase64? 'hex' : 'base64';
    return crypto.createHash('md5').update(content).digest(dig);
  },

  sha1: (content, isBase64=false) => {
    let dig = !isBase64? 'hex' : 'base64';
    return crypto.createHash('sha1').update(content).digest(dig);
  },

  sha256: (content, isBase64=false) => {
    let dig = !isBase64? 'hex' : 'base64';
    return crypto.createHash('sha256').update(content).digest(dig);
  },

  mix: (content, isBase64=false) => {
    let dig = !isBase64? 'hex' : 'base64';
    let result = crypto.createHash('md5').update(content).digest(dig);
    result = crypto.createHash('sha1').update(result).digest(dig);
    result = crypto.createHash('md5').update(result).digest(dig);
    result = crypto.createHash('sha256').update(result).digest(dig);
    result = crypto.createHash('md5').update(result).digest(dig);
    return result;
  }


}
