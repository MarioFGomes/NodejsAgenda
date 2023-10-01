const Contato=require('../models/ContatoModel');

exports.Index=(req,res)=>{
res.render('Contato',{
    contato:{}
});
}

exports.register=async (req,res)=>{
    try{
        const contato = new Contato(req.body);
        await contato.register();
        if(contato.error.length >0){
            req.flash('errors',contato.error)
            req.session.save(()=>{res.redirect('/contato/Index')})
            return;
        }
    
        req.flash('success','Contato Inserido com sucesso')
        req.session.save(()=>{res.redirect('/contato/Index')})
        return;
    
    }catch(e){
        console.error(e);
        res.render('404');
    }
}

exports.EditIndex=async (req, res) => {
 if(!req.params.id) return res.render('404');
 const contato= await Contato.buscaPorId(req.params.id);
 if(!contato) return res.render('404');

 res.render('Contato',{contato});
}


exports.Edit=async (req, res) => {
  try{
    if(!req.params.id) return res.render('404');
    const contato= new Contato(req.body);
    await contato.Edit(req.params.id);
    if(contato.error.length >0){
        req.flash('errors',contato.error)
        req.session.save(()=>{res.redirect('/contato/Index')})
        return;
    }

    req.flash('success','Contato Editado com sucesso')
    req.session.save(()=>{res.redirect('/Index')})
    return;
  }catch(e){
    console.error(e);
    res.render('404');
  }
}

exports.delete= async (req, res) => {
    if(!req.params.id) return res.render('404');
    const contato=await Contato.delete(req.params.id);
    if(!contato) return res.render('404');
    req.flash('success','Contato deletado com sucesso')
    req.session.save(()=>{res.redirect('/Index')})
    return;

}