$(".search-button").on("click", function () {
  const keyword = $(".input-keyword").val();
  if (!keyword) {
    alert("Please enter a movie title.");
    return;
  }
  $.ajax({
    url: "https://www.omdbapi.com/?apikey=8770be96&s=" + keyword,
    success: (result) => {
      if (result.Response === "True") {
        const movies = result.Search;
        let cards = "";
        movies.forEach((m) => {
          cards += showCards(m);
        });
        $(".movie-container").html(cards);

        //? Event tombol detail
        $(".modal-detail-button").on("click", function () {
          $.ajax({
            url:
              "https://www.omdbapi.com/?apikey=8770be96&i=" +
              $(this).data("imdbid"),
            success: (m) => {
              const movieDetail = showDetails(m);
              $(".modal-body").html(movieDetail);
            },
            error: (e) => {
              console.log("Error Status : " + e.status);
            },
          });
        });
      } else {
        $(".movie-container").html(`
        <div class="col">
          <h1 class="text-center text-danger">404 ${result.Error}</h1>
        </div>
      `);
      }
    },
    error: (e) => {
      console.log("Error Status : " + e.status);
    },
  });
});

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
