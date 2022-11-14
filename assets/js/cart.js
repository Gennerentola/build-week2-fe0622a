var jsonPath = "http://localhost:3000/cart";
var emptyCartPlaceholder = document.getElementById("emptyCartPlaceholder");
var emptyCartBtn = document.getElementById("emptyCartBtn");
var cartList = document.getElementById("cartList");
var arrayCart = [];

function printData() {
	fetch("http://localhost:3000/cart")
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			arrayCart = data;
			if (arrayCart.length > 0) {
				emptyCartPlaceholder.style.display = "none";
                emptyCartBtn.style.display = "none";
				data.map(function (element) {
					cartList.innerHTML += `<dt><img class="rounded-cirlce border border-primary w-25" src=${element.poster_path} alt="poster"> ${element.title}</dt>
                    <dd><span class="float-end">${element.price}€</span></dd>
                    <div class="fixed-bottom d-flex justify-content-between align-items-center py-2 bg-light">
                    <p class="ms-2">Totale: </p>
                    <button type="button" class="btn btn-warning me-2">Procedi all'acquisto</button>
                    </div>`;
				});
			}
		});
}
printData();