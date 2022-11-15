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


var user2 = document.getElementById("userRespo");
var password2 = document.getElementById("passRespo");
var addBtn2 = document.getElementById("accediRespo");
var logged = document.getElementById("formLogged");
var errore2 = document.getElementById("erroreRespo");
var saluto2 = document.getElementById("salutoRespo");
var btnLogout2 = document.getElementById("logoutRespo");

sessionStart2();
logout3();
function sessionStart2() {
    addBtn2.addEventListener('click', function (e) {
        e.preventDefault();
        if (user2.value == "user" && password2.value == "pass") {
            logged.style.display = "block";
            for (i = 0; i < login.length; i++) {
                login[i].style.display = "none";
                saluto2.innerHTML = `Ciao,&nbsp;${user2.value} <div id="userMenuRespo"> <a class="nav-link yellow" href="#"><i class="fas fa-cog m-1"></i>Impostazioni</a><a class="nav-link yellow" href="#"><i class="fas fa-user m-1"></i>Profilo</a><a class="nav-link yellow" href="#"><i class="fas fa-envelope m-1"></i>Messaggi</a><button class="nav-link yellow btn" type="button" onClick="logout3" href="#" id="logoutRespo"><i class="fas fa-running m-1"></i>Logout</button></div>`;
            }
        } else if (user2.value == "" || password2.value == ""){
           errore2.innerHTML = "Compila tutti i campi";
        } else {
           errore2.innerHTML = "Accesso negato, user o password sbagliati";
        }
    })
}

function logout3() {
    btnLogout2.addEventListener('click', function (e) {
        e.preventDefault();
        logged.style.display = "none";
        for (i = 0; i < login.length; i++) {
            login[i].style.display = "block";
            saluto.innerHTML = "Login";
            formClear();
        }
})
}