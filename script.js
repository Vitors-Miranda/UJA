const login = document.getElementById("login"),
    sign = document.getElementById("sign"),
    sobre = document.getElementById("sobre"),
    blog = document.getElementById("blog"),
    add = document.getElementById("add"),
    btn_registro = document.getElementById("tab-registro"),
    btn_login = document.getElementById("tab-login"),
    user_register = document.getElementById("user-register"),
    btn_blog = document.getElementById("tab-blog"),
    btn_add = document.getElementById("tab-add"),
    login_form = document.getElementById("login-form"),
    blog_form = document.getElementById("blog-form"),
    register_form = document.getElementById("register-form"),
    tbody = document.getElementById("table-body"),
    btn_sobre = document.getElementById("tab-sobre")

function Clear() {
    const list = [sign, login, sobre, blog, add]

    for (let element of list) {
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

login_form.addEventListener("submit", (e) => {
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
            if (data.status == 200) {
                btn_login.style = "display: none"
                btn_registro.style = "display: none"
                btn_blog.style = "display: block"
                btn_add.style = "display: block"
                Blog()
                List(datos.user)
            }
        });
})

blog_form.addEventListener("submit", (e) => {
    e.preventDefault()

    let datos = new FormData(e.target)
    datos = {
        user: datos.get("user"),
        title: datos.get("title"),
        date: datos.get("date"),
        comment: datos.get("comment"),
    };
    fetch("http://labtelema.ujaen.es:8083/blog", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    })
        .then(data => {
                List(datos.user)
                Blog()
        });
})

register_form.addEventListener("submit", (e) => {
    e.preventDefault()
    
    let datos = new FormData(e.target)
    datos = {
        user: datos.get("user"),
        password: datos.get("password"),
        name: datos.get("name"),
        surname: datos.get("surname"),
        email: datos.get("email"),
    };
    fetch("http://labtelema.ujaen.es:8083/user", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    })
        .then(data => {
            register_form.reset();
            Home()
        });
})

function List(usuario) {
    user_register.value = usuario;
    fetch("http://labtelema.ujaen.es:8083/blog/" + usuario, {
        method: "GET"
    })
    .then(data => {
        if (!data.ok) {
            return data.status
        }
        return data.json();
    })
    .then(data => {
        tbody.innerText = ""
            for ( value of data) {
                tbody.innerHTML += `
                <tr>
                    <td> ${value.title} </td>
                    <td> ${value.date} </td>
                    <td> ${value.comment} </td>
                </tr>
                `
            }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}
btn_registro.addEventListener("click", () => {
    Registro()
})
btn_login.addEventListener("click", () => {
    Home()
})
btn_sobre.addEventListener("click", () => {
    Sobre()
})
btn_blog.addEventListener("click", () => {
    Blog()
})
btn_add.addEventListener("click", () => {
    Add()
})
Home()