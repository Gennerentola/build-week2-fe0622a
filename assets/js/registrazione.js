// CREAZIONE CLASSE USER
class Users {
  constructor(
    _nome,
    _cognome,
    _email,
    _password,
    _indirizzo,
    _citta,
    _cap,
    _avatar,
    _cart= []
  ) {
    this.nome = _nome;
    this.cognome = _cognome;
    this.email = _email;
    this.password = _password;
    this.indirizzo = _indirizzo;
    this.citta = _citta;
    this.cap = _cap;
    this.avatar = _avatar;
    this.cart = _cart
  }
}

var url = 'http://localhost:3000/user';



//RICEZIONE DATI DELL'UTENTE DAL FORM
let f = document.getElementById('form');
f.addEventListener('submit', function (e) {
  e.preventDefault();
  let nome = e.target[0].value;
  let cognome = e.target[1].value;
  let email = e.target[2].value;
  let password = e.target[3].value;
  let indirizzo = e.target[4].value;
  let citta = e.target[5].value;
  let cap = e.target[6].value;
  let avatar = Array.from(document.getElementsByName("test")).find(r => r.checked).value;

  //regex per controllo email
  var myRegExMail = /^[A-z0-9\.\+_-]+@[A-z0-9\._-]+\.[A-z]{2,6}$/;
  
  //regex per controllo password
  var myRegExPass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  
  if (myRegExMail.test(email)) {
    
    if(myRegExPass.test(password)){
      
      //instanziamento user
      let newUser = new Users(nome, cognome, email, password, indirizzo,
        citta, cap, avatar);
        
        //richiamo funzione controllo meail
        controlEmail(newUser);
        
      } else {
        alert('Password non valida!')
        return;
      }
    }
    else {
      
      alert('Indirizzo email non valido');
      return;
    }
  })


//tooltip per suggerimento formato della password
 var tooltipPass = document.getElementById('tooltipPass');

function showTip() {
  tooltipPass.classList.add('showTooltip');
  tooltipPass.classList.remove('hideTooltip');
}
function hideTip() {
  tooltipPass.classList.add('hideTooltip');
  tooltipPass.classList.remove('showTooltip');
}  

//funzione mostra/nascondi password cliccando sull'icona dell'occhio
function mostra() {
var icona = document.getElementById("icona_password");
var x = document.getElementById("password");
if (x.type === "password") {
    x.type = "text";
    icona.classList.remove("bi-eye-fill");
    icona.classList.add("bi-eye-slash-fill")
} else {
    x.type = "password";
    icona.classList.remove("bi-eye-slash-fill")
    icona.classList.add("bi-eye-fill");
}
} 

//funzione di aggiunta dell'utente al JSON db
async function aggiungi(user) {
  let response = await fetch('http://localhost:3000/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });   
  location.href= 'index.html';
}

//funzione di controllo dell'email
function controlEmail(user) {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      elencoUser = data;
      //estrazione delle email dagli user
      const email = elencoUser.map((user) => user.email);
      let mail = document.getElementById('email').value;
      //controllo se la nuova email inserita è gia stata registrata
      if (email.includes(mail) == false) {
        aggiungi(user);
      } else {
        document.getElementById('errore').innerHTML='Controlla i dati inseriti'
      }
    });
}

//BOTTONE per mostrare avatar
btn = document.getElementById('showAvatar');
btn.addEventListener('click', drop)

//funzione mostra avatar
function drop() {
  document.getElementById("menu_drop").classList.toggle("mostra");
}
