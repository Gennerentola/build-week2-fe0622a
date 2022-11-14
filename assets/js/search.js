var pageItems = [];
var currentPage;
var total;
var pages;
var startLimit = 3;
var following = [];
let table = document.getElementById("tableRow");
var searchField = document.getElementById("keywords");   				////// va cambiato in "search_bar"
const catalog = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/"
var a;
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

searchField.addEventListener("keypress", (e) => {
	if (searchField.value) {	
		if (e.key === "Enter") {
			e.preventDefault();
			console.log("ok");				
			startSearchingMovies(searchField.value);			
		}
	}
})

function startSearchingMovies(keywords) {
	fetch('https://api.themoviedb.org/3/search/multi?api_key=cdeff0f8f48e4e92d2817d7f0da9db18&language=it&page=1&include_adult=false&query=' + keywords).then((response) => {
			return response.json();			
		}).then((data) => {
			let answer = data;  								// cancellabile, usata per debug
			pageItems = answer.results;
			let total = answer.total_results;
			let pages = answer.total_pages;
			let currentPage = answer.page;
			if (pageItems) {
				getFullList(keywords, pages);
				setTimeout( () => {
					console.log(pageItems);							/////////////////////////////////////
					trimMovieList(pageItems);
					pageItems.sort(compare);
					removeDuplicates(pageItems);                   //necessario solo su multi-ricerca
					searchField.value = "";
				
					table.innerHTML = "";
					//console.table(pageItems);
					for (i=0; i < pageItems.length; i++) {
						let showcase = document.createElement('div');
						showcase.className = "col-6 col-sm-4 col-lg-3 pe-0 ps-2";
						table.appendChild(showcase);
						let elementCover = document.createElement('div');					
						let coverLink = document.createElement('a');
						coverLink.className = "dvdCover-container";
						coverLink.href = "item.html?media_type=" + pageItems[i].media_type + "&id=" + pageItems[i].id;
						elementCover.appendChild(coverLink);
						let dvdCover = document.createElement('div');
						dvdCover.className = "dvdCover";
						coverLink.appendChild(dvdCover);
						let coverFront = document.createElement('img');
						coverFront.src = catalog + pageItems[i].poster_path;
						dvdCover.appendChild(coverFront);
						dvdTitle = document.createElement('div');
						dvdTitle.className = "mt-5 fs-5 px-5";
						dvdTitle.innerHTML = ((pageItems[i].title == null) ? pageItems[i].name : pageItems[i].title);


						showcase.append(elementCover, dvdTitle);
					}					
				}, (total/1.5)); //// (500 per movies o tv - 1500 per multi)
			}
			else {
				console.log("a");
				table.innerHTML = "<h2>Non sono stati trovati risultati.</h2>";
			}
		});
}

function getFullList(query, lastPage) {
	for (i = 2; i <= lastPage; i++) {
		fetch('https://api.themoviedb.org/3/search/multi?api_key=cdeff0f8f48e4e92d2817d7f0da9db18&language=it&page=' + i + '&include_adult=false&query=' + query).then((response) => {
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
