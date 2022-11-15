var user = document.getElementById("user");
var password = document.getElementById("password");
var addBtn = document.getElementById("btnLogin");
var login = document.querySelectorAll(".formLogin");
var logged = document.getElementById("formLogged");
var errore = document.getElementById("erroreLogin");
var btnLogout = document.getElementById("logout");
var saluto = document.getElementById("saluto");

sessionStart();
logout();

function sessionStart() {
    addBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (user.value == "user" && password.value == "pass") {
            logged.style.display = "block";
            for (i = 0; i < login.length; i++) {
                login[i].style.display = "none";
                saluto.innerHTML = `Ciao,&nbsp;${user.value}`;
                saluto.style.marginLeft = "40px"
            }
        } else if (user.value == "" || password.value == ""){
           errore.innerHTML = "Compila tutti i campi";
        } else {
           errore.innerHTML = "Accesso negato, user o password sbagliati";
        }
    })
}

function logout() {
    btnLogout.addEventListener('click', function (e) {
        e.preventDefault();
        logged.style.display = "none";
        for (i = 0; i < login.length; i++) {
            login[i].style.display = "block";
            saluto.innerHTML = "Login";
            formClear();
        }
})
}

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

sessionStartRespo();
logoutRespo();
function sessionStartRespo() {
    addBtnRespo.addEventListener('click', function (e) {
        e.preventDefault();
        if (userRespo.value == "user" && passwordRespo.value == "pass") {
                formLogin.style.display = "none";
                loggedRespo.style.display = "flex";
                salutoRespo.innerHTML = `Ciao, ${userRespo.value}`;
        } else if (userRespo.value == "" || passwordRespo.value == ""){
           erroreRespo.innerHTML = "Compila tutti i campi";
        } else {
           erroreRespo.innerHTML = "Accesso negato, user o password sbagliati";
           
        }
    })
}

function logoutRespo() {
    btnLogoutRespo.addEventListener('click', function (e) {
        e.preventDefault();
        loggedRespo.style.display = "none";
        formLogin.style.display = "block";
        salutoRespo.style.display =  "none"
        }
)
}