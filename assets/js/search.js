var pageItems = [];
var currentPage;
var total;
var pages;
var call;
var searchtype;	
var vote = [];

var startLimit = 3;
var following = [];
var searchpage = document.getElementById("search");
var homepage = document.getElementById("home-page");
var itempage = document.getElementById("itempage");

///////////////////////radio buttons//////////////////////////
var multiRadio = document.getElementById("multi");			//
var movieRadio = document.getElementById("movie");			//
var tvRadio = document.getElementById("tv");	  			//
//////////////////////////////////////////////////////////////
/////////////////////////checkboxes///////////////////////////
var animation = document.getElementById("animation");		//
var adventure = document.getElementById("adventure");		//
var comedy = document.getElementById("comedy");				//
var crime = document.getElementById("crime");				//
var documentary = document.getElementById("documentary");	//
var drama = document.getElementById("drama");				//
var family = document.getElementById("family");				//
var fantasy = document.getElementById("fantasy");			//
var mistery = document.getElementById("mistery");			//
//////////////////////////////////////////////////////////////
var mobileSearch = document.getElementById("mobileSearch");

let table = document.getElementById("tableRow");
var searchField = document.getElementById("search_bar");   				
const catalog = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/"
//////////////////////////////////
let date = new Date();			//
let month = date.getMonth();	//
let year = date.getFullYear();	//
								//
if (month > 1) {				//
	month -= 2;					//
}								//	Non possiamo avere film non ancora usciti in distribuzione a campionario
else {							//
	year -= 1;					//	
	month += 10;				//
	date.setFullYear(year);		//
}								//
date.setMonth(month);			//
//////////////////////////////////

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

multiRadio.addEventListener("change", function(e) {
	e.preventDefault();
	listenForInput("Tutti")
});

movieRadio.addEventListener("change", function(e) {
	e.preventDefault();
	listenForInput("Film")
});

tvRadio.addEventListener("change", function(e) {
	e.preventDefault();
	listenForInput("Tv");
});

function listenForInput(string) {
	document.getElementById("searchParameter").innerText = string;
}
/////////////////search offcanvas///////////////////
mobileSearch.addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		e.preventDefault();
		let closeCanvas = document.querySelector('[data-bs-dismiss="offcanvas"]');
		closeCanvas.click();		
		detailedSearch(mobileSearch.value);			
	}	
})

function detailedSearch(keywords) {
	if (keywords != "" || multiRadio.checked) {
		startSearching(keywords);
	}
	else {		
		let genresMovie = [];
		let genresTv = [];
		if (movieRadio.checked) {
			searchtype = "movie";
		}
		else if (tvRadio.checked) {
			searchtype = "tv";
		}
		else {
			searchtype = "multi"
		}
		if (animation.checked) {
			genresMovie.push(16);
			genresTv.push(16);
		}
		if (comedy.checked) {
			genresMovie.push(35);
			genresTv.push(35);
		}
		if (crime.checked) {
			genresMovie.push(80);
			genresTv.push(80);
		}
		if (documentary.checked) {
			genresMovie.push(99);
			genresTv.push(99);
		}
		if (drama.checked) {
			genresMovie.push(18);
			genresTv.push(18);
		}
		if (family.checked) {
			genresMovie.push(10751);
			genresTv.push(10751);
		}
		if (mistery.checked) {
			genresMovie.push(9648);
			genresTv.push(9648);
		}
		if (adventure.checked) {
			genresMovie.push(12);
			genresMovie.push(28);
			genresTv.push(10759);
		}		
		if (fantasy.checked) {
			genresMovie.push(14);
			genresMovie.push(878);
			genresTv.push(10765);
		}
		startSearchByGenre(genresMovie, genresTv);
	}	
}

