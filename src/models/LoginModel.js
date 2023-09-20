const mongoose = require('mongoose');
const validator = require('validator');


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
       try{
        this.User=await LoginModel.create(this.body);
       }catch(e){
        console.error(e);
       }
    }

    valida(){

        this.cleanUp();

        if(! validator.isEmail(this.body.Email)) this.error.push('Email is not valid');
        if(this.body.Password.length < 3 || this.body.Password.length > 50) this.error.push('password must be at least 50 characters')
        if(this.body.Password!=this.body.ConfirmaPassword) this.error.push('password must be equal Confirme Password');
        if(this.body.Username=='' || this.body.Username.length < 2 ) this.error.push('username must be at least 2 characters')

    }

    cleanUp(){
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string'){
                this.body[key]='';
        }
    }

    this.body={
        Username:this.body.Username,
        Email:this.body.Email,
        Password:this.body.Password,
        ConfirmaPassword:this.body.ConfirmaPassword
    }
}


}

module.exports = Login;