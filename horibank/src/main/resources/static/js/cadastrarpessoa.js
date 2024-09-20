$('#cpf').mask('000.000.000-00', { reverse: true });
$('#telefone').mask('(00) 00000-0000');

const themeToggleBtn = document.getElementById('theme-toggle');
const card = document.querySelector('.card');
const texto = document.querySelector('.text-center-tit');
const nomeTitular = document.querySelector('.nomeTitularRow').querySelector("label[for='nomeTitular']");
const numeroCPF = document.querySelector('.numeroCPF').querySelector("label[for='cpf']");
const numeroTelefone = document.querySelector('.numeroTelefone').querySelector("label[for='telefone']");

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
        nomeTitular.style.color = 'black';
        numeroCPF.style.color = 'black';
        numeroTelefone.style.color = 'black';


        themeToggleBtn.innerHTML = '<i class="uil uil-moon change-theme" id="theme-button"></i>';
        isDarkTheme = false;
    } else {
        //Dark
        card.classList.remove('card-bg-light');
        card.classList.add('card-bg-dark');
        body.classList.remove('bg-light', 'text-dark');
        body.classList.add('bg-dark', 'text-light');
        texto.style.color = '#f8ea6a';
        nomeTitular.style.color = '#f8ea6a';
        numeroCPF.style.color = '#f8ea6a';
        numeroTelefone.style.color = '#f8ea6a';
        

        themeToggleBtn.innerHTML = '<i class="uil uil-moon-eclipse" id="theme-button"></i>';
        isDarkTheme = true;
    }
});

function cadastrarPessoa() {
    let nomeTitular = document.getElementById('nomeTitular').value;
    let telefoneTitular = document.getElementById('telefone').value;
    var cpfSemFormatacao = $('#cpf').val().replace(/[.-]/g, '');

    if (nomeTitular === "" || cpf === "" || telefone === "") {
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

    var pessoa = {
        nuCpf: cpfSemFormatacao,
        nome: nomeTitular,
        telefone: telefoneTitular
    };

    $.ajax({
        url: '/api/pessoa/cadastrar',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(pessoa),
        success: function (response) {
            document.getElementById('mensagem').innerHTML = `
                    <div class="alert alert-success d-flex align-items-center" role="alert">
                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                        <div>
                            Pessoa cadastrada com sucesso
                        </div>
                    </div>
                `;
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