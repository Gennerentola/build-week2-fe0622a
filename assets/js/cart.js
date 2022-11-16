var emptyCartPlaceholder = document.getElementById("emptyCartPlaceholder");
var emptyCartBtn = document.getElementById("emptyCartBtn");
var cartList = document.getElementById("cartList");
var arrayCart = [];
var svuotaBtn = document.getElementById("svuota");
var barraPagamento = document.getElementById("barraPagamento");
var costoTotale = document.getElementById("costoTotale");
var cartReview = document.getElementById("riepilogo");
var numArticoli = document.getElementById("numArticoli");

window.addEventListener('DOMContentLoaded', init);

function init() {
    visualizzaCarrello();
    svuotaBtn.style.display = "none";
    barraPagamento.classList.add("d-none");
}

function visualizzaCarrello() {
    fetch("http://localhost:3000/cart")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            arrayCart = data;
            if (arrayCart.length > 0) {
                svuotaBtn.style.display = "block";
                barraPagamento.classList.remove("d-none");
                emptyCartPlaceholder.style.display = "none";
                emptyCartBtn.style.display = "none";

                data.map(function (element) {
                    //Definizione elementi HTML
                    var dt = document.createElement("dt");
                    dt.classList.add("list-group-item");
                    var dd = document.createElement("dd");
                    dd.classList.add("list-group-item", "mb-0");
                    var cartImg = document.createElement("img");
                    cartImg.classList.add("border", "border-primary", "me-2");
                    cartImg.setAttribute("src", element.poster_path);
                    cartImg.setAttribute("alt", "poster");
                    cartImg.style.width = "15%";
                    var recapImg = document.createElement("img");
                    recapImg.classList.add("my-1", "me-2");
                    recapImg.setAttribute("src", element.poster_path);
                    recapImg.setAttribute("alt", "poster");
                    recapImg.style.width = "15%";
                    var span = document.createElement("span");
                    span.classList.add("float-end", "fs-3", "prezzoSingolo")
                    span.innerHTML = element.price;
                    var small = document.createElement("small");
                    small.classList.add("float-end", "fs-3");
                    small.innerHTML = element.price;
                    var li = document.createElement("li");
                    li.classList.add("list-group-item");
                    var removeBtn = document.createElement("button");
                    removeBtn.classList.add("btn", "btn-danger", "float-end")
                    removeBtn.innerHTML = `<i class="fas fa-minus"></i>`;
                    //Richiamo funzione per eliminare il carrello
                    removeBtn.setAttribute("onclick",`rimuovi(${element.id})`)
                    
                    //Costruzione <dt>
                    dt.append(cartImg, removeBtn);
                    //Costruzione <dd>
                    dd.append(span);

                    //Costruzione <li>
                    li.append(recapImg, small);

                    cartList.append(dt, dd);
                    dt.innerHTML += element.title;
                    cartReview.appendChild(li);
                    li.innerHTML += element.title;
                });
                numArticoli.innerHTML += `<i class="fas fa-boxes"></i> Articoli nel carrello: ${arrayCart.length}`;
                sommaPrezzi();
            } else {
                barraPagamento.classList.remove("d-lg-block")
            }
        });
}

function sommaPrezzi() {
    let arrayPrezzi = document.querySelectorAll(".prezzoSingolo");
    let somma = 0;

    for (let i = 0; i < arrayPrezzi.length; i++)
        somma += Number(arrayPrezzi[i].innerHTML);
    costoTotale.innerHTML = `${somma}€`;
}

function rimuovi(id) {
    if (confirm("Sei sicuro di voler cancellare?") == true) {
        fetch(`http://localhost:3000/cart/${id}`, {
            method: 'DELETE'
        });
    }
}

svuotaBtn.addEventListener("click", function () {
    if (confirm("Sei sicuro di voler rimuovere tutti i prodotti dal carrello?") == true) {
        svuotaCarrello();
    }
})

function svuotaCarrello() {
    arrayCart.forEach(element => {
        fetch(`http://localhost:3000/cart/${element.id}`, {
            method: 'DELETE'
        })
    });
}

var buyBtn = document.getElementById("acquistoEffettuato");

buyBtn.addEventListener("click", function () {
    arrayCart.forEach(element => {
        fetch(`http://localhost:3000/merceVenduta`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(element),
        })
    });
    svuotaCarrello();
})


///////////////////////////////////////////// MEDIA QUERIES JS ///////////////////////////////////////////////


// Riposizionare bottone pagamento
var paySection = document.getElementById("paySection");
var widthLg = window.matchMedia("(min-width: 992px)");

window.addEventListener("resize", () => {
    if (widthLg.matches) {
        barraPagamento.classList.remove("fixed-bottom");
        barraPagamento.classList.add("rounded");
        paySection.classList.add("position-fixed", "end-0");
    }
})

var fixWidth = window.matchMedia("(max-width: 991px)");

window.addEventListener("resize", () => {
    if (fixWidth.matches) {
        barraPagamento.classList.add("fixed-bottom");
        barraPagamento.classList.remove("rounded");
        paySection.classList.remove("position-fixed", "end-0");
    }
})