function startSearchByGenre(genresMovie, genresTv) {
	let searchString1 = genresMovie[0];
	let searchString2 = genresTv[0];
	pageItems = [];
	if (searchtype == "movie") {
		for (i = 1; i < genresMovie.lenght; i++) {		
			searchString1 += "%2C" + genresMovie[i];
		}
		call = 'https://api.themoviedb.org/3/discover/movie?api_key=cdeff0f8f48e4e92d2817d7f0da9db18&language=it&sort_by=vote_count.desc&certification.lte=09-11-2022&include_adult=false&include_video=false&with_watch_monetization_types=flatrate&with_genres=' + searchString1 + "&page=";
		fetch(call+1).then((response) => {
			return response.json();			
		}).then((data) => {  								
			pageItems = data.results;			
		});
	}
	else {	
		for (i = 1; i < genresTv.lenght; i++) {		
			searchString2 += "%2C" + genresTv[i];
		}
		call = 'https://api.themoviedb.org/3/discover/tv?api_key=cdeff0f8f48e4e92d2817d7f0da9db18&language=it&sort_by=vote_count.desc&certification.lte=09-11-2022&include_adult=false&include_video=false&with_watch_monetization_types=flatrate&with_genres=' + searchString2 + "&page=";
		fetch(call+1).then((response) => {
			return response.json();			
		}).then((data) => {  								
			pageItems = pageItems.concat(data.results);			
		});
	}	
	fetch(call+2).then((response) => {
		return response.json();			
	}).then((answer) => {  								
		pageItems = pageItems.concat(answer.results);			
	});
	
	currentPage = 1;
	pages = 4;
	total = 40;
	setTimeout( () => {
		mobileSearch.value = "";				
		table.innerHTML = "";
		for (i=0; i < pageItems.length; i++) {
			let showcase = document.createElement('div');
			showcase.className = "col-12 col-sm-4 col-lg-3 pe-0 ps-2 ps-sm-4 d-flex justify-content-around flex-sm-column align-items-sm-baseline ps-md-5 align-items-lg-start";
			table.appendChild(showcase);
			let elementCover = document.createElement('div');					
			let coverLink = document.createElement('a');
			coverLink.className = "dvdCover-container col-6";
			coverLink.href = "item.html?media_type=" + searchtype + "&id=" + pageItems[i].id;
			elementCover.appendChild(coverLink);
			elementCover.className = "ms-3"
			let dvdCover = document.createElement('div');
			dvdCover.className = "dvdCover";
			coverLink.appendChild(dvdCover);
			let coverFront = document.createElement('img');
			coverFront.src = catalog + pageItems[i].poster_path;
			dvdCover.appendChild(coverFront);
			let dvdInfo = document.createElement('div');
			dvdInfo.className = "col-6 mt-5 px-1 mt-sm-1 ps-sm-0 ps-lg-3 my-xl-5";
			let dvdTitle = document.createElement('h3');
			dvdTitle.className = "fs-6 text-start mt-sm-3";
			dvdTitle.innerHTML = ((pageItems[i].title == null) ? pageItems[i].name : pageItems[i].title);
			vote[i] = Math.ceil(pageItems[i].vote_average);
			let dvdRate = document.createElement('div');
			dvdRate.className = "comp-rate";
			let divStars = document.createElement('div');
			let spanStars = document.createElement('span');
			spanStars.className = "score";
			divStars.appendChild(spanStars);
			let rateRadio1 = document.createElement('input');/*
			rateRadio1.type = "radio";
			rateRadio1.className = "rate";
			rateRadio1.name = "rate";
			let rateRadio2 = rateRadio1.cloneNode(true);
			let rateRadio3 = rateRadio1.cloneNode(true);;
			let rateRadio4 = rateRadio1.cloneNode(true);;		// va aggiunta funzionalità accensione stelle
			let rateRadio5 = rateRadio1.cloneNode(true);;
			let rateRadio6 = rateRadio1.cloneNode(true);;
			let rateRadio7 = rateRadio1.cloneNode(true);;
			let rateRadio8 = rateRadio1.cloneNode(true);;
			let rateRadio9 = rateRadio1.cloneNode(true);;
			let rateRadio10 = rateRadio1.cloneNode(true);;
			dvdRate.append(divStars, rateRadio1, rateRadio2, rateRadio3, rateRadio4, rateRadio5, rateRadio6, rateRadio7, rateRadio8, rateRadio9, rateRadio10);*/
			dvdInfo.append(dvdTitle, dvdRate);
			showcase.append(elementCover, dvdInfo);			
		}					
	}, 1000);	
}

////////////////ricerca provvisoria/////////////////
searchField.addEventListener("keypress", (e) => {
	if (searchField.value) {	
		if (e.key === "Enter") {
			e.preventDefault();			
			if (itempage) {
				itempage.classList.remove("d-flex");
				itempage.classList.add("d-none");
				searchpage.classList.remove("d-none");
			}			
			startSearching(searchField.value);			
		}
	}
})

