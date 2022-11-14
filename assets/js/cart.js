var emptyCartPlaceholder = document.getElementById("emptyCartPlaceholder");
var emptyCartBtn = document.getElementById("emptyCartBtn");
var cartList = document.getElementById("cartList");
var arrayCart = [];
var svuotaBtn = document.getElementById("svuota");
var barraPagamento = document.getElementById("barraPagamento");
var costoTotale = document.getElementById("costoTotale");
var cartReview = document.getElementById("riepilogo");

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
                svuotaBtn.style.display= "block";
                barraPagamento.classList.remove("d-none");
				emptyCartPlaceholder.style.display = "none";
                emptyCartBtn.style.display = "none";
				data.map(function (element) {
					cartList.innerHTML += `<dt><img class="border border-primary w-25 me-2" src=${element.poster_path} alt="poster"> ${element.title} <button type="button" class="btn btn-danger float-end" onClick="rimuovi(${element.id})"><i class="fas fa-minus"></i></button></dt>
                    <dd><span class="float-end prezzoSingolo">${element.price}€</span></dd>
                    <hr>`;
                    cartReview.innerHTML += `<li class="list-group-item" ><img class="border border-primary my-1" width="10%" src=${element.poster_path} alt="poster"> ${element.title}<span class="float-end">${element.price}€</span></li>`
				});
                sommaPrezzi();
			}
		});
}

function sommaPrezzi() {
    let arrayPrezzi = document.querySelectorAll(".prezzoSingolo");
    let somma = 0;

    for (let i=0; i<arrayPrezzi.length; i++)
    somma += parseFloat(arrayPrezzi[i].innerHTML);
    costoTotale.innerHTML = `${somma}€`;
}

function rimuovi(id) {
	if (confirm("Sei sicuro di voler cancellare?")==true) {
		fetch(`http://localhost:3000/cart/${id}`, {
			method: 'DELETE'
		});
	}
}

svuotaBtn.addEventListener("click", function () {
    if (confirm("Sei sicuro di voler rimuovere tutti gli elementi dal carrello?") == true) {
        arrayCart.forEach(element => {
            fetch(`http://localhost:3000/cart/${element.id}`, {
                method: 'DELETE'
            })
        });
    }
})

var buyBtn = document.getElementById("acquistoEffettuato");

buyBtn.addEventListener("click", function() {
    arrayCart.forEach(element => {
        fetch(`http://localhost:3000/cart/${element.id}`, {
            method: 'DELETE'
        })
    });
})