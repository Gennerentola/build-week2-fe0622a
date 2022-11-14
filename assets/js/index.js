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
                saluto.innerHTML = `Ciao, ${user.value}`;
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
        }
})
}