async function startSearching(keywords) {	
	if (keywords) {	
		call = 'https://api.themoviedb.org/3/search/multi?api_key=cdeff0f8f48e4e92d2817d7f0da9db18&language=it&include_adult=false&query=' + keywords + "&page=";
		fetch(call+1).then((response) => {
				return response.json();			
			}).then(async (data) => {
				pageItems = data.results;
				let total = data.total_results;
				let pages = data.total_pages;
				let currentPage = data.page;
				if (pageItems) {
					await getFullList(call, pages);
					//setTimeout( () => {
						console.log(pageItems);							////////////////cancellabile/////////////////////
						trimMovieList(pageItems);
						pageItems.sort(compare);
						removeDuplicates(pageItems);                   //necessario solo su multi-ricerca
						searchField.value = "";
						if (homepage) {
							homepage.classList.add("d-none");
						}
						else if (mainCart) {
							mainCart.classList.add("d-none");
						}						
						searchpage.classList.remove("d-none");
						document.body.style.background = "white";
						table.innerHTML = "";
						//console.table(pageItems);						
						for (i=0; i < pageItems.length; i++) {
							let showcase = document.createElement('div');
							showcase.className = "col-12 col-sm-4 col-lg-3 pe-0 ps-2 ps-sm-4 d-flex justify-content-around flex-sm-column align-items-sm-baseline ps-md-5 align-items-lg-start";
							table.appendChild(showcase);
							let elementCover = document.createElement('div');					
							let coverLink = document.createElement('a');
							coverLink.className = "dvdCover-container col-6";
							coverLink.href = "item.html?media_type=" + pageItems[i].media_type + "&id=" + pageItems[i].id;
							elementCover.appendChild(coverLink);
							elementCover.className = "ms-3"
							let dvdCover = document.createElement('div');
							dvdCover.className = "dvdCover";
							coverLink.appendChild(dvdCover);
							let coverFront = document.createElement('img');
							coverFront.src = catalog + pageItems[i].poster_path;
							dvdCover.appendChild(coverFront);
							let dvdInfo = document.createElement('div');
							dvdInfo.className = "col-6 mt-5 px-1 mt-sm-1 ps-sm-0 ps-lg-3 my-xl-5";
							let dvdTitle = document.createElement('h3');
							dvdTitle.className = "fs-6 text-start mt-sm-3";
							dvdTitle.innerHTML = ((pageItems[i].title == null) ? pageItems[i].name : pageItems[i].title);
							vote[i] = Math.ceil(pageItems[i].vote_average);
							let dvdRate = document.createElement('div');
							dvdRate.className = "comp-rate";
							let divStars = document.createElement('div');
							let spanStars = document.createElement('span');
							spanStars.className = "score";
							divStars.appendChild(spanStars);
							let rateRadio = [];
							rateRadio[1] = document.createElement('input');
							rateRadio[1].type = "radio";
							rateRadio[1].className = "rate";
							rateRadio[1].name = "rate" + [i];
							rateRadio[2] = rateRadio[1].cloneNode(true);
							rateRadio[3] = rateRadio[1].cloneNode(true);
							rateRadio[4] = rateRadio[1].cloneNode(true);
							rateRadio[5] = rateRadio[1].cloneNode(true);
							rateRadio[6] = rateRadio[1].cloneNode(true);
							rateRadio[7] = rateRadio[1].cloneNode(true);
							rateRadio[8] = rateRadio[1].cloneNode(true);
							rateRadio[9] = rateRadio[1].cloneNode(true);
							rateRadio[10] = rateRadio[1].cloneNode(true);
							dvdRate.append(divStars, rateRadio[10], rateRadio[9], rateRadio[8], rateRadio[7], rateRadio[6], rateRadio[5], rateRadio[4], rateRadio[3], rateRadio[2], rateRadio[1]);
							rateRadio[vote[i]].checked = true;							
							/*for (k = 1; k <= vote[i]; k++) {
								rateRadio[k].classList.add("voted");
							}*/
							dvdInfo.append(dvdTitle, dvdRate);
							showcase.append(elementCover, dvdInfo);						
						}											
				}
				else {
					console.log("a");
					table.innerHTML = "<h2>Non sono stati trovati risultati.</h2>";
				}
			});
		}
		else {
			table.innerHTML = "<h2>Si prega di rendere più specifica la ricerca.</h2>";
		}
}


async function getFullList(call, lastPage) {
	for (i = 2; i <= lastPage; i++) {
		await fetch(call + i).then((response) => {
			return response.json();			
		}).then((data) => {
			let answer = data;
			pageItems = pageItems.concat(answer.results);
		});
	}
}

function trimMovieList(results) {	
	let deletables = 0;
	for (let i = 0; i < results.length; i++) {	
		if (results[i].poster_path == null || results[i].vote_count < 100 || results[i].popularity < 17 || Date.parse(results[i].release_date) > date ) {					
			results.unshift(results[i]);
			results.splice((i+1),1);
			deletables++;							
		}
	}
	for (let i = 0; i < deletables; i++) {
		results.shift();
	}	
}

function compare(a, b) {
	if (a.popularity > b.popularity){
		return -1;
	}
	if (a.popularity < b.popularity){
		return 1;
	}
	return 0;	
}

function removeDuplicates(items) {
	let previous = items[0];
	let deletables = 0;
	for (let i = 1; i < items.length; i++) {
		if (items[i].id === previous.id) {
			items.unshift(items[i]);
			items.splice((i+1),1);
			deletables++;				
		}
		else {
			previous = items[i];
		}
	}
	for (let i = 0; i < deletables; i++) {
		items.shift();
	}
}
