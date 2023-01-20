
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

function erroAoBuscarMensagens(erro) {
    console.log(erro);
}

const mensagem = {from: user, to: "Todos", text: "oi", type: "message"};
function enviarMensagens() {
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagem);
    promise.then(mensagemEnviada);
    promise.catch(erroAoenviarMensagem);
}

function mensagemEnviada(resposta) {
    buscarMensagens();
}

function erroAoenviarMensagem(erro) {
    console.log("Erro ao enviar mensagem! Tente novamente.");
}

enviarMensagens();




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