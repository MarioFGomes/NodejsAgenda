const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');


const LoginSchema = new mongoose.Schema({
    Username: { type: String, required: true },
    Email: { type: String, required: true },
    Password: { type: String, required: true },
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {

    constructor(body){
        this.body = body;
        this.error=[];
        this.User=null;
    }

    async register(){
        this.valida();
        if(this.error.length > 0) return;
        await this.UserExist();
        if(this.error.length > 0) return;
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(this.data.Password, salt);
        this.data.Password=hash;
        this.User=await LoginModel.create(this.data);
    }

    async Login(){
        this.LoginValidation();
        if(this.error.length > 0) return;
        this.User=await LoginModel.findOne({Username:this.data.Username});
        if(!this.User) {
        this.error.push('Usuário ou Password Invalido');
        return;
    }
        if(!bcrypt.compare(this.data.Password,this.User.Password)){
            this.error.push('Password Invalido');
            this.User=null; 
            return;
        }
    }

    valida(){

        this.cleanUp();

        if(!validator.isEmail(this.data.Email)) this.error.push('Email is not valid');
        if(this.data.Password.length < 3 || this.body.Password.length > 50) this.error.push('password must be at least 50 characters')
        if(this.data.Password!=this.data.ConfirmaPassword) this.error.push('password must be equal Confirme Password');
        if(this.data.Username=='' || this.data.Username.length < 2 ) this.error.push('username must be at least 2 characters')

    }

    async UserExist(){
        this.User=await LoginModel.findOne({Username:this.data.Username});
        if(this.User) this.error.push('Usuário já existe')
    }

    LoginValidation(){
        this.cleanUp()
        if(this.data.Password=='' || this.data.Password==null) this.error.push('password must be provided');
        if(this.data.Username=='' || this.data.Username==null ) this.error.push('username must be provided')
    }

    cleanUp(){
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string'){
                this.body[key]='';
        }
    }

    this.data={
        Username:this.body.Username,
        Email:this.body.Email,
        Password:this.body.Password,
        ConfirmaPassword:this.body.ConfirmaPassword
    }
}


}

module.exports = Login;