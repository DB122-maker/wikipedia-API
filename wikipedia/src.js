const form = document.querySelector(".searchForm");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const input = document.querySelector(".searchForm-input").value;
  const searchQuery = input.trim();
  fetchResults(searchQuery);
}
function fetchResults(searchQuery) {
  const endpoint = `https://fr.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      const results = data.query.search;
      displayResults(results);
    })
    .catch(() => alert("Une erreur a été faite"));
}

function displayResults(results) {
  const searchResults = document.querySelector(".searchResults");

  searchResults.innerHTML = "";
  if (results.length) {
    results.forEach(result => {
      const url = encodeURI(`https://fr.wikipedia.org/wiki/${result.title}`);
      searchResults.insertAdjacentHTML(
        "beforeend",
        `<div class="resultItem">
      <h3 class="resultItem-title">
        <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
      </h3>
      <span class="resultItem-snippet">${result.snippet}</span><br>
      <a href="${url}" class="resultItem-link" target="_blank" rel="noopener">${url}</a>
    </div>`
      );
    });
  } else {
    return (searchResults.innerHTML = ` <p class="errorSearch"> Vous vous êtes surement trompés, ne vous en faites pas, vous pouvez refaire une recherche. </p>`);
  }
}
