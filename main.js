const API_URL = "https://coronavirus-19-api.herokuapp.com/countries";
const ALL_CASES = "https://coronavirus-19-api.herokuapp.com/all";
const randomElement = document.querySelector(".random-countries");
const totalCases = document.querySelector(".total-cases");
const goButton = document.querySelector(".go-button");
const myInput = document.querySelector("input");

async function getRandomCountries() {
  randomElement.innerHTML = "";
  totalCases.innerHTML = "";
  await fetch(API_URL)
    .then(response => response.json())
    .then(data =>
      data.map(data => {
        //console.log(data);
        randomElement.innerHTML += `
        <div class="column">
          <div class="card">
            <header class="card-header has-background-primary">
              <p class="card-header-title has-text-white">
                ${data.country}
              </p>
            </header>
            <div class="card-content">
              <div class="content">
              <p class="subtitle is-6">Cases: <span class="tag is-danger">${data.cases}</span></p>
              <p class="subtitle is-6">Today Cases: <span class="tag is-success">${data.todayCases}</span></p>
              <p class="subtitle is-6">Deaths: <span class="tag is-success">${data.deaths}</span></p>
              <p class="subtitle is-6">Today Deaths: <span class="tag is-success">${data.todayDeaths}</span></p>
              
              </div>
            </div>
            <footer class="card-footer">
              <p href="#" class="card-footer-item has-background-primary">Recovered: ${data.recovered}</p>
              <p href="#" class="card-footer-item">Active: ${data.active}</p>
              <p href="#" class="card-footer-item">Critical: ${data.critical}</p>
            </footer>
          </div>
          </div>
        
        
        
        `;

        /*const columnElement = document.createElement("div");
        columnElement.classList.add("column");

        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        columnElement.appendChild(cardElement);

        const cardHeaderElm = document.createElement("header");
        cardHeaderElm.classList.add("card-header");
        cardElement.appendChild(cardHeaderElm);

        const cardContent = document.createElement("div");
        cardContent.classList.add("card-content");
        cardElement.appendChild(cardContent);

        randomElement.appendChild(columnElement);*/
      })
    );

  await fetch(ALL_CASES)
    .then(response => response.json())
    .then(data => {
      totalCases.innerHTML += `
      <div class="level-item has-text-centered">
        <div>
            <p class="heading">Total Cases</p>
            <p class="title">${data.cases}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
            <p class="heading has-text-white">Total Deaths</p>
            <p class="title has-text-white">${data.deaths}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
      <div>
          <p class="heading">Total Recovered</p>
          <p class="title">${data.recovered}</p>
      </div>
    </div>
        `;
    });
}

goButton.addEventListener("click", getRandomCountries);
myInput.addEventListener("input", e => {
  //console.log(e.target.value);
  const value = e.target.value;
  const countryName = document.querySelectorAll(".card-header-title");
  console.log(countryName);
  countryName.forEach(name => {
    if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
      name.parentElement.parentElement.parentElement.style.display = "block";
    } else {
      name.parentElement.parentElement.parentElement.style.display = "none";
    }
  });
});
