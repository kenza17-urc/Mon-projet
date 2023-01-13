function init() {
    recupNbAnnecdote();
    nbRace();
    recupPelage();
    recupPelageFrequent();
}

init();

async function sendRequest(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Une erreur est survenue");
    }
  }
  


function toggleMobileMenu(menu) {
    menu.classList.toggle("open");
}
function darkTheme() {
    const body = document.querySelector("body");
    const modeToggle = document.querySelector(".dark-light");
  
    const currentMode = localStorage.getItem("mode") || "light-mode";
    body.classList.toggle("dark", currentMode === "dark-mode");
    modeToggle.classList.toggle("active", currentMode === "dark-mode");
  
    modeToggle.addEventListener("click", () => {
      const newMode = body.classList.toggle("dark") ? "dark-mode" : "light-mode";
      localStorage.setItem("mode", newMode);
      modeToggle.classList.toggle("active", newMode === "dark-mode");
    });
  }
  
  darkTheme();
  
  

  const cookieBannerAccepted = localStorage.getItem("cookieBannerAccepted") === "true";
  if (!cookieBannerAccepted) {
    const banner = document.createElement("div");
    banner.id = "cookie-banner";
    banner.innerHTML = "This website uses cookies to ensure you get the best experience on our website. <button id='accept-cookies'>Accept</button>";
    document.body.appendChild(banner);
  
    const acceptButton = document.getElementById("accept-cookies");
    acceptButton.addEventListener("click", function() {
      localStorage.setItem("cookieBannerAccepted", "true");
      banner.style.display = "none";
    });
  }
  
 const anecdoteAleatoire = async () => {
    let buttonAffichage = document.getElementById("afficher");
    let affichageAnecdote = document.querySelector(".textAnecdote");
    buttonAffichage.addEventListener("click", async () => {
      let response = await sendRequest("https://catfact.ninja/fact");
      affichageAnecdote.textContent = response.fact;
    });
  }
  anecdoteAleatoire();
  



// Récupération du nombre d'anecdotes
function recupNbAnnecdote() {
    sendRequest("https://catfact.ninja/facts").then((response) => {
        let anecdotes = document.querySelector(".nbAnecdotes");
        nbAnnecdote = response;
        anecdotes.textContent = nbAnnecdote.total;
    });
}
function nbRace() {
    sendRequest("https://catfact.ninja/breeds").then((
        response) => {
        let races = document.querySelector(".nbRaces");
        reponse_races = response;
        races.textContent = reponse_races.total;
    });
};
// Récupération de la race
async function recupPelage() {
    let response = await sendRequest("https://catfact.ninja/breeds");
    let lastpage = response.last_page;
    let tabPelage = [];
    for (let index = 1; index <= lastpage; index++) {
      let response = await sendRequest("https://catfact.ninja/breeds?page=" + index);
      tabPelage = [...tabPelage, ...response.data.map(race => race.coat)];
    }
    return tabPelage;
  }
  
// Récupération du pelage le plus fréquent
async function recupPelageFrequent() {
    let typePelage = document.querySelector(".typePelage");
    let tabPelage = await recupPelage();
    let frequency = {};
    let lePlusFrequent;
    let max = 0;

    tabPelage.forEach(pelage => {
        if (frequency[pelage]) {
            frequency[pelage]++;
        } else {
            frequency[pelage] = 1;
        }
    });

    for (let pelage in frequency) {
        if (frequency[pelage] > max) {
            max = frequency[pelage];
            lePlusFrequent = pelage;
        }
    }

    typePelage.innerHTML = lePlusFrequent;
    console.log(lePlusFrequent);
}
function showPays(){
    for (let i = 0; i < 10; i++)
    sendRequest('https://catfact.ninja/facts' + i).then (res =>{
    console.log(res);
    })
}







