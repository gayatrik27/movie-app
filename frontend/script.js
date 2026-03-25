const API_KEY = "ed112898";

// 🔍 Live Search
async function searchMovies() {
    const query = document.getElementById("search").value;

    if (query.length < 3) {
        document.getElementById("movies").innerHTML = `
            <p class="welcome">✨ Type at least 3 letters...</p>
        `;
        return;
    }

    const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
    const data = await res.json();

    const moviesDiv = document.getElementById("movies");
    moviesDiv.innerHTML = "";

    if (data.Response === "False") {
        moviesDiv.innerHTML = `<p class="welcome">😢 No movies found</p>`;
        return;
    }

    data.Search.forEach(movie => {
        const movieEl = document.createElement("div");

        movieEl.innerHTML = `
            <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/200'}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
            <button onclick="getMovieDetails('${movie.imdbID}')">Details</button>
            <button onclick="addToFavorites('${movie.Title}')">❤️</button>
        `;

        moviesDiv.appendChild(movieEl);
    });
}

// 🎬 Movie Details Popup
async function getMovieDetails(id) {
    const res = await fetch(`http://localhost:5000/search?q=${query}`)
    const movie = await res.json();

    document.getElementById("movieDetails").innerHTML = `
        <h2>${movie.Title}</h2>
        <img src="${movie.Poster}">
        <p><b>Year:</b> ${movie.Year}</p>
        <p><b>Genre:</b> ${movie.Genre}</p>
        <p><b>Plot:</b> ${movie.Plot}</p>
        <p><b>⭐ IMDb:</b> ${movie.imdbRating}</p>
    `;

    document.getElementById("popup").style.display = "flex";
}

// ❌ Close popup
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// ❤️ Favorites
function addToFavorites(title) {
    let favs = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favs.includes(title)) {
        favs.push(title);
        localStorage.setItem("favorites", JSON.stringify(favs));
        alert("Added to Favorites ❤️");
    } else {
        alert("Already in Favorites 😏");
    }
}