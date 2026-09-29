
const params = new URLSearchParams(location.search)
const imdbID = params.get("id")
const movieDetail = document.querySelector("#movie-detail")


if (imdbID){
    searchMovie(imdbID.trim())
}
console.log(imdbID)
async function searchMovie(imdbID) {

    let response = await fetch(`https://www.omdbapi.com/?apikey=934ab0d4&i=${imdbID}&plot=full`)
    let data = await response.json()
    console.log(data)
    if(data.Response === "True"){
        displayMovie(data)
    }
    else{
        // moviehub.innerHTML = `<p>${data.Error}`
        console.log(data.Error)
    }
}

function displayMovie(data){
    movieDetail.innerHTML =  `
        <!-- Left Part: Large Cinematic Film Poster Block -->
        <div class="w-full md:w-80 flex-shrink-0 mx-auto md:mx-0 shadow-2xl rounded-2xl overflow-hidden border border-gray-800 aspect-[2/3] bg-gray-950">
            <img src="${data.Poster !== 'N/A' ? data.Poster : 'https://placeholder.com'}" 
                 alt="${data.Title}" 
                 class="w-full h-full object-cover">
        </div>

        <!-- Right Part: Detailed Dynamic Info Description Layout -->
        <div class="flex flex-col justify-between flex-grow text-left">
            <div>
                <!-- Main Movie Film Title -->
                <h1 class="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">${data.Title}</h1>
                
                <!-- Technical Metadata Attributes List -->
                <div class="flex flex-wrap items-center gap-3 text-xs md:text-sm text-gray-400 font-medium mb-6">
                    <span class="bg-gray-900 px-3 py-1 rounded-md text-gray-300">${data.Released}</span>
                    <span class="border border-gray-800 px-2.5 py-0.5 rounded text-gray-400 uppercase tracking-wider">${data.Rated}</span>
                    <span>${data.Runtime}</span>
                    <span class="text-red-500 font-semibold">${data.Genre}</span>
                </div>

                <!-- Verified IMDb Interactive Rating Badge -->
                <div class="inline-flex items-center gap-2 bg-yellow-500/5 border border-yellow-500/20 text-yellow-500 px-4 py-2 rounded-xl mb-6">
                    <span class="text-lg">★</span>
                    <span class="font-bold text-md">${data.imdbRating && data.imdbRating !== 'N/A' ? data.imdbRating : '0.0'}</span>

                    <span class="text-xs text-yellow-500/60">/10 (IMDb)</span>
                </div>

                <!-- Plot Summary Plotline Text -->
                <div class="space-y-2 mb-6">
                    <h3 class="text-xs font-bold tracking-widest text-gray-500 uppercase tracking-widest">Plot Overview</h3>
                    <p class="text-gray-300 leading-relaxed text-sm md:text-base font-normal">
                        ${data.Plot}
                    </p>
                </div>
            </div>

            <!-- Technical Professional Production Specs Section -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-gray-950 pt-6 text-sm mb-6">
                <div>
                    <span class="block text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Director</span>
                    <span class="text-gray-200 font-medium">${data.Director}</span>
                </div>
                <div>
                    <span class="block text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Writer & Key Cast</span>
                    <span class="text-gray-200 font-medium">${data.Writer}</span>
                </div>
            </div>

            <!-- Dynamic Anchored Action Button Block to View IMDb Page -->
            <div>
                <a href="https://www.imdb.com/title/${data.imdbID}" target="_blank" 
                   class="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-gray-950 font-bold px-6 py-3 rounded-xl text-sm transition-all duration-200 shadow-lg shadow-yellow-500/10 cursor-pointer">
                    View On IMDb →
                </a>
            </div>
        </div>
    `;
}
