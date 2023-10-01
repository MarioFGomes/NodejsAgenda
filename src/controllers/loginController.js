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

exports.login=async function(req,res){
    try{
        const login=new Login(req.body);
        await login.Login();

    if(login.error.length > 0){
        req.flash('errors',login.error);
        req.session.save(function(){
            res.redirect('back');
        });
        return;
    }

    req.flash('success','Login efetuado com sucesso ');
    req.session.user=login.User;
    req.session.save(function(){
        res.redirect('/Index');
    });

}catch(err){
    console.log(err);
    res.render('404');
}
}

exports.logout=function (req, res){
    req.session.destroy();
    res.redirect('/');
}