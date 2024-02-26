const login = document.getElementById("login"),
sign = document.getElementById("sign"),
sobre = document.getElementById("sobre"),
btn_registro = document.getElementById("tab-registro"),
btn_login = document.getElementById("tab-login"),
btn_sobre = document.getElementById("tab-sobre")

function Home() {
    sign.style = "display: none"
    login.style = "display: flex"
    sobre.style = "display: none"
}
function Registro() {
    sign.style = "display: flex"
    login.style = "display: none"
    sobre.style = "display: none"
}
function Sobre() {
    sign.style = "display: none"
    login.style = "display: none"
    sobre.style = "display: flex"
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
Home()