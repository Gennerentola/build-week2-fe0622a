var emptyCartPlaceholder = document.getElementById("emptyCartPlaceholder");
var emptyCartBtn = document.getElementById("emptyCartBtn");
var cartList = document.getElementById("cartList");
var arrayCart = [];
var svuotaBtn = document.getElementById("svuota");
var barraPagamento = document.getElementById("barraPagamento");
var costoTotale = document.getElementById("costoTotale");
var cartReview = document.getElementById("riepilogo");
var numArticoli = document.getElementById("numArticoli");
var idUtente = sessionStorage.getItem('id');
var recapAddress = document.getElementById("indirizzoConsegna");
var utente = JSON.parse(sessionStorage.getItem('utente'))

window.addEventListener("DOMContentLoaded", init);

if (utente) {
    logged.style.display = "block";
    //aggiunta dell'avatar scelto al momento della registrazione al login
    saluto.innerHTML = `<img src="${utente.avatar}" width="30px" heigth="30px" class="rounded-circle mx-2"> Ciao,&nbsp;${utente.nome}`;
    saluto.classList.remove("interactiveBtn");
    login.forEach(element => {
        element.style.display = "none";
    })
}


function init() {
    visualizzaCarrello();
    svuotaBtn.style.display = "none";
    barraPagamento.classList.add("d-none");
}

function visualizzaCarrello() {
    fetch(`http://localhost:3000/user/${idUtente}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            arrayCart = data;
            if (arrayCart.cart.length > 0 && arrayCart.cart.length) {
                svuotaBtn.style.display = "block";
                barraPagamento.classList.remove("d-none");
                emptyCartPlaceholder.style.display = "none";
                emptyCartBtn.style.display = "none";

                for (i=0; i<arrayCart.cart.length; i++) {
                    //Definizione elementi HTML
                    var dt = document.createElement("dt");
                    dt.classList.add("list-group-item");
                    var dd = document.createElement("dd");
                    dd.classList.add("list-group-item", "mb-0");
                    var cartImg = document.createElement("img");
                    cartImg.classList.add("border", "border-primary", "me-2");
                    cartImg.setAttribute("src", arrayCart.cart[i].poster_path);
                    cartImg.setAttribute("alt", "poster");
                    cartImg.style.width = "15%";
                    var recapImg = document.createElement("img");
                    recapImg.classList.add("my-1", "me-2");
                    recapImg.setAttribute("src", arrayCart.cart[i].poster_path);
                    recapImg.setAttribute("alt", "poster");
                    recapImg.style.width = "15%";
                    var span = document.createElement("span");
                    span.classList.add("float-end", "fs-3", "prezzoSingolo")
                    span.innerHTML = `${arrayCart.cart[i].price.toFixed(2)}€`;
                    var small = document.createElement("small");
                    small.classList.add("float-end", "fs-3");
                    small.innerHTML = arrayCart.cart[i].price.toFixed(2);
                    var li = document.createElement("li");
                    li.classList.add("list-group-item");
                    var removeBtn = document.createElement("button");
                    removeBtn.classList.add("btn", "btn-danger", "float-end")
                    removeBtn.innerHTML = `<i class="fas fa-minus"></i>`;
                    //Richiamo funzione per eliminare il carrello
                    removeBtn.setAttribute("onclick",`rimuovi(${arrayCart.cart[i].id})`)
                    
                    //Costruzione <dt>
                    dt.append(cartImg, removeBtn);
                    //Costruzione <dd>
                    dd.append(span);

                    //Costruzione <li>
                    li.append(recapImg, small);

                    cartList.append(dt, dd);
                    dt.innerHTML += arrayCart.cart[i].title;
                    cartReview.appendChild(li);
                    li.innerHTML += arrayCart.cart[i].title;
                    recapAddress.innerHTML = `Indirizzo di consegna: ${arrayCart.indirizzo} ${arrayCart.citta} ${arrayCart.cap}`;
                };
                numArticoli.innerHTML += `<i class="fas fa-boxes"></i> Articoli nel carrello: ${arrayCart.cart.length}`;
                sommaPrezzi();
            } else {
                barraPagamento.classList.remove("d-lg-block");
                barraPagamento.classList.add("d-none");
                return;
            }
        });
}

function sommaPrezzi() {
    let arrayPrezzi = document.querySelectorAll(".prezzoSingolo");
    let somma = 0;

    for (let i = 0; i < arrayPrezzi.length; i++)
        somma += Number(arrayPrezzi[i].innerHTML);
    costoTotale.innerHTML = `${somma.toFixed(2)}€`;
}

async function rimuovi(id) {
    if (confirm("Sei sicuro di voler rimuovere l'oggetto?") == true) {
        arrayCart.cart.splice(id-1, 1)
        let options = {
            method: "PATCH",
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify({
            "cart" : arrayCart.cart
           })
         }
        
          let response = await fetch(`http://localhost:3000/user/${idUtente}`, options)
    }
}

svuotaBtn.addEventListener("click", function () {
    if (confirm("Sei sicuro di voler rimuovere tutti i prodotti dal carrello?") == true) {
        svuotaCarrello();
    }
})

async function svuotaCarrello() {
    let options = {
      method: "PATCH",
     headers: {
         "Content-Type": "application/json"
     },
     body: JSON.stringify({
      "cart" : []
     })
   }
  
    let response = await fetch(`http://localhost:3000/user/${idUtente}`, options)
  }

var buyBtn = document.getElementById("acquistoEffettuato");

buyBtn.addEventListener("click", function () {
    svuotaCarrello();
})


///////////////////////////////////////////// MEDIA QUERIES JS ///////////////////////////////////////////////


// Riposizionare bottone pagamento
var paySection = document.getElementById("paySection");
var widthLg = window.matchMedia("(min-width: 992px)");

if (widthLg.matches) {
    barraPagamento.classList.remove("fixed-bottom", "d-flex");
    barraPagamento.classList.add("rounded", "border");
    paySection.classList.add("position-fixed", "end-0");
    barraPagamento.classList.add("d-block");
}

window.addEventListener("resize", () => {
    if (widthLg.matches) {
        barraPagamento.classList.remove("fixed-bottom", "d-flex");
        barraPagamento.classList.add("rounded", "border");
        paySection.classList.add("position-fixed", "end-0");   
        barraPagamento.classList.add("d-block");
    }
})

var fixWidth = window.matchMedia("(max-width: 991px)");

window.addEventListener("resize", () => {
    if (fixWidth.matches) {
        barraPagamento.classList.add("fixed-bottom", "d-flex");
        barraPagamento.classList.remove("rounded", "border");
        paySection.classList.remove("position-fixed", "end-0");    
        barraPagamento.classList.remove("d-block");
    }
})

