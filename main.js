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
            <header class="card-header has-background-info">
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
              <p href="#" class="card-footer-item tag is-success">Recovered: ${data.recovered}</p>
              <p href="#" class="card-footer-item tag tag is-danger">Active: ${data.active}</p>
              <p href="#" class="card-footer-item tag is-warning">Critical: ${data.critical}</p>
            </footer>
          </div>
          </div>      
        `;
  randomElement.insertAdjacentHTML("beforeend", div);
};

/****Clock Maker */

const AllCases = (data) => {
  totalCases.innerHTML = "";
  const date = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  const output = new Intl.DateTimeFormat("en-Us", options).format(date);
  const html = `
      <div class="level-item has-text-centered">
        <p class="tag are-large" id="clock">
        </p>
      </div>
     <div class="level-item has-text-centered">
        <div>
            <p class="heading">Total Cases</p>
            <p class="title tag is-warning">${data.cases}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
            <p class="heading has-text-white">Total Deaths</p>
            <p class="title has-text-white has-background-black tag is-danger">${data.deaths}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
      <div>
          <p class="heading">Total Recovered</p>
          <p class="title tag is-success">${data.recovered}</p>
      </div>
    </div>
        `;
  totalCases.insertAdjacentHTML("beforeend", html);
  showTime();
  setInterval(showTime, 1000);
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
window.onload = getRandomCountries;

//goButton.addEventListener("click", getRandomCountries);
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

const showTime = () => {
  const date = new Date();
  let hours = `${date.getHours()}`.padStart(2, 0);
  const minutes = `${date.getMinutes()}`.padStart(2, 0);
  const seconds = `${date.getSeconds()}`.padStart(2, 0);

  /****pass value as argument */
  const formatter = formatChanger(hours);
  hours = checkTimer(hours);
  document.getElementById(
    "clock"
  ).textContent = `${hours}:${minutes}:${seconds} ${formatter}`;
};

const formatChanger = (time) => {
  let changer = "AM";
  if (time >= 12) {
    changer = "PM";
  }
  return changer;
};

const checkTimer = (time) => {
  if (time > 12) {
    return (time = time - 12);
  } else if (time === 00) {
    return (time = 12);
  } else {
    return time;
  }
};

// const timeChanger = (time) => {};

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
