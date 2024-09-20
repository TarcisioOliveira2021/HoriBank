var urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get('id');
var conta = [];

const depositarBtn = document.getElementById('depositar');
const sacarBtn = document.getElementById('sacar');
const transferirBtn = document.getElementById('transferir');
const historicoBtn = document.getElementById('historico');
const contaTexto = document.querySelector('.conta').querySelector('h1');
const saldo = document.querySelector('.saldo').querySelector('h2');
const informacoesConta = document.querySelector('.informacoes');
const servicosConta = document.querySelector('.servicos');
const operacoesConta = document.querySelector('.operacoes');


depositarBtn.addEventListener('click', function () {
    window.location.href = `/depositar.html?id=${id}`;
});

sacarBtn.addEventListener('click', function () {
    window.location.href = `/sacar.html?id=${id}`;
});

transferirBtn.addEventListener('click', function () {
    window.location.href = `/transferir.html?id=${id}`;
});

historicoBtn.addEventListener('click', function () {
    window.location.href = `/historico.html?id=${id}`;
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
        contaTexto.style.color = 'black';
        saldo.style.color = 'black';
        informacoesConta.style.color = 'black';
        servicosConta.style.color = 'black';
        operacoesConta.style.color = 'black';

        var icone = document.querySelector('#exibirSaldo').querySelector('i');
        icone.style.color = 'black';
        
        themeToggleBtn.innerHTML = '<i class="uil uil-moon change-theme" id="theme-button"></i>';
        isDarkTheme = false;
    } else {
        //Dark
        card.classList.remove('card-bg-light');
        card.classList.add('card-bg-dark');
        body.classList.remove('bg-light', 'text-dark');
        body.classList.add('bg-dark', 'text-light');
        contaTexto.style.color = '#f8ea6a';
        saldo.style.color = '#f8ea6a';
        informacoesConta.style.color = '#f8ea6a';
        servicosConta.style.color = '#f8ea6a';
        operacoesConta.style.color = '#f8ea6a';
        
        var icone = document.querySelector('#exibirSaldo').querySelector('i');
        icone.style.color = 'rgb(248, 234, 106)';
        
        themeToggleBtn.innerHTML = '<i class="uil uil-moon-eclipse" id="theme-button"></i>';
        isDarkTheme = true;
    }
});

recuperarInformacoesConta(id).then(response => {
    const botaoSaldo = document.getElementById('exibirSaldo');
    const numeroComDigito = document.getElementById('numeroComDigito');
    const tipoConta = document.getElementById('tipoConta');
    numeroComDigito.innerHTML = `Número da conta: ${conta.numero}-${conta.digito}`;
    tipoConta.innerHTML = `Tipo da conta: ${conta.tipoConta}`;
    let contaOrigemLogada = `${conta.numero}-${conta.digito}`;
    localStorage.setItem('contaOrigemLogada', JSON.stringify(contaOrigemLogada));
    localStorage.setItem('saldoContaLogada', JSON.stringify(conta.saldo));
    localStorage.setItem('tipoContaLogada', JSON.stringify(conta.tipoConta));

    botaoSaldo.addEventListener('click', function () {
        var saldo = document.querySelector('.saldoConta');

        
        if (saldo.innerText === '*****') {
            botaoSaldo.innerHTML = '<i class="uil uil-eye"></i>';
            saldo.innerText = formatarMoeda(conta.saldo);
            var icone = document.querySelector('#exibirSaldo').querySelector('i');
            isDarkTheme ?  icone.style.color = 'rgb(248, 234, 106)': icone.style.color = 'black';
        } else {
            botaoSaldo.innerHTML = '<i class="uil uil-eye-slash"></i>';
            saldo.innerText = '*****';
            var icone = document.querySelector('#exibirSaldo').querySelector('i');
            isDarkTheme ?  icone.style.color = 'rgb(248, 234, 106)': icone.style.color = 'black';
        }
    });
});

function recuperarInformacoesConta(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `/api/conta/obterconta/${id}`,
            type: 'GET',
            success: function (response) {
                conta = JSON.parse(JSON.stringify(response));
                resolve(response);
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
                reject(response);
            }
        });
    });
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}
