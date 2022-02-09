const API_URL = "https://coronavirus-19-api.herokuapp.com/countries";
const ALL_CASES = "https://coronavirus-19-api.herokuapp.com/all";
const randomElement = document.querySelector(".random-countries");
const totalCases = document.querySelector(".total-cases");
const goButton = document.querySelector(".go-button");
const myInput = document.querySelector("input");
const AllCountries = (data) => {
  const div = `
        <div class="column">
          <div class="card">
            <header class="card-header has-background-danger">
              <p class="card-header-title has-text-white">
                ${data.country}
              </p>
            </header>
            <div class="card-content">
              <div class="content">
              <p class="subtitle is-6">Cases: <span class="tag is-danger">${data.cases}</span></p>
              <p class="subtitle is-6">Today Cases: <span class="tag is-warning">${data.todayCases}</span></p>
              <p class="subtitle is-6">Deaths: <span class="tag is-warning">${data.deaths}</span></p>
              <p class="subtitle is-6">Today Deaths: <span class="tag is-danger">${data.todayDeaths}</span></p>
              
              </div>
            </div>
            <footer class="card-footer">
              <p href="#" class="card-footer-item is-danger">Recovered: ${data.recovered}</p>
              <p href="#" class="card-footer-item">Active: ${data.active}</p>
              <p href="#" class="card-footer-item">Critical: ${data.critical}</p>
            </footer>
          </div>
          </div>      
        `;
  randomElement.insertAdjacentHTML("beforeend", div);
};

const AllCases = (data) => {
  totalCases.innerHTML = "";
  const html = `
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
  totalCases.insertAdjacentHTML("beforeend", html);
};

async function getRandomCountries() {
  randomElement.innerHTML = "";
  await fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      data.map((data) => {
        AllCountries(data);
      });
    });

  await fetch(ALL_CASES)
    .then((response) => response.json())
    .then((data) => {
      AllCases(data);
    });
}

goButton.addEventListener("click", getRandomCountries);
myInput.addEventListener("input", (e) => {
  //console.log(e.target.value);
  const value = e.target.value;
  const countryName = document.querySelectorAll(".card-header-title");
  countryName.forEach((name) => {
    if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
      name.parentElement.parentElement.parentElement.style.display = "block";
    } else {
      name.parentElement.parentElement.parentElement.style.display = "none";
    }
  });
});

// const request = new XMLHttpRequest();
// request.open("GET", "https://coronavirus-19-api.herokuapp.com/countries");
// request.send();

// request.addEventListener("load", function () {
//   console.log(this.responseText);
//   const [data] = JSON.parse(this.response);
//   console.log(data);
// });

// const request = fetch("https://coronavirus-19-api.herokuapp.com/countries");
// console.log(request);

// const getData = function (countries) {
//   fetch(`https://coronavirus-19-api.herokuapp.com/${countries}`)
//     .then((res) => {
//       console.log(res);
//       return res.json();
//     })
//     .then((data) => {
//       console.log(data);
//       data.map((c) => {
//         console.log(c);
//       });
//     });
// };
// getData("countries");
