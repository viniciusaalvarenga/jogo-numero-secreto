let listaDeNumerosSorteados = [];
let numeroLimite = 50;
let numeroAleatorio = gerarNumeroAleatorio();
let tentativas = 1;

// let titulo = document.querySelector("h1");
// titulo.innerHTML = "Jogo do Número Secreto";

// let paragrafo = document.querySelector(".texto__paragrafo");
// paragrafo.innerHTML = "Selecione um número entre 1 e 10.";

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2})
}

function mensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Selecione um número entre 1 e 50.');
}

mensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroAleatorio) {
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o Número Secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroAleatorio) {
            exibirTextoNaTela('p', 'O número é menor.');
        } else {
            exibirTextoNaTela('p', 'O número é maior.');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let NumeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = []
    }

    if (listaDeNumerosSorteados.includes(NumeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(NumeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return NumeroEscolhido;
    }
}

function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroAleatorio = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
