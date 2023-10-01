const { setTimeout } = require("core-js");

const logar=document.getElementById('login')

logar.addEventListener('click',() => {
    container=document.querySelector('.container');
    container.classList.toggle('active');
    section=document.querySelector('section');
    section.classList.toggle('active');
});