var express = require('express');
var Info = require("../model/Infos")
var Mais = require("../model/Mais")
var InfoSchema = require("../validators/InfoValidator")
const Joi = require("joi")
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (Info.list().length == 0) {
    Info.new("exemplo");
  }

  let obj = Info.getElementById(req.query.tid);
  res.render('index', { infos: Info.list(), info: obj });
});

router.get("/cv", function(req, res){
  res.render('cv');
})

router.get("/disciplinas", function(req, res){
  if (Mais.list().length == 0) {
    Mais.new("TCC 1");
    Mais.new("Programação Web 2");
  }

  let obj = Mais.getElementById(req.query.tid);
  res.render('disciplinas', { mais: Mais.list(), extra: obj });
})

router.get("/midia", function(req, res){
  let obj = Info.getElementById(req.query.tid);
  res.render('midia', { infos: Info.list(), info: obj });
})

router.post("/links", function (req, res){
    const {error, value} = InfoSchema.validate(req.body);
    if (error) {
      res.render('midia', { infos: Info.list(), erro: "Dados incompletos" });
      return;
    }
    
    const {id, nome} = value
    if (id === undefined) {
      //Inserir
      Info.new(nome);
    } else {
      //Alterar
      Info.update(id, nome);
    }
    
    res.redirect("/midia");
})

router.get("/nome/:id", function(req, res){
  const {error, value} = InfoSchema.validate(req.body);
    if (error) {
      res.render('nome', { infos: Info.list(), erro: "Dados incompletos" });
      return;
    }

    res.render("/nome/:id");


})


router.get("/links/del/:id", function(req, res){
  const {id} = req.params;
  const {error, value} = Joi.number().integer().greater(0).validate(id)

  if (error || !Info.delete(value)) {
    res.send("Falha ao excluir uma tarefa");
    return;
  }
  res.redirect("/midia");
})

module.exports = router;
