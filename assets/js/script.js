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
      _cart = []
    ) {
      this.nome = _nome;
      this.cognome = _cognome;
      this.email = _email;
      this.password = _password;
      this.indirizzo = _indirizzo;
      this.citta = _citta;
      this.cap = _cap;
      this.cart = _cart;
    }
  }
  
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
  
    //ISTANZIAMENTO DELL'USER CON PARAMENTRI
    let user = new Users(nome, cognome, email, password, indirizzo, citta, cap);
    console.log(user);
  
    //richiamo della funzione per il controllo dell'email(se gia esistente)
    controlEmail(user);
  });
  
  //funzione di aggiunta dell'utente al JSON db
  async function aggiungi(user) {
    let response = await fetch('http://localhost:3001/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  }
  
  //funzione di controllo dell'email
  async function controlEmail() {
    let response = await fetch('http://localhost:3001/user');
  }
  function controlEmail(user) {
    fetch('http://localhost:3001/user')
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
          console.log('utente esistente');
        }
      });
  }
  