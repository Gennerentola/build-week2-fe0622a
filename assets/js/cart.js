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

class Store {
    constructor (_income = 0) {
        this.money = _income
    }
}

var store = new Store;

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
                    span.classList.add("float-end");
                    span.classList.add("fs-3");
                    span.classList.add("prezzoSingolo");
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
        somma += parseFloat(arrayPrezzi[i].innerHTML);
    costoTotale.innerHTML = `${somma.toFixed(2)}€`;
}

async function rimuovi(id) {
    console.log(id);
    if (confirm("Sei sicuro di voler rimuovere l'oggetto?") == true) {
        for (i = 0; i < arrayCart.cart.length; i++) {
            if (arrayCart.cart[i].id == id) {
                arrayCart.cart.splice(i,1);
            }
        }        
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
    aggiornaStore(arrayCart);    
})

async function aggiornaStore(user) {
    let cart = user.cart;
    let ids = [];
    let price = [];
    let sum = 0;
    for (i = 0; i < cart.length; i++) {
        ids[i] = cart[i].id;
        price[i] = cart[i].price;
        sum += price[i];
    }    
    fetch('http://localhost:3000/store/1').then((response) => {
        return response.json();			
        }).then(async (data) => {
            store = data;            
            store.money += sum;
            let response = await fetch('http://localhost:3000/store/' + 1 , {
		    method: 'PUT',
		    headers: {
			'Content-Type': 'application/json;charset=utf-8',
		            },
		    body: JSON.stringify(store)
            });                   
	});

    //rimuove gli oggetti dal campionario
    for (i = 0; i < ids.length; i++) {
        fetch('http://localhost:3000/item/' + ids[i]).then((response) => {
            return response.json();			
        }).then(async (data) => {
            let item = data;
            if (price[0] == item.priceDVD) {
                item.amountDVD--;
            }
            else if (price[0] == item.priceBR) {
                item.amountBR--;
            }
            else if (price[0] == item.price3D) {
                item.amount3D--;
            }
            else {
                item.amount4K--;
            }
            price[0] = "";
            price.shift;

            let response = await fetch('http://localhost:3000/item/' + item.id , {
		    method: 'PUT',
		    headers: {
			'Content-Type': 'application/json;charset=utf-8',
		            },
		    body: JSON.stringify(item)
            });  
            
        });
    }
    svuotaCarrello(user)
}

async function svuotaCarrello(user) {
    let options = {
      method: "PATCH",
     headers: {
         "Content-Type": "application/json"
     },
     body: JSON.stringify({
      "cart" : []
     })
   }
  
    let response = await fetch(`http://localhost:3000/user/`+ user.id, options)
  }


    



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

