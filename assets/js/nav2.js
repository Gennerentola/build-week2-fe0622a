var user = document.getElementById('user');
var password = document.getElementById('password');
var addBtn = document.getElementById('btnLogin');
var login = document.querySelectorAll('.formLogin');
var logged = document.getElementById('formLogged');
var errore = document.getElementById('erroreLogin');
var btnLogout = document.getElementById('logout');
var saluto = document.getElementById('saluto');
var url = 'http://localhost:3000/user';


//invio del tasto registrati alla home
document.getElementById('registrati').addEventListener('click', function(){
    location.href = 'registration.html';
})



//bottone di login
addBtn.addEventListener('click', sessionStart);


//funzione di login
function sessionStart() {
    fetch('http://localhost:3000/user')
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
                    saluto.classList.remove("interactiveBtn");
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




//funzione di logout
    btnLogout.addEventListener('click', function (e) {
        e.preventDefault();
        logged.style.display = "none";
        for (i = 0; i < login.length; i++) {
            login[i].style.display = "inline";
            saluto.innerHTML = "Login";
            saluto.classList.add("interactiveBtn");
            formClear();
        }
})

//pulizia campi input dopo logout
function formClear() {
    user.value = "";
    password.value = "";
}
