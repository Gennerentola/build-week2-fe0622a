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
const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
tomorrow.setHours(0, 0, 0, 0);

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

function check(id) {
    console.log(id);        /* va messa la funzione per comprare e cambiare i tag .price */   
}

window.addEventListener("DOMContentLoaded", getContent);

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

function getContent() {
    fetch('https://api.themoviedb.org/3/' + type + '/' + id + '?api_key=cdeff0f8f48e4e92d2817d7f0da9db18&language=it&append_to_response=videos').then((response) => {
			return response.json();			
		}).then((data) => {
			content = data;
            let rate = Math.ceil(content.vote_average);
            setTimeout(review(),200);
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
