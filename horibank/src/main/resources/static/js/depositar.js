var urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get('id');

$('#valorDeposito').mask('000.000.000.000.000,00', { reverse: true });
$('#valorDeposito').on('blur', function () {
    var value = $(this).val();
    if (value) {
        $(this).val('R$ ' + value);
    }
});

$('#valorDeposito').on('focus', function () {
    var value = $(this).val().replace('R$ ', '');
    $(this).val(value);
});

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

function depositar() {
    let valorDeposito = document.getElementById('valorDeposito').value.replace('R$ ', '').replace("'", "").replace(",", ".");
    var urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');

    if (valorDeposito === "") {
        event.preventDefault();
        document.getElementById('mensagem').innerHTML = `
            <div class="alert alert-danger d-flex align-items-center" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                <div>
                    O campo não foi preenchido
                </div>
            </div>
        `;
    } else {

        var deposito = {
            valor: valorDeposito,
            idConta: id
        };

        $.ajax({
            url: '/api/conta/depositar',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(deposito),
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
}