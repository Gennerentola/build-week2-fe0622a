var address = window.location.href;
var id = parseInt(address.slice(address.lastIndexOf("id")+3));
var type = address.slice(address.lastIndexOf("type")+5, address.lastIndexOf("id")-1);
var contentBox = document.getElementById("contentRow");
const mesi = new Array("Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre");
const catalog = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/";
const catalog2 = "https://www.themoviedb.org/t/p/w533_and_h300_bestv2/";
var content;
var analysis;
var recommendation;
var date;
var priceBluRay = document.getElementById("priceBlu-ray");
var priceDvD = document.getElementById("priceDVD");
var price3D = document.getElementById("price3D");
var price4K = document.getElementById("price4K");
var addToCart = document.getElementById("addToCart");
var pBR;
var pDVD;
var p3D;
var p4K;
var amountDVD;
var amountBR;
var amount3D;
var amount4K;
var item;
const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
tomorrow.setHours(0, 0, 0, 0);

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));


var utente = JSON.parse(sessionStorage.getItem('utente'))

if (utente) {
    logged.style.display = "block";
    //aggiunta dell'avatar scelto al momento della registrazione al login
    saluto.innerHTML = `<img src="${utente.avatar}" width="30px" heigth="30px" class="rounded-circle mx-2"> Ciao,&nbsp;${utente.nome}`;
    saluto.classList.remove("interactiveBtn");
    login.forEach(element => {
        element.style.display = "none";
    })
}

class Item {
    constructor(_priceDVD, _priceBR, _price3D, _price4K, _amountDVD, _amountBR, _amount3D, _amount4K, _id) {      
      this.priceDVD = _priceDVD;
      this.priceBR = _priceBR;
      this.price3D = _price3D;
      this.price4K = _price4K;
      this.amountDVD = _amountDVD;
      this.amountBR = _amountBR;
      this.amount3D = _amount3D;
      this.amount4K = _amount4K;
      this.id = _id     
    }
}

class Cart {
    constructor(_title, _poster_path, _price, _id) {
        this.title = _title;
        this.poster_path = _poster_path;
        this.price = _price;
        this.id = _id
    }
}

window.addEventListener("DOMContentLoaded", getContent);

addToCart.addEventListener("click", (e) => {
    let price = parseFloat(document.querySelector(".price").textContent);
    let userId = sessionStorage.getItem('id');
    let user = JSON.parse(sessionStorage.getItem('utente'));
    fetch('http://localhost:3000/user/' + userId).then((response) => {
                return response.json();			
            }).then((data) => {
            let result = data;
            if (result.email == user.email && result.password == user.password) {
                    fetch('http://localhost:3000/user/' + userId).then((response) => {
                            return response.json();			
                        }).then((data) => {
                            let userData = data;
                            addItemToCart(userData, price);
                        });
            }
            else {
                sessionStorage.clear();
                window.location = "http://127.0.0.1:5500/registration.html";
            }

            }).catch((error) => {
                window.location = "http://127.0.0.1:5500/registration.html";
            });
    

})

async function addItemToCart(userData, price) {
    let user = userData;
    let title = document.getElementById("title").innerText;
    let poster = catalog + content.poster_path;
    let cart = new Cart(title, poster, price, id);
    user.cart.push(cart);
    let response = await fetch('http://localhost:3000/user/' + user.id, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(user)
	});

}





function review() {
    fetch('https://api.themoviedb.org/3/' + type + '/' + id + '/reviews?api_key=cdeff0f8f48e4e92d2817d7f0da9db18&language=it&page=1').then((response) => {
			return response.json();			
		}).then((data) => {
			analysis = data.results[0].content;
            document.getElementById("review").innerHTML = "<b>Analisi Critica: </b>" + analysis;    
    }).catch((error) => {
        document.getElementById("review").innerHTML = "Non sono presenti recensioni al momento.";
    })
}

function recommend() {
    fetch('https://api.themoviedb.org/3/' + type + '/' + id + '/recommendations?api_key=cdeff0f8f48e4e92d2817d7f0da9db18&language=it&page=1').then((response) => {
			return response.json();			
		}).then((data) => {
			recommendation = data.results;
            for (i = 0; i < 9; i++)  {
                document.getElementById("carousel0" + (i+1)).src = catalog + recommendation[i].poster_path;
                document.getElementById("carousel0" + (i+1)).alt = catalog + ((recommendation[i].title != null) ? recommendation[i].title : recommendation[i].name);
                document.getElementById("carousel0" + (i+1)).addEventListener("click", function(e)  {
                    e.preventDefault();
                    let i = parseInt(this.id.charAt(9))-1;
                    window.location = "item.html?media_type=" + recommendation[i].media_type + "&id=" + recommendation[i].id;
                });                               
            }  
    });
}

