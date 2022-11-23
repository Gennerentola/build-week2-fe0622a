var user = document.getElementById('user');
var password = document.getElementById('password');
var addBtn = document.getElementById('btnLogin');
var login = document.querySelectorAll('.formLogin');
var logged = document.getElementById('formLogged');
var errore = document.getElementById('erroreLogin');
var btnLogout = document.getElementById('logout');
var saluto = document.getElementById('saluto');
let registrati = document.getElementById('registrati');
var cart = document.querySelector(".fa-shopping-cart").parentElement.parentElement;
var url = 'http://localhost:3000/user';
var winWidth = window.innerWidth;

//invio del tasto registrati alla home
registrati.addEventListener('click', function(){
    location.href = 'registration.html';
})

//bottone di login
addBtn.addEventListener('click', sessionStart);

window.addEventListener("DOMContentLoaded", checkLogin());

function checkLogin() {
    var utente = JSON.parse(sessionStorage.getItem('utente'))
    if (utente != null) {
        logged.style.display = "block";
        //aggiunta dell'avatar scelto al momento della registrazione al login
        saluto.innerHTML = `<img src="${utente.avatar}" width="30px" heigth="30px" class="rounded-circle me-2"> <div class="pt-1">Ciao,&nbsp;${utente.nome}</div>`;
        saluto.classList.remove("interactiveBtn");
        saluto.style.padding = "0";
        let cartIco = document.querySelector(".fa-shopping-cart").parentElement.parentElement;
        cartIco.classList.add("d-block");
        cartIco.classList.remove("d-none");                    
        let menu = document.getElementById("menuLogin"); 
        if (winWidth >= 768) {
            menu.style.marginTop = "22px";                        
        }
        else {
            menu.style.marginTop = "13px";
        }
        menu.style.left = "2px"
        for (i = 0; i < login.length; i++) {
            login[i].classList.add("d-none");
            login[i].classList.remove("d-flex");
        }
    }
}

//funzione di login
function sessionStart() {
    fetch('http://localhost:3000/user')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        elencoUser = data;
        for (i = 0; i < elencoUser.length; i++) {
            //controllo dell'email e password al momento del login
            if (elencoUser[i].email === user.value && elencoUser[i].password === password.value) {
                sessionStorage.setItem('id', elencoUser[i].id);
                var utente = {'nome': elencoUser[i].nome, 'avatar': elencoUser[i].avatar, 'email': elencoUser[i].email, 'password': elencoUser[i].password};
                sessionStorage.setItem('utente', JSON.stringify(utente));
                    logged.style.display = "block";
                    //aggiunta dell'avatar scelto al momento della registrazione al login
                    saluto.innerHTML = `<img src="${utente.avatar}" width="30px" heigth="30px" class="rounded-circle me-2"> <div class="pt-1">Ciao,&nbsp;${utente.nome}</div>`;
                    saluto.classList.remove("interactiveBtn");
                    saluto.style.padding = "0";
                    let cartIco = document.querySelector(".fa-shopping-cart").parentElement.parentElement;
                    cartIco.classList.add("d-block");
                    cartIco.classList.remove("d-none");                    
                    let menu = document.getElementById("menuLogin"); 
                    if (winWidth >= 768) {
                        menu.style.marginTop = "22px";                        
                    }
                    else {
                        menu.style.marginTop = "13px";
                    }
                    menu.style.left = "2px"
                    for (i = 0; i < login.length; i++) {
                        login[i].classList.add("d-none");
                        login[i].classList.remove("d-flex");
                    }
            } else if (user.value == "" || password.value == "") {
                errore.style.display = "block"; 
                errore.innerHTML = "<b>Compila tutti i campi</b>";
            } else {
                errore.style.display = "block";
                errore.innerHTML = "<b>Accesso negato, email o password errati</b>";
            }
            }
        })
}

//funzione di logout
btnLogout.addEventListener('click', function (e) {
    e.preventDefault();
    //al logout la funzione fa scomparire l'avatar e ricomparire i pulsanti di registrazione e login
    logged.style.display = "none";
    sessionStorage.clear()
    for (i = 0; i < login.length; i++) {
        login[i].style.display = "inline-block";                            
        formClear();
    }
    saluto.innerHTML = "Login";
    saluto.style.padding = "8px";
    let div = document.getElementById("navbarSupportedContent");
    div.style.width = "100%";
    cart.classList.remove("d-block");
    cart.classList.add("d-none");
    saluto.classList.add("interactiveBtn");
    let menu = document.getElementById("menuLogin");
    for (i = 0; i < login.length; i++) {
        login[i].classList.remove("d-none");
        login[i].classList.add("d-flex");
    }
    if (winWidth >= 768) {
        menu.style.marginTop = "17px";
    }
    else {
        menu.style.marginTop = "8px";
    }
    menu.style.left = "-50px";
    errore.style.display = "none";  
})

//pulizia campi input dopo logout
function formClear() {
    user.value = "";
    password.value = "";
}
