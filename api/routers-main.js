const router = require("express").Router();

router.get("/", (request, response) => {
  response.status(200).json({
  });
});


// SESSION İLE DİL DEĞİŞTİRMEK
router.get('/change-direction', async (request, response) => {
  if(typeof request.session.langdir == "undefined"){
    request.session.langdir = 'tr-de';
  }else{
    request.session.langdir = request.session.langdir=='tr-de'? 'de-tr' : 'tr-de' ;
  }
  response.status(200).json({langdir:request.session.langdir});
});

module.exports = router;
