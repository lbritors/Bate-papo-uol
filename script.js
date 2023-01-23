let idAtualizarMensagem = 0;
let idIntervalConexao = 0; 
let mensagensChat = [];
let user = nomeUsuario();



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
    buscarMensagens();
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


function buscarMensagens() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(acessarMensagens);
    promise.catch(erroAoBuscarMensagens);
}

function acessarMensagens(resposta) {
    mensagensChat = resposta.data;
    console.log(mensagensChat);  
    mostrarMensagens();
    mostrarUltima();
}
function erroAoBuscarMensagens(erro) {
    console.log("Erro ao buscar mensagens :(")
}


function atualizarMensagens() {
    idAtualizarMensagem = setInterval(buscarMensagens, 3000);
    return idAtualizarMensagem;
}
function enviarMensagens() {
    let inputMsg = document.querySelector("input").value;
    let mensagem = { from: user, to: "Todos", text: inputMsg, type: "message" };
    const enviar = document.querySelector(".enviar");
    enviar.addEventListener("click", mostrarUltima); 
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagem);
    console.log(mensagem);
    document.querySelector("input").value = "";
    
    promise.then(mensagemEnviada);
    promise.catch(erroAoenviarMensagem);
}

function mensagemEnviada(resposta) {
    console.log("Enviou!");
    buscarMensagens();
    verificaConexao();
}

function mostrarUltima() {
    const ultima = document.querySelector("ul");
    ultima.lastElementChild.scrollIntoView();
}

function erroAoenviarMensagem(erro) {
    console.log("Erro ao enviar mensagem! Tente novamente.");
    window.location.reload();
}

function mostrarMensagens(lista) {
    const container = document.querySelector(".container-mensagens");
    const mensagem = document.createElement("ul");
    container.appendChild(mensagem);
    mensagem.classList.add("mensagem");
    
    mensagem.innerHTML = " ";
    lista = mensagensChat;
    for (let i = 0; i < mensagensChat.length; i++) {
        if (mensagensChat[i].type === "message") {
            mensagem.innerHTML += `<li data-test="message" class = "message"> <span class="time"> <p>(${mensagensChat[i].time})&nbsp</p> </span><span class= "remetente">${mensagensChat[i].from} &nbsp</span><span> para Todos &nbsp${mensagensChat[i].text}</span></li>`;
        } else if (mensagensChat[i].type === "status") {
            mensagem.innerHTML += `<li data-test="message" class = "status"><span class="time"> <p>(${mensagensChat[i].time})&nbsp</p> </span><span class="remetente">${mensagensChat[i].from} &nbsp</span><span>${mensagensChat[i].text}</span></li> `;
        }
    }
    mostrarUltima();
}
