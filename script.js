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

function verificaConexao() {
    const response = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", usuario);
    response.then(processarResponse);
    response.catch(deuErro);
    return response;
}

let idInterval = 0; 
function mantemConexao() {
    idInterval = setInterval(verificaConexao, 5000);
    return idInterval;
}
function desfazConexao() {
    clearInterval(idInterval);
}

function buscarMensagens() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(acessarMensagens);
    promise.catch(erroAoBuscarMensagens);
}

function acessarMensagens(resposta) {
    resposta = resposta.data;
    console.log(resposta);
    return resposta;
}
buscarMensagens();

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