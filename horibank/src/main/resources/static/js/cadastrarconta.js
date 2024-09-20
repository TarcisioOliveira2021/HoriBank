$('#numeroComDigito').mask('000000-0', { placeholder: "123456-7" });

const themeToggleBtn = document.getElementById('theme-toggle');
const texto = document.querySelector('.text-center-tit');
const card = document.querySelector('.card');
const numeroContaTexto = document.querySelector('.numeroConta').querySelector("label[for='numeroComDigito']");
const tipoContaTexto = document.querySelector('.tipoConta').querySelector("label[for='tipoConta']");
const body = document.body;
let isDarkTheme = false;

themeToggleBtn.addEventListener('click', function () {

    if (isDarkTheme) {
        //Light
        body.classList.remove('bg-dark', 'text-light');
        body.classList.add('bg-light', 'text-dark');
        card.classList.remove('card-bg-dark');
        card.classList.add('card-bg-light');
        texto.style.color = 'black';
        numeroContaTexto.style.color = 'black';
        tipoContaTexto.style.color = 'black';

        themeToggleBtn.innerHTML = '<i class="uil uil-moon change-theme" id="theme-button"></i>';
        isDarkTheme = false;
    } else {
        //Dark
        card.classList.remove('card-bg-light');
        card.classList.add('card-bg-dark');
        body.classList.remove('bg-light', 'text-dark');
        body.classList.add('bg-dark', 'text-light');
        texto.style.color = '#f8ea6a';
        numeroContaTexto.style.color = '#f8ea6a';
        tipoContaTexto.style.color = '#f8ea6a';

        themeToggleBtn.innerHTML = '<i class="uil uil-moon-eclipse" id="theme-button"></i>';
        isDarkTheme = true;
    }
});

function cadastrarConta() {
    let contaComDigito = document.getElementById('numeroComDigito').value;
    let numeroConta = contaComDigito.split('-')[0];
    let digitoConta = contaComDigito.split('-')[1];
    let tipoConta = document.getElementById('tipoConta').value;

    var idPessoalogada = JSON.parse(localStorage.getItem('pessoaLogadaId'));

    if (contaComDigito === "" || tipoConta === "") {
        event.preventDefault();
        document.getElementById('mensagem').innerHTML = `
                <div class="alert alert-danger d-flex align-items-center" role="alert">
                    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                    <div>
                        Um ou mais campos não foram preenchido
                    </div>
                </div>
            `;
    }

    var contaNova = {
        idPessoa: idPessoalogada.toString(),
        numero: numeroConta,
        digito: digitoConta,
        tipoConta: tipoConta,
    };

    $.ajax({
        url: '/api/conta/cadastrar',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(contaNova),
        success: function (response) {
            document.getElementById('mensagem').innerHTML = `
                    <div class="alert alert-success d-flex align-items-center" role="alert">
                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                        <div>
                            ${response}
                        </div>
                    </div>
                `;

            setInterval(function () {
                window.location.href = "/home.html";
            }, 1000);
        },
        error: function (response) {
            document.getElementById('mensagem').innerHTML = `
                    <div class="alert alert-warning d-flex align-items-center" role="alert">
                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                        <div>
                           ${response.responseText}
                        </div>
                    </div>
                `;
        }
    });
}