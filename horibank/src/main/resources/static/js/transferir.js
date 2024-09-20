var urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get('id');
let saldoConta = JSON.parse(localStorage.getItem('saldoContaLogada'));
const campoSaldoAtual = document.getElementById('saldoAtual').querySelector('small');
campoSaldoAtual.innerHTML = `R$ ${saldoConta}`;

$('#numeroComDigito').mask('000000-0', { placeholder: "123456-7" });
$('#valorTransferencia').mask('000.000.000.000.000,00', { reverse: true });
$('#valorTransferencia').on('blur', function () {
    var value = $(this).val();
    if (value) {
        $(this).val('R$ ' + value);
    }
});

$('#valorTransferencia').on('focus', function () {
    var value = $(this).val().replace('R$ ', '');
    $(this).val(value);
});


const voltar = document.getElementById('voltar');
voltar.addEventListener('click', function () {
    window.location.href = `/conta.html?id=${id}`;
});

const texto = document.querySelector('.transferencia').querySelector('h1');
const saldoTexto = document.querySelector('.transferencia').querySelector("label");
const textoTransferencia = document.querySelector('.formulario').querySelector("label[for='valorTransferencia']");
const textoNumeroContaTransferencia = document.querySelector('.formulario').querySelector("label[for='numeroComDigito']");
const textoTipoContaTransferencia = document.querySelector('.formulario').querySelector("label[for='tipoConta']");
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
        texto.style.color = 'black';
        saldoTexto.style.color = 'black';
        textoTransferencia.style.color = 'black';
        textoNumeroContaTransferencia.style.color = 'black';
        textoTipoContaTransferencia.style.color = 'black';


        themeToggleBtn.innerHTML = '<i class="uil uil-moon change-theme" id="theme-button"></i>';
        isDarkTheme = false;
    } else {
        //Dark
        card.classList.remove('card-bg-light');
        card.classList.add('card-bg-dark');
        body.classList.remove('bg-light', 'text-dark');
        body.classList.add('bg-dark', 'text-light');
        texto.style.color = '#f8ea6a';
        saldoTexto.style.color = '#f8ea6a';
        textoTransferencia.style.color = '#f8ea6a';
        textoNumeroContaTransferencia.style.color = '#f8ea6a';
        textoTipoContaTransferencia.style.color = '#f8ea6a';


        themeToggleBtn.innerHTML = '<i class="uil uil-moon-eclipse" id="theme-button"></i>';
        isDarkTheme = true;
    }
});

function transferir() {
    var myModal = new bootstrap.Modal(document.getElementById('modalConfirma'));
    let valorTransferencia = document.getElementById('valorTransferencia').value;
    var urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');

    if (valorTransferencia === "") {
        event.preventDefault();
        document.getElementById('mensagem').innerHTML = `
                    <div class="alert alert-danger d-flex align-items-center mb-2" role="alert">
                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                        <div>
                            Um ou mais campos não foram preenchido
                        </div>
                    </div>
                `;
    }
    else {
        const modalValorTransferencia = document.getElementById('valorTransferenciaModal');
        const modalContaDestino = document.getElementById('contaDestinoModal');
        const modalContaOrigem = document.getElementById('contaOrigemModal');
        const modalTitularContaDestino = document.getElementById('titularContaDestinoModal');
        const contaDestinoCompleta = document.getElementById('numeroComDigito').value;
        const tipoContaDestinoModal = document.getElementById('tipoContaDestinoModal');
        var contaOrigemCompleta = JSON.parse(localStorage.getItem('contaOrigemLogada'));
        var tipoContaOrigem = JSON.parse(localStorage.getItem('tipoContaLogada'));
        const tipoContaDestino = document.getElementById('tipoContaDestino').value;

        modalValorTransferencia.innerHTML = valorTransferencia;
        modalContaDestino.innerHTML = contaDestinoCompleta;
        modalContaOrigem.innerHTML = contaOrigemCompleta;

        obterDadosContaDestino(contaDestinoCompleta,tipoContaDestino).then((response) => {
            modalTitularContaDestino.innerHTML = response.nomePessoa;
            tipoContaDestinoModal.innerHTML = response.tipoConta;

            if (contaDestinoCompleta === contaOrigemCompleta && response.tipoConta === tipoContaOrigem) {
                document.getElementById('mensagem').innerHTML = `
                            <div class="alert alert-danger d-flex align-items-center" role="alert">
                                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                                <div>
                                    Não é possível transferir para a mesma conta
                                </div>
                            </div>
                        `;
                return;
            }

            myModal.show();

            const confirmarTransferencia = document.getElementById('confirmarTransferenciaModal');
            confirmarTransferencia.addEventListener('click', function () {
                myModal.hide();

                var transferencia = {
                    valor: valorTransferencia.replace('R$ ', '').replace('.', '').replace(',', '.'),
                    idContaOrigem: id,
                    idContaDestino: response.idConta,
                    tipoContaDestino: response.tipoConta
                };


                $.ajax({
                    url: '/api/conta/transferir',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(transferencia),
                    success: function (response) {
                        document.getElementById('mensagem').innerHTML = `
                                    <div class="alert alert-success d-flex align-items-center" role="alert">
                                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                                        <div>
                                            ${response}
                                        </div>
                                    </div>
                                `;
                    },
                    error: function (response) {
                        console.log(response);
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
            });
        })


    }
}

function cancelarModal() {
    var myModal = new bootstrap.Modal(document.getElementById('modalConfirma'));
    myModal.hide();
}


function obterDadosContaDestino(numeroContaDestino, tipoContaDestino) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `/api/conta/obtercontapornumero/${numeroContaDestino}/${tipoContaDestino}`,
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