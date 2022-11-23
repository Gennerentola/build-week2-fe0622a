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
var mainCart = document.getElementById("mainCart");
var salutoS = document.getElementById('saluto');

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

searchField.addEventListener("keypress", (e) => {
	if (searchField.value) {	
		if (e.key === "Enter") {
			e.preventDefault();						
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
				let pages = data.total_pages;				
				if (pageItems) {
					await getFullList(call, pages);													
					trimMovieList(pageItems);
					pageItems.sort(compare);
					removeDuplicates(pageItems);                   //necessario solo su multi-ricerca
					searchField.value = "";
					displayItems(1, pageItems.length, pageItems);			
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

async function collection(type, genre) {	
	call = 'https://api.themoviedb.org/3/discover/' + type + '?api_key=cdeff0f8f48e4e92d2817d7f0da9db18&language=it&sort_by=vote_count.desc&certification.lte=09-11-2022&include_adult=false&include_video=false&with_watch_monetization_types=flatrate&with_genres=' + genre + "&page=";
	await fetch(call+1).then((response) => {
		return response.json();			
	}).then(async (data) => {  								
		pageItems = data.results;			
	});
	await fetch(call+2).then((response) => {
		return response.json();			
	}).then(async (data2) => {  								
		pageItems = pageItems.concat(data2.results);			
	});
	await fetch(call+3).then((response) => {
		return response.json();			
	}).then(async (data3) => {  								
		pageItems = pageItems.concat(data3.results);
		for (i=0; i<pageItems.length; i++) {
			pageItems[i].media_type = type;
		}
		displayItems(1, 60, pageItems);					
	});
}

function displayItems(openPage, length, pageItems) {
	if (homepage) {
		homepage.classList.add("d-none");
	}
	else if (mainCart) {
		mainCart.classList.add("d-none");
	}
	else if (itempage) {
		itempage.classList.remove("d-flex");
		itempage.classList.add("d-none");
		searchpage.classList.remove("d-none");
	}							
	searchpage.classList.remove("d-none");
	document.body.style.background = "white";
	table.innerHTML = "";
	pages = Math.ceil(length/12);											
	for (i = 0 + (12 * (openPage-1)) ; i < (12 * openPage); i++) {
		if (i < length) {
			let showcase = document.createElement('div');
			showcase.className = "col-12 col-sm-4 col-lg-3 pe-0 ps-2 ps-sm-4 ps-xl-0 d-flex justify-content-around flex-sm-column align-items-sm-baseline ps-md-5 align-items-lg-start";
			table.appendChild(showcase);
			let elementCover = document.createElement('div');					
			let coverLink = document.createElement('a');
			coverLink.className = "dvdCover-container col-6";
			coverLink.href = "item.html?media_type=" + pageItems[i].media_type + "&id=" + pageItems[i].id;
			elementCover.appendChild(coverLink);
			elementCover.className = "ms-3 d-xl-flex mx-xl-auto align-content-xl-around justify-content-xl-between align-items-xl-baseline"
			let dvdCover = document.createElement('div');
			dvdCover.className = "dvdCover";
			coverLink.appendChild(dvdCover);
			let coverFront = document.createElement('img');
			coverFront.src = catalog + pageItems[i].poster_path;
			dvdCover.appendChild(coverFront);
			let dvdInfo = document.createElement('div');
			dvdInfo.className = "col-6 mt-5 px-1 mt-sm-1 ps-sm-0 ps-lg-3 my-xl-5 mx-xl-auto";
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
			dvdInfo.append(dvdTitle, dvdRate);
			showcase.append(elementCover, dvdInfo);
			window.scrollTo({top: 0, behavior: 'smooth'});			//riporta in cima al caricamento della lista
		};								
	}
	paginate(openPage, length, pageItems);											
}

function paginate(openPage, length, items) {
	var totalPages = Math.ceil(length/12);	
	console.log(totalPages);
	let btnGroup = document.getElementById("pagination");
	btnGroup.innerHTML = "";
	btnGroup.style.marginBottom = "-1px";
	let btnFirst = document.createElement("button");
	btnFirst.className = "btn col-1 fw-bold";
	btnFirst.innerHTML = "<i class='fas fa-angles-left'></i>";
	btnFirst.style.backgroundColor = "#0c41aa";
	btnFirst.style.borderBottom = "4px solid #0c41aa"
	btnFirst.style.borderBottomLeftRadius = 0;
	btnFirst.style.color = "darkorange";
	btnGroup.appendChild(btnFirst);
	btnFirst.addEventListener("click", function(e){
		e.preventDefault();
		if (openPage > 1) {
			displayItems(1, length, items)
		}
	});
	let btnPrevious = document.createElement("button");
	btnPrevious.className = "btn col-1 fw-bold";
	btnPrevious.innerHTML = "<i class='fas fa-angle-left'></i>";
	btnPrevious.style.backgroundColor = "#000";
	btnPrevious.style.color = "darkorange";
	btnGroup.appendChild(btnPrevious);
	btnPrevious.addEventListener("click", function(e){
		e.preventDefault();
		if (openPage > 1) {
			displayItems(openPage - 1, length, items)
		}		
	});
	for (let i = 1; i <= totalPages; i++) {
		let btnX = document.createElement("button");
		btnX.className = "btn btn-warning col-1 fw-bolder";
		btnX.innerHTML = i;
		btnX.style.border = "2px solid #0c41aa"
		btnX.style.color = "#0c41aa";		
		btnGroup.appendChild(btnX);
		if (i == openPage) {
			btnX.classList.remove("btn-warning");
			btnX.style.backgroundColor = "darkorange";
		};
		if (i < (openPage - 2) || i > (openPage + 2)) {
			btnX.classList.add("d-none");
		};
		if (openPage <= 3) {
			if (i == 4 || i == 5) {
				btnX.classList.remove("d-none");
			}
		}
		if (openPage >= totalPages - 2) {
			if (i == (totalPages - 3) || i == (totalPages - 4)) {
				btnX.classList.remove("d-none");
			}
		}
		btnX.addEventListener("click", function(e){
			e.preventDefault();
			displayItems(i, length, items)                
		});
		console.log(i);
	};
	let btnNext = document.createElement("button");
	btnNext.className = "btn col-1 fw-bold";
	btnNext.innerHTML = "<i class='fas fa-angle-right'></i>";
	btnNext.style.backgroundColor = "#000";
	btnNext.style.color = "darkorange";
	btnGroup.appendChild(btnNext);
	btnNext.addEventListener("click", function(e){
		e.preventDefault();
		if (openPage < totalPages) {
			displayItems(openPage + 1, length, items)
		}	
	});
	let btnLast = document.createElement("button");
	btnLast.className = "btn col-1 fw-bold";
	btnLast.innerHTML = "<i class='fas fa-angles-right'></i>";
	btnLast.style.backgroundColor = "#0c41aa";
	btnLast.style.borderBottom = "4px solid #0c41aa"
	btnLast.style.borderBottomRightRadius = 0;
	btnLast.style.color = "darkorange";
	btnGroup.appendChild(btnLast);
	btnLast.addEventListener("click", function(e){
		e.preventDefault();
		if (openPage < totalPages) {
			displayItems(totalPages, length, items)
		}	
	});	
}

async function lastArrivals() {			
		call = 'https://api.themoviedb.org/3/discover/movie?api_key=cdeff0f8f48e4e92d2817d7f0da9db18&language=it&sort_by=vote_count.desc&include_adult=false&include_video=false&primary_release_year=2022&with_watch_monetization_types=flatrate&page=';
		fetch(call+1).then((response) => {
				return response.json();			
			}).then(async (data) => {
				pageItems = data.results;				
				let pages = 15;	
				await getFullList(call, pages);													
				trimMovieList(pageItems);
				for (i=0; i<pageItems.length; i++) {
					pageItems[i].media_type = "movie";
				}
				displayItems(1, pageItems.length, pageItems);			
			});		
}

async function mustSee() {			
	call = 'https://api.themoviedb.org/3/discover/movie?api_key=cdeff0f8f48e4e92d2817d7f0da9db18&language=it&sort_by=vote_count.desc&include_adult=false&include_video=false&with_watch_monetization_types=flatrate&page=';
	fetch(call+1).then((response) => {
			return response.json();			
		}).then(async (data) => {
			pageItems = data.results;				
			let pages = 15;	
			await getFullList(call, pages);													
			trimMovieList(pageItems);
			for (i=0; i<pageItems.length; i++) {
				pageItems[i].media_type = "movie";
			}
			displayItems(1, pageItems.length, pageItems);			
		});		
}