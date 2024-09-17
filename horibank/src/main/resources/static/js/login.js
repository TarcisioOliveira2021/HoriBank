const trocaTemaBtn = document.getElementById('trocaTemaBtn');
const titulo = document.querySelector('.row').querySelector("h1");
const card = document.querySelector('.card');
const nomeTitularLabel = document.querySelector('.titular').querySelector("label[for='nomeTitular']");
const senhaLabel = document.querySelector('.senha').querySelector("label[for='senha']");
const textoAulixarSenha = document.querySelector('.senha').querySelector("label[for='senha']").querySelector(".text-muted");

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
        nomeTitularLabel.style.color = "black";
        senhaLabel.style.color = "black";
        textoAulixarSenha.style.setProperty("color", "black", "important");

        trocaTemaBtn.innerHTML = '<i class="uil uil-moon change-theme" id="trocaBtn"></i>';
        isDarkTheme = false;
    } else {
        //Dark
        body.classList.remove('bg-light', 'text-dark');
        body.classList.add('bg-dark', 'text-light');
        card.classList.remove('card-bg-light');
        card.classList.add('card-bg-dark');

        titulo.style.color = "#f8ea6a";
        nomeTitularLabel.style.color = "#f8ea6a";
        senhaLabel.style.color = "#f8ea6a";
        textoAulixarSenha.style.setProperty("color", "#f8ea6a", "important");

        trocaTemaBtn.innerHTML = '<i class="uil uil-moon-eclipse" id="trocaBtn"></i>';
        isDarkTheme = true;
    }
});

function login() {
    let nomeTitular = document.getElementById('nomeTitular').value;
    let senha = document.getElementById('senha').value;
    let continuar = true;

    if (nomeTitular === "" || senha === "") {
        event.preventDefault();
        document.getElementById('mensagem').innerHTML = `
                <div class="alert alert-danger d-flex align-items-center" role="alert">
                    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                    <div>
                        Um ou mais campos não foram preenchido
                    </div>
                </div>
            `;
        continuar = false;
    }

    var login = {
        nome: nomeTitular,
        senha: senha,
    };

    if (continuar) {
        $.ajax({
            url: `/api/pessoa/login`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(login),
            success: function (response) {
                document.getElementById('mensagem').innerHTML = `
                        <div class="alert alert-success d-flex align-items-center" role="alert">
                            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                            <div>
                                Logado com sucesso
                            </div>
                        </div>
                    `;
                setInterval(function () {
                    localStorage.setItem('pessoaLogadaId', JSON.stringify(response.id));
                    localStorage.setItem('pessoaLogadaNome', JSON.stringify(response.nome));
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
}

function mostrarSenha() {
    var senhaField = $('#senha');
    var iconEye = document.getElementById('iconeSenha');

    if (senhaField.attr('type') === 'password') {
        senhaField.attr('type', 'text');
        iconEye.innerHTML = '<i class="uil uil-eye-slash"></i>';
    } else {
        senhaField.attr('type', 'password');
        iconEye.innerHTML = '<i class="uil uil-eye"></i>';
    }
}