function checkStore() {
    fetch('http://localhost:3000/item/' + id).then((response) => {
            if(!response.ok) {                
                if ((today.getFullYear() - date.getFullYear()) < 2) {
                    pBR = 19.90;
                    pDVD = 14.90;
                    p3D = 24.90;
                    p4K = 29.90;
                }
                else if ((today.getFullYear() - date.getFullYear()) < 4) {
                    pBR = 16.90;
                    pDVD = 9.90;
                    p3D = 19.90;
                    p4K = 25.90;
                }
                else if ((today.getFullYear() - date.getFullYear()) < 8) {
                    pBR = 14.90;
                    pDVD = 7.90;
                    p3D = 18.90;
                    p4K = 25.90;
                }
                else if ((today.getFullYear() - date.getFullYear()) < 12) {
                    pBR = 14.90;
                    pDVD = 7.90;
                    p3D = 18.90;
                    p4K = 0;
                }
                else if ((today.getFullYear() - date.getFullYear()) < 20) {
                    pBR = 14.90;
                    pDVD = 6.90;
                    p3D = 16.90;
                    p4K = 0;
                }
                else {
                    pBR = 14.90;
                    pDVD = 5.90;
                    p3D = 0;
                    p4K = 0;
                }
                priceBluRay.innerText = pBR + "€";
                priceDvD.innerText = pDVD + "€";
                price3D.innerText = p3D + "€";
                price4K.innerText = p4K + "€";
                amountDVD = Math.floor(Math.random()*10);
                amountBR = Math.floor(Math.random()*10);
                amount3D = Math.floor(Math.random()*10);
                amount4K = Math.floor(Math.random()*10);
                item = new Item(pDVD, pBR, p3D, p4K, amountDVD, amountBR, amount3D, amount4K, id);
                addItem(item);
            }
            else {
                return response.json();	
            }					
		}).then((data) => {
            if (data) {
                item = data;
                priceBluRay.innerText = item.priceBR.toFixed(2) + "€";                
                priceDvD.innerText = item.priceDVD.toFixed(2) + "€";
                price3D.innerText = item.price3D.toFixed(2) + "€";
                price4K.innerText = item.price4K.toFixed(2) + "€";
                amountDVD = item.amountDVD;
                amountBR = item.amountBR;
                amount3D = item.amount3D;
                amount4K = item.amount4K;
                if (amountDVD == 0) {
                    priceDvD.parentElement.classList.add("d-none");
                    priceDvD.parentElement.classList.remove("d-flex");
                }
                if (amountBR == 0) {
                    priceBluRay.parentElement.classList.add("d-none");
                    priceBluRay.parentElement.classList.remove("d-flex");
                }
                if (price3D.innerText == "0.00€" || amount3D == 0) {
                    price3D.parentElement.classList.add("d-none");
                    price3D.parentElement.classList.remove("d-flex");
                }
                if (price4K.innerText == "0.00€" || amount4K == 0) {
                    price4K.parentElement.classList.add("d-none");
                    price4K.parentElement.classList.remove("d-flex");
                }
                setPrice(item.priceDVD.toFixed(2) + "€");                                 
            }             
        });
}

function setPrice(x) {
    document.querySelectorAll(".price")[0].innerText = x;    
    document.querySelectorAll(".price")[1].innerText = x;
}


async function addItem(item) {
	let response = await fetch('http://localhost:3000/item/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(item)
	});
}



function getContent() {    
    fetch('https://api.themoviedb.org/3/' + type + '/' + id + '?api_key=cdeff0f8f48e4e92d2817d7f0da9db18&language=it&append_to_response=videos').then((response) => {
			return response.json();			
		}).then((data) => {
			content = data;
            date = ((type == "movie") ? content.release_date : content.first_air_date);
            date = new Date(date); 
            checkStore();
            let rate = Math.ceil(content.vote_average);
            setTimeout(review(),600);
            recommend();            
            switch (rate) {
                case 10 :
                    document.querySelectorAll(".rate")[0].checked = "true";
                    break;
                case 9 :
                    document.querySelectorAll(".rate")[1].checked = "true";
                    break;
                case 8 :
                    document.querySelectorAll(".rate")[2].checked = "true";
                    break;
                case 7 :
                    document.querySelectorAll(".rate")[3].checked = "true";
                    break;
                case 6 :
                    document.querySelectorAll(".rate")[4].checked = "true";
                    break;
                case 5 :
                    document.querySelectorAll(".rate")[5].checked = "true";
                    break;
                case 4 :
                    document.querySelectorAll(".rate")[6].checked = "true";
                    break;
                case 3 :
                    document.querySelectorAll(".rate")[7].checked = "true";
                    break;
                case 2 :
                    document.querySelectorAll(".rate")[8].checked = "true";
                    break;
                default :
                    document.querySelectorAll(".rate")[9].checked = "true";
                    break;
            }
            document.getElementById("title").innerHTML = ((content.title != null) ? content.title : content.name);
            document.getElementById("dvdPic").setAttribute("alt", ((content.title != null) ? content.title : content.name));
            document.getElementById("dvdPic").setAttribute("src", catalog + content.poster_path);
            document.getElementById("tagline").innerText = "« " + content.tagline + " »";
            document.getElementById("tagline").style.marginTop = "40px";
            document.getElementById("overview").innerText = content.overview;
            document.getElementById("tomorrow").innerHTML = `<b>domani, ${tomorrow.getDate()} ${mesi[tomorrow.getMonth()]}</b>.`;
            document.getElementById("hours").innerHTML = parseInt((((tomorrow - today)/1000)/60)/60) + " min e " + parseInt((((tomorrow - today)/1000)/60)%60) + " min.";
            if (content.videos.results != "") {
                document.getElementById("trailer").src = "https://www.youtube.com/embed/" + content.videos.results[0].key;
                document.getElementById("trailer").title = content.videos.results[0].name;
            }
            else {
                document.getElementById("trailer").parentElement.innerHTML = `<img class="px-2" src="${catalog2}${content.backdrop_path}" width="100%" style="border-radius:40px"/>`;
            }
        });    
}
