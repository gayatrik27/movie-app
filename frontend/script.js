const results = document.getElementById("results");
const status = document.getElementById("status");

// Load default movies on start
window.onload = () => {
  loadMovies("avengers");
};

// Search function (triggered on typing)
async function searchMovies() {
  const query = document.getElementById("search").value;

  if (query.trim() === "") {
    loadMovies("avengers");
  } else {
    loadMovies(query);
  }
}

// Main function to fetch movies
async function loadMovies(query) {
  try {
    status.innerText = "⏳ Loading...";
    results.innerHTML = "";

    const res = await fetch(`http://localhost:5000/movies?q=${query}`);
    const data = await res.json();

    if (data.Response === "True") {
      displayMovies(data.Search);
      status.innerText = "";
    } else {
      status.innerText = "❌ No movies found";
    }
  } catch (error) {
    console.log(error);
    status.innerText = "⚠️ Error connecting to server";
  }
}

// Display movies
function displayMovies(movies) {
  results.innerHTML = movies.map(movie => `
    <div class="movie">
      <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/300'}">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    </div>
  `).join("");
}