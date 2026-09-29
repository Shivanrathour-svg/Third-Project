API = "https://www.omdbapi.com/?i=tt3896198&apikey=934ab0d4&t=avenger"

const movieForm = document.querySelector("#searchMovie")
const movieInput = document.querySelector("#movieInput")
const moviehub = document.querySelector("#moviehub")


movieForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let query = movieInput.value.trim()

    if (!query) {
        return
    }
    console.log(query)
    searchMovies(query)
})

async function searchMovies(movieName) {

    moviehub.innerHTML = `<span class="loader"></span>`
    let response = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=934ab0d4&s=${movieName}`)
    let data = await response.json()
    console.log(data)
    if (data.Response === "True") {
        displayMovies(data.Search)
    }
    else {
        moviehub.innerHTML = `<p>${data.Error}`
    }
}


function displayMovies(movies) {

    moviehub.innerHTML = ""
    movies.forEach((movie) => {
        const div = document.createElement("div")
        div.dataset.imdbID = movie.imdbID
        div.setAttribute("class", "movie-card");
        // div.innerHTML = `
        // <div>
        //     <div><img src="${movie.Poster}" alt=""></div>
        // </div>
        // <div>
        //     <p>${movie.Title}</p>
        //     <p>${movie.Year}</p>
        // </div>`

        // moviehub.append(div)
        div.innerHTML = `
    <div class="bg-gray-900 rounded-2xl overflow-hidden shadow-xl border border-gray-950 hover:border-gray-800 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer group flex flex-col h-full">
        
        <!-- Poster Container -->
        <div class="relative aspect-[2/3] overflow-hidden bg-gray-950">
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://placeholder.com'}" 
                 alt="${movie.Title}" 
                 class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            
            <div class="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span class="text-xs bg-red-600 text-white font-bold px-3 py-1.5 rounded-lg shadow-lg">View Details →</span>
            </div>
        </div>
        
        <!-- Content Details Area -->
        <div class="p-4 flex flex-col flex-grow bg-gradient-to-b from-gray-900 to-gray-950 text-left">
            <!-- Movie Title -->
            <h3 class="font-bold text-sm md:text-base text-gray-100 group-hover:text-red-500 line-clamp-1 transition-colors duration-200">
                ${movie.Title}
            </h3>
            
            <!-- Year and Type Info -->
            <div class="flex items-center justify-between mt-2 text-xs text-gray-400 font-medium">
                <span class="bg-gray-800/80 px-2.5 py-0.5 rounded-md text-gray-300">${movie.Year}</span>
                <span class="uppercase tracking-wider text-[10px] bg-red-950/40 text-red-400 px-2 py-0.5 rounded border border-red-900/30">Movie</span>
            </div>
        </div>
        
    </div>`
;

        moviehub.append(div);
    })
}


moviehub.addEventListener("click", (e) => {
    e.stopPropagation();
    const movieCard = e.target.closest(".movie-card")

    const imdbID = movieCard.dataset.imdbID
    console.log(imdbID)
    location.href = `moviedetails.html?id=${imdbID}`
})