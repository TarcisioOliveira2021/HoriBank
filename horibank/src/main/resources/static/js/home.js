var pessoaLogadaId = JSON.parse(localStorage.getItem('pessoaLogadaId'));
var pessoaLogadaNome = JSON.parse(localStorage.getItem('pessoaLogadaNome'));
var titulo = document.getElementById('titularNome');
titulo.innerText = pessoaLogadaNome;

carregarContas(pessoaLogadaId).then(response => {
    var contas = JSON.parse(localStorage.getItem('contas'));

    if (contas != null) {
        switch (contas.length) {
            case 1:
                var grid = $('.d-grid');
                var elemento = '<a class="btn btn-primary" href="/conta.html?id=' + contas[0].id + '">Acessar conta ' + contas[0].tipoConta.toLowerCase() + '</a>';
                grid.append(elemento);
                grid.append('<a class="btn btn-primary mt-2" href="/cadastrarconta.html">Abrir nova conta</a>');
                break;

            case 2:
                var grid = $('.d-grid');
                var elemento1 = '<a class="btn btn-primary" href="/conta.html?id=' + contas[0].id + '">Acessar conta ' + contas[0].tipoConta.toLowerCase() + '</a>';
                var elemento2 = '<a class="btn btn-primary" href="/conta.html?id=' + contas[1].id + '">Acessar conta ' + contas[0].tipoConta.toLowerCase() + '</a>';

                grid.append(elemento1);
                grid.append(elemento2);

                idsConta.push(contas[0].id);
                idsConta.push(contas[1].id);
                localStorage.setItem('idsConta', JSON.stringify(idsConta));
                break;

            default:
                break;
        }
    }
})

const themeToggleBtn = document.getElementById('theme-toggle');
const card = document.querySelector('.card');
const bemVindoH1 = document.querySelector('.bemVindo').querySelector('h1');
const bemVindoSMALL = document.querySelector('.bemVindo').querySelector('small');
const nomeTitular = document.querySelector('.nomeTitular').querySelector("label[for='nomeTitular']");

const body = document.body;

let isDarkTheme = false;

themeToggleBtn.addEventListener('click', function () {

    if (isDarkTheme) {
        //Light
        body.classList.remove('bg-dark', 'text-light');
        body.classList.add('bg-light', 'text-dark');
        card.classList.remove('card-bg-dark');
        card.classList.add('card-bg-light');
        bemVindoH1.style.color = 'black';
        bemVindoSMALL.style.color = 'black';
        nomeTitular.style.color = 'black';


        themeToggleBtn.innerHTML = '<i class="uil uil-moon change-theme" id="theme-button"></i>';
        isDarkTheme = false;
    } else {
        //Dark
        card.classList.remove('card-bg-light');
        card.classList.add('card-bg-dark');
        body.classList.remove('bg-light', 'text-dark');
        body.classList.add('bg-dark', 'text-light');
        bemVindoH1.style.color = '#f8ea6a';
        bemVindoSMALL.style.color = '#f8ea6a';
        nomeTitular.style.color = '#f8ea6a';

        themeToggleBtn.innerHTML = '<i class="uil uil-moon-eclipse" id="theme-button"></i>';
        isDarkTheme = true;
    }
});

function carregarContas(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `/api/conta/obtercontas/${id}`,
            type: 'GET',
            success: function (response) {
                localStorage.setItem('contas', JSON.stringify(response));
                resolve(response);
            },
            error: function (response) {
                if (response.status == 404) {
                    var grid = $('.d-grid');
                    grid.append('<div class="alert alert-warning d-flex align-items-center" role="alert"><svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg><div>Você não possui contas</div></div>');
                    grid.append('<a class="btn btn-primary" href="/cadastrarconta.html">Abrir nova conta</a>');
                } else {
                    document.getElementById('mensagem').innerHTML = `
                                <div class="alert alert-warning d-flex align-items-center" role="alert">
                                    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                                    <div>
                                        ${response.responseText}
                                    </div>
                                </div>
                            `;
                }
                reject(response);
            }
        });
    });
}

function LimparDados() {
    localStorage.clear();
}