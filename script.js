const login = document.getElementById("login"),
sign = document.getElementById("sign"),
sobre = document.getElementById("sobre"),
blog = document.getElementById("blog"),
add = document.getElementById("add"),
btn_registro = document.getElementById("tab-registro"),
btn_login = document.getElementById("tab-login"),
btn_blog = document.getElementById("tab-blog"),
btn_add = document.getElementById("tab-add"),
login_form = document.getElementById("login-form"),
btn_sobre = document.getElementById("tab-sobre")

function Clear(){
    const list = [sign, login, sobre, blog, add]

    for(let element of list){
        element.style = "display: none"
    }
}

function Home() {
    Clear()
    login.style = "display: flex"
    btn_blog.style = "display: none"
    btn_add.style = "display: none"
}
function Registro() {
    Clear()
    sign.style = "display: flex"
}
function Sobre() {
    Clear()
    sobre.style = "display: flex"
}
function Blog() {
    Clear()
    blog.style = "display: flex"
}
function Add() {
    Clear()
    add.style = "display: flex"
}
login_form.addEventListener("submit", (e) =>{
    e.preventDefault()
    
    let datos = new FormData(e.target)
    datos = {
        user: datos.get("user"),
        password: datos.get("password"),
    };
    fetch("http://labtelema.ujaen.es:8083/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
      })
    .then(data => {
            if(data.status == 200){
                btn_login.style = "display: none"
                btn_registro.style = "display: none"
                btn_blog.style = "display: block"
                btn_add.style = "display: block"
                Blog()
                List(datos.user)
            }
    });
})
function List(usuario){      
      fetch("http://labtelema.ujaen.es:8083/blog/" +usuario, {
        method: "GET"
      })
        .then(data => {
            console.log(data)
        });
}
btn_registro.addEventListener("click", () =>{
    Registro()
})
btn_login.addEventListener("click", () =>{
    Home()
})
btn_sobre.addEventListener("click", () =>{
    Sobre()
})
btn_blog.addEventListener("click", () =>{
    Blog()
})
btn_add.addEventListener("click", () =>{
    Add()
})
Home()