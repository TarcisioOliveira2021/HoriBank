VanillaTilt.init(document.querySelectorAll(".card"), {
    max: 25,
    speed: 400,
    glare: false
});


const trocaTemaBtn = document.getElementById('trocaTemaBtn');
const card = document.querySelector('.card');
const titulo = document.querySelector('.content').querySelector("h1");
const sub = document.querySelector('.content').querySelector("p");

const body = document.body;

let isDarkTheme = false;

trocaTemaBtn.addEventListener('click', function () {

    if (isDarkTheme) {
        //Light
        body.classList.remove('bg-dark', 'text-light');
        body.classList.add('bg-light', 'text-dark');
        card.classList.remove('card-bg-dark');
        card.classList.add('card-bg-light');
        titulo.style.color = "black";
        sub.style.color = "black";

        trocaTemaBtn.innerHTML = '<i class="uil uil-moon change-theme" id="trocaBtn"></i>';
        isDarkTheme = false;
    } else {
        //Dark
        card.classList.remove('card-bg-light');
        card.classList.add('card-bg-dark');
        body.classList.remove('bg-light', 'text-dark');
        body.classList.add('bg-dark', 'text-light');
        titulo.style.color = "#f8ea6a";
        sub.style.color = "#f8ea6a";

        trocaTemaBtn.innerHTML = '<i class="uil uil-moon-eclipse" id="trocaBtn"></i>';
        isDarkTheme = true;
    }
});