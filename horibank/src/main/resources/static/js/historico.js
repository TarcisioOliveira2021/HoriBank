var urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get('id');


const voltar = document.getElementById('voltar');
voltar.addEventListener('click', function () {
    window.location.href = `/conta.html?id=${id}`;
});


const themeToggleBtn = document.getElementById('theme-toggle');
const card = document.querySelector('.card');
const body = document.body;
let isDarkTheme = false;
themeToggleBtn.addEventListener('click', function () {

    if (isDarkTheme) {
        //Light
        body.classList.remove('bg-dark', 'text-light');
        body.classList.add('bg-light', 'text-dark');
        card.classList.remove('card-bg-dark');
        card.classList.add('card-bg-light');


        themeToggleBtn.innerHTML = '<i class="uil uil-moon change-theme" id="theme-button"></i>';
        isDarkTheme = false;
    } else {
        //Dark
        card.classList.remove('card-bg-light');
        card.classList.add('card-bg-dark');
        body.classList.remove('bg-light', 'text-dark');
        body.classList.add('bg-dark', 'text-light');

        themeToggleBtn.innerHTML = '<i class="uil uil-moon-eclipse" id="theme-button"></i>';
        isDarkTheme = true;
    }
});


obterDadosHistoricoTransferencia(id).then((response) => {
    var historicos = JSON.parse(JSON.stringify(response));
    console.log(historicos);
    const tabela = document.getElementById('tabelaHistorico').querySelector('tbody');

    historicos.forEach(historico => {
        tabela.innerHTML += `
            <tr>
                <td>${historico.id}</td>
                <td>${historico.titularContaDestino}</td>
                <td>${historico.valor}</td>
                <td>${historico.data}</td>
                <td>${historico.hora}</td>
                <td>${historico.tipoContaDestino}</td>
            </tr>
        `;
    });
});

function obterDadosHistoricoTransferencia(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `/api/transferencia/historico/${id}`,
            type: 'GET',
            success: function (response) {
                resolve(response);
            },
            error: function (response) {
                reject(response);
                document.getElementById('mensagem').innerHTML = `
                                    <div class="alert alert-warning d-flex align-items-center" role="alert">
                                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                                        <div>
                                            ${response.responseText}
                                        </div>
                                    </div>
                        `;
            }
        })
    });
}