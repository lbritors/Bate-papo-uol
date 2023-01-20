console.log(axios);

function nomeUsuario() {
    let nome = prompt("Digite o nome do usuário: ");
    return nome;
}
const user = nomeUsuario();
const usuario = { name: user };
function mandaRequisiçãoNome() {
    const response = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", usuario);
    response.then(processarResponse);
    response.catch(deuErro);
}
mandaRequisiçãoNome();

function processarResponse(resposta) {
    console.log(resposta);
    console.log(resposta.data);
}

function deuErro(erro) {
    console.log(erro);
    prompt("Usuário com mesmo nome online. Digite um novo nome");
}

function VerificaConexao() {
    const response = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", usuario);
    response.then(processarResponse);
    response.catch(deuErro);
    return response;
}

function mantemConexao() {
    setInterval(VerificaConexao, 5000);
}
let idInterval = mantemConexao();
console.log(idInterval);

function criaMensagem() {
    const container = document.querySelector(".container-mensagens");
    const template = `
    <div class="mensagem">
                <span>hora</span>
                <span>${usuario}</span>
                <span>para</span>
            </div>
    `;
    
    container.innerHTML = innerHTML + template;
    
}