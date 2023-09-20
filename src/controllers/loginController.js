const Login=require('../models/LoginModel');


exports.Index=(req,res)=>{
    res.render('login');
}

exports.register=async function(req,res){
    try{
        const login=new Login(req.body);
    await login.register();

    if(login.error.length > 0){
        req.flash('errors',login.error);
        req.session.save(function(){
            res.redirect('back');
    
        });
        return;
    }

    req.flash('success','Seu usuário foi criado com sucesso ');
    req.session.save(function(){
        res.redirect('back');
    });

}catch(err){
    console.log(err);
    res.render('404');
}
}