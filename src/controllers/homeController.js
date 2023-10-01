const Contato=require('../models/ContatoModel');

exports.Index = async (req, res) => {
  const contatos=await Contato.buscaContato();
  res.render('index',{contatos});
};

exports.trataPost = (req, res) => {
  res.send(req.body);
  return;
};
