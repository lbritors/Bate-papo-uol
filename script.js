let idAtualizarMensagem = 0;
let idIntervalConexao = 0; 
let mensagensChat = [];
let user = nomeUsuario();
let inputMsg = document.querySelector("input").value;



function nomeUsuario() {
    let nome = prompt("Digite o nome do usuário: ");
    return nome;
}
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

function mantemConexao() {
    idIntervalConexao = setInterval(verificaConexao, 5000);
    return idIntervalConexao;
}
function desfazConexao() {
    clearInterval(idIntervalConexao);
}

function buscarMensagens() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(acessarMensagens);
    promise.catch(erroAoBuscarMensagens);
}

function acessarMensagens(resposta) {
    mensagensChat = resposta.data;
    console.log(mensagensChat);
    mostrarMensagens(mensagensChat);   
}
function erroAoBuscarMensagens(erro) {
    console.log("Erro ao buscar mensagens :(")
}

buscarMensagens();
function atualizarMensagens() {
    idAtualizarMensagem = setInterval(buscarMensagens, 4000);
    return idAtualizarMensagem;
}
function enviarMensagens() {
    let mensagem = {time: user, to: "Todos", from: inputMsg, type: "message"};
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagem);
    promise.then(mensagemEnviada);
    promise.catch(erroAoenviarMensagem);
}

function mensagemEnviada(resposta) {
    const enviar = document.querySelector(".enviar");
    enviar.addEventListener("click", atualizarMensagens);  
}

function erroAoenviarMensagem(erro) {
    console.log("Erro ao enviar mensagem! Tente novamente.");
}

function mostrarMensagens(lista) {
    const container = document.querySelector(".container-mensagens");
    const mensagem = document.createElement("ul");
    container.appendChild(mensagem);
    mensagem.classList.add("mensagem");
    lista = mensagensChat;
    for (let i = 0; i < mensagensChat.length; i++) {
        if (mensagensChat[i].type === "message") {
            mensagem.innerHTML += `<li class = "message"> <span class="time"> <p>(${mensagensChat[i].time})&nbsp</p> </span><span>${mensagensChat[i].from} para Todos &nbsp</span><span>${mensagensChat[i].text}</span></li>`;
        } else if (mensagensChat[i].type === "status") {
            mensagem.innerHTML += `<li class = "status"><span class="time"> <p>(${mensagensChat[i].time})&nbsp</p> </span><span>${mensagensChat[i].from} &nbsp</span><span>${mensagensChat[i].text}</span></li> `;
        } else if (mensagem[i].type === "private-message") {
            mensagem.innerHTML += `<li class = "privado" <span class="time"> <p>(${mensagensChat[i].time})&nbsp</p> </span><span>${mensagensChat[i].from} &nbsp</span><span>${mensagensChat[i].text}</span></li> `;
        }
        
    }
}