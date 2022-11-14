var address = window.location.href;
var id = address.slice(address.lastIndexOf("id")+3);
var type = address.slice(address.lastIndexOf("type")+5, address.lastIndexOf("id")-1);
var contentBox = document.getElementById("contentRow");
const mesi = new Array("Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre");
const catalog = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/"
var content;
var today = new Date();

window.addEventListener("DOMContentLoaded", getContent);

function getContent() {
    fetch('https://api.themoviedb.org/3/' + type + '/' + id + '?api_key=cdeff0f8f48e4e92d2817d7f0da9db18&language=it&append_to_response=videos').then((response) => {
			return response.json();			
		}).then((data) => {
			content = data;
            document.getElementById("title").innerHTML = ((content.title != null) ? content.title : content.name);
            document.getElementById("dvd").setAttribute("alt", ((content.title != null) ? content.title : content.name));
            document.getElementById("dvd").setAttribute("src", catalog + content.poster_path);
            /*
            let divHead = document.createElement("div");
            let divCellSx = document.createElement("div");
            let divCellDx = document.createElement("div");
            let divTitle = document.createElement("div");
            let title = document.createElement("h1");
            title.innerText = ((content.title != null) ? content.title : content.name);
            title.className = "text-start display-4 fw-semibold";
            divTitle.appendChild(title);
            let divTime = document.createElement("div");
            divTime.className = "d-flex"
            let pDate = document.createElement("p");
            let date = ((content.release_date != null) ? content.release_date : content.first_air_date);
            pDate.innerHTML = "<b>Data di Uscita: </b>" + date.slice(8,10) + " " + mesi[parseInt(date.slice(5,7))] + " " + date.slice(0,4);
            pDate.className = "pe-3";
            let pRuntime = document.createElement("p");
            let runtime = ((content.runtime != null) ? (parseInt(content.runtime/60) + " ore e " + content.runtime%60 + " minuti") : (content.number_of_seasons + ((content.number_of_seasons > 1) ? " Stagioni" : " Stagione")));
            pRuntime.innerHTML = "<b>Durata: </b>" + runtime;
            divTime.append(pDate, pRuntime);
            divCellSx.append(divTitle, divTime);
            divHead.append(divCellSx, divCellDx);
            
			divLeft = document.createElement("div");
            divLeft.className = "col-3 pe-0 ps-2";
            let elementCover = document.createElement('div');					
			let coverLink = document.createElement('a');
			coverLink.className = "dvdCover-container";
			coverLink.href = catalog + content.poster_path;  // Da cambiare per popup
			elementCover.appendChild(coverLink);
			let dvdCover = document.createElement('div');
			dvdCover.className = "dvdCover";
			coverLink.appendChild(dvdCover);
			let coverFront = document.createElement('img');
			coverFront.src = catalog + content.poster_path;
			dvdCover.appendChild(coverFront);
            divLeft.appendChild(elementCover);
            divCenter = document.createElement("div");
            divCenter.className = "col-6 px-0";
            divCenter.innerText = content.overview;
            let trailer = document.createElement("iframe");
            //trailer.className = "p-4";
            trailer.width = "444.5px";
            trailer.height = "250px";
            trailer.src = "https://www.youtube.com/embed/" + content.videos.results[0].key;
            trailer.title = content.videos.results[0].name;
            trailer.frameborder = "0";
            trailer.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            trailer.setAttribute("allowfullscreen","on");
            divCenter.appendChild(trailer);

            divRight = document.createElement("div");
            divRight.className = "col-3 pe-0 ps-2";
            divMedia = document.createElement("div");
            divMedia.className = "d-flex align-items-baseline";
            
            divMedia.append(divLeft,divCenter,divRight);
            contentBox.append(divHead,divMedia);
            */
    });
    
}

$('.rate').on('change mouseover mouseout', () => {
    const stars = $('.rate:checked~.rate, .rate:hover~.rate').length + ($('.rate:checked').length || $('.rate:hover').length);  
    $('.score').text(stars ? (stars * .5).toFixed(1) : '未评');
  })