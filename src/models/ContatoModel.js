const mongoose = require('mongoose');
const validator = require('validator');


const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default:'' },
    email: { type: String, required: false, default:'' },
    telefone: { type: String, required: false, default:'' },
    DataRegistro: { type: Date, required: true, default:Date.now() },
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body) {
        this.body = body;
        this.error=[];
        this.contato=null;
}

Contato.prototype.register=async function(){
    this.valida();
    if(this.error.length >0) return;
    this.contato= await ContatoModel.create(this.body);
}

Contato.prototype.Edit=async function(id){
    if(typeof id !=="string") return;
    this.valida();
    if(this.error.length >0) return;
    this.contato=await ContatoModel.findByIdAndUpdate(id,this.body,{new:true});
}



Contato.prototype.valida=function(){

    this.cleanUp();

    if(this.body.email && !validator.isEmail(this.body.email)) this.error.push('Email is not valid');
    if(!this.body. nome) this.error.push('O campo nome é obrigatorio');
    if(!this.body.email && !this.body.telefone) this.error.push('pelo menos um contato deve ser enviado');

}

Contato.prototype.cleanUp=function(){
    for(const key in this.body) {
        if(typeof this.body[key] !== 'string'){
            this.body[key]='';
    }
}

this.body={
    nome:this.body.nome,
    sobrenome:this.body.Sobrenome,
    telefone:this.body.telefone,
    email:this.body.email
}
}

// Metodos estaticos

Contato.buscaPorId=async function(id){
    if(typeof id !=="string") return;
   const contato= await ContatoModel.findOne({_id:id});
   return contato;
}

Contato.buscaContato=async function(){
   const contatos= await ContatoModel.find().sort({DataRegistro:-1});
   return contatos;
}

Contato.delete=async function(id){
    if(typeof id !=="string") return;
   const contato= await ContatoModel.findOneAndDelete({_id:id});
   return contato;
}

module.exports = Contato;