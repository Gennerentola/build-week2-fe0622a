var user = document.getElementById('user');
var password = document.getElementById('password');
var addBtn = document.getElementById('btnLogin');
var login = document.querySelectorAll('.formLogin');
var logged = document.getElementById('formLogged');
var errore = document.getElementById('erroreLogin');
var btnLogout = document.getElementById('logout');
var saluto = document.getElementById('saluto');
var accediRespo = document.getElementById('accediRespo');
var url = 'http://localhost:3006/user';


//invio del tasto registrati alla home
document.getElementById('registratiRespo').addEventListener('click', function(){
    location.href = 'registrazione.html';
})
document.getElementById('registrati').addEventListener('click', function(){
    location.href = 'registrazione.html';
})



//bottone di login
addBtn.addEventListener('click', sessionStart);


//funzione di login
function sessionStart() {
    fetch('http://localhost:3006/user')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            elencoUser = data;
            for (i = 0; i < elencoUser.length; i++) {
                if (elencoUser[i].email === user.value && elencoUser[i].password === password.value) {
                    logged.style.display = "block";
                    saluto.innerHTML = `<img src="${elencoUser[i].avatar}" width="30px" heigth="30px" class="rounded-circle mx-2"
                    > Ciao,&nbsp;${elencoUser[i].nome}`;
                  //  saluto.style.marginRight = "30px";
                    for (i = 0; i < login.length; i++) {
                        login[i].style.display = "none";
                    }
                    return
                } else if (user.value == "" || password.value == "") {
                    errore.innerHTML = "Compila tutti i campi";
                } else {
                    errore.innerHTML = "Accesso negato, user o password sbagliati";
                }
            }
        })
}





    btnLogout.addEventListener('click', function (e) {
        e.preventDefault();
        logged.style.display = "none";
        for (i = 0; i < login.length; i++) {
            login[i].style.display = "block";
            saluto.innerHTML = "Login";
            formClear();
        }
})


function formClear() {
    user.value = "";
    password.value = "";
}

var userRespo = document.getElementById("userRespo");
var passwordRespo = document.getElementById("passRespo");
var addBtnRespo = document.getElementById("accediRespo");
var erroreRespo = document.getElementById("erroreRespo");
var salutoRespo = document.getElementById("salutoUtente");
var btnLogoutRespo = document.getElementById("logoutRespo");
var loggedRespo = document.getElementById("userMenuRespo");
var formLogin = document.getElementById("formRespo");
var registratiRespo = document.getElementById('registratiRespo');

addBtnRespo.addEventListener('click', sessionStartRespo)

function sessionStartRespo() {
    fetch('http://localhost:3006/user')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            elencoUser = data;
            for (i = 0; i < elencoUser.length; i++) {
                if (elencoUser[i].email === userRespo.value && elencoUser[i].password === passwordRespo.value) {
                    loggedRespo.style.display = "flex";
                    salutoRespo.innerHTML = `Ciao,&nbsp;${elencoUser[i].nome}`;
                    formLogin.style.display = 'none';
                    for (i = 0; i < login.length; i++) {
                        login[i].style.display = "none";
                    }
                    return
                } else if (user.value == "" || password.value == "") {
                    errore.innerHTML = "Compila tutti i campi";
                } else {
                    errore.innerHTML = "Accesso negato, user o password sbagliati";
                }
            }
        })
}


btnLogoutRespo.addEventListener('click', function (e) {
    e.preventDefault();
    loggedRespo.style.display = "none";
    formLogin.style.display = "block";
    salutoRespo.style.display =  "none";
    clearFormRespo();
})


function clearFormRespo() {
    userRespo.value = '';
    passwordRespo.value = '';
    registratiRespo.style.display = 'inline-block';
}

