//* Fetch
//? sebuah method pada API js untuk mengambil resources dari jaringan,
//? dan mengembalikan promise yang selesai (fullfilled) ketika ada response yang tersedia

// const searchButton = document.querySelector(".search-button");
// searchButton.addEventListener("click", function () {
//   const inputKey = document.querySelector(".input-keyword");
//   fetch("https://www.omdbapi.com/?apikey=8770be96&s=" + inputKey.value)
//     .then((response) => response.json())
//     .then((response) => {
//       if (response.Search) {
//         const movies = response.Search;
//         let cards = "";
//         movies.forEach((m) => (cards += showCards(m)));
//         const movieContainer = document.querySelector(".movie-container");
//         movieContainer.innerHTML = cards;

//         //? Event tombol detail
//         const detailButton = document.querySelectorAll(".modal-detail-button");
//         detailButton.forEach((btn) => {
//           btn.addEventListener("click", function () {
//             const imdbid = this.dataset.imdbid;
//             fetch("https://www.omdbapi.com/?apikey=8770be96&i=" + imdbid)
//               .then((response) => response.json())
//               .then((m) => {
//                 const movieDetail = showDetails(m);
//                 const modalBody = document.querySelector(".modal-body");
//                 modalBody.innerHTML = movieDetail;
//               })
//               .catch((response) => console.log(response));
//           });
//         });
//       } else {
//         const movieContainer = document.querySelector(".movie-container");
//         movieContainer.innerHTML = `
//                                   <div class="col">
//                                     <h1 class="text-center text-danger">404 Movie not found!</h1>
//                                   </div>`;
//       }
//     })
//     .catch((response) => console.log(response));
// });

//* Fetch (Refactoring)
const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async function () {
  const inputKey = document.querySelector(".input-keyword");

  const movies = await getMovies(inputKey.value);
  updateUI(movies);
});

//? Event binding tombol detail
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("modal-detail-button")) {
    const imdbid = e.target.dataset.imdbid;
    const movieDetail = await getMoviesDetail(imdbid);
    updateUIDetail(movieDetail);
  }
});

function getMoviesDetail(id) {
  return fetch("https://www.omdbapi.com/?apikey=8770be96&i=" + id)
    .then((response) => response.json())
    .then((m) => m)
    .catch((response) => console.log(response));
}

function updateUIDetail(m) {
  const movieDetail = showDetails(m);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = movieDetail;
}

function getMovies(keyword) {
  return fetch("https://www.omdbapi.com/?apikey=8770be96&s=" + keyword)
    .then((response) => response.json())
    .then((response) => {
      if (!response.Search) {
        notFound();
      }
      return response.Search;
    })
    .catch((response) => console.log(response));
}

function notFound() {
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = `
                            <div class="col">
                              <h1 class="text-center text-danger">404 Movie not found!</h1>
                            </div>`;
}

function updateUI(movies) {
  let cards = "";
  movies.forEach((m) => (cards += showCards(m)));
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = cards;
}

function showCards(m) {
  return `
    <div class="col-md-4 my-3">
      <div class="card">
        <img src="${m.Poster}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${m.Title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
          <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
        </div>
      </div>
    </div>
  `;
}

function showDetails(m) {
  return `
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-3">
              <img src="${m.Poster}" class="img-fluid" alt="">
            </div>
            <div class="col-md">
              <ul class="list-group">
                <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                <li class="list-group-item"><strong>Director : </strong> ${m.Director}</li>
                <li class="list-group-item"><strong>Actors : </strong> ${m.Actors}</li>
                <li class="list-group-item"><strong>Writer : </strong> ${m.Writer}</li>
                <li class="list-group-item"><strong>Plot : </strong> ${m.Plot}</li>
              </ul>
            </div>
          </div>
        </div>
          `;
}
