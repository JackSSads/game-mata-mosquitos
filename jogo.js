
var altura = 0
var largura = 0

var vidas = 1
var tempo = 15                                               // Tempo até o termino do jogo

var criaMosquitoTempo = 1500                                 // Tempo de criação dos mosquitos

var nivel = window.location.search                           // Recuperação do nível através da url q contem o parâmetro nivel
nivel = nivel.replace('?', '')                               // Remoção do ? q fica antes do nível

if (nivel === 'normal')                                      // Verificação do nível selecionado
{ // 15000 ms
    criaMosquitoTempo = 1500                                 // Alteração da velocidade em que o mosquito é criado de acordo com op nível selecionado
}
else if (nivel === 'dificil')
{ // 1000 ms
    criaMosquitoTempo = 1000                                 // Alteração da velocidade em que o mosquito é criado de acordo com op nível selecionado
}
else if (nivel === 'chucknorris')
{ // 750 ms
    criaMosquitoTempo = 750                                  // Alteração da velocidade em que o mosquito é criado de acordo com op nível selecionado
}

function ajustaTamanhaPalcoJogo()
{
    //==============================================================//
    // atrubui a variável altura o valor da altua máxima da tela    //
    // atrubui a variável larguar o valor da largura máxima da tela //
    //==============================================================//
    altura = window.innerHeight 
    largura = window.innerWidth  

    console.log(largura, altura)
}

ajustaTamanhaPalcoJogo()

var cronometro = setInterval(function ()
{
    tempo -= 1                                               // Recupera a variável tempo e decrementa 1 a cada ciclo 

    //======================================================================//
    // Verifica se o tempo é igual a 0, caso seja, limpa os métodos         //
    // setInterval cria moscas e cronometro e redireciona para vitoria.html //
    //======================================================================//
    if (tempo < 0) 
    {
        clearInterval(cronometro)
        clearInterval(criaMoscas)
        window.location.href = 'vitora.html'
    }

    //==================================================================//
    // O innerHTML serve para recuperar os elementos que estão dentro   //
    // da tag. Ex: <span id="ola">olá</span> ; innerHtml = 'Ola, mundo! //
    // restultado seria <sapan id="ola">Olá, Mundo!</span>              //
    //==================================================================//
    document.getElementById('cronometro').innerHTML = tempo
}, 1000)

function posicaoRandomica()
{
    //================================================//
    // Remover o ID 'mosquito' anterior (caso exista) //
    //================================================//
    if (document.getElementById('mosquito'))
    {
        document.getElementById('mosquito').remove()
        
        //====================================================================//
        // Verifica se a quantidade de vidas é > 3 redireciona para a página  //
        // fim_de_jogo.html, caso contrário remove os pontos de vida visual e //
        // adiciona + 1 a variével vida                                       //
        //====================================================================//
        if (vidas > 3)
        {
            window.location.href = 'fim_de_jogo.html'
        } 
        else
        {
            document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"
            vidas ++
        }
        
    }

    //==========================================================//
    // Irá gerar valores aleatótios que será a dimenção da tela //
    // passando o próprio valor como limite e arredondando para //
    // baixo com o Math.floor                                   //
    //==========================================================//
    var posicaoX = Math.floor(Math.random() * largura) - 90
    var posicaoY = Math.floor(Math.random() * altura) - 90   // romoveu-se 90 para que não transbordasse e gerasse barra de rolagem

    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    console.log(posicaoX, posicaoY)

    //=========================//
    // criar elementos HTML ;   //
    // criando um elemento img //
    //=========================//
    var mosquito = document.createElement('img')                
    mosquito.src = 'imagens/mosquito.png'

    //==========================================================//
    // Adicionado um espacamento para que o interpretador saiba //
    // diferencias os métodos                                   //
    //==========================================================//
    mosquito.className = tamanhoAleatorio() + ' ' +ladoAleatorio()
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'
    mosquito.onclick = function ()
    {
        this.remove() // Remove esta função
    }

    //==========================================//
    //adicionando o elemento img dentro do body //
    //==========================================//
    document.body.appendChild(mosquito)
    
}

function tamanhoAleatorio()
{
    //=======================================================//
    // Gerando um valor aleatório para o tamanho do mosquito //
    //=======================================================//
    var classe = Math.floor(Math.random() * 3)
    
    switch(classe)
    {
        //=================================================//
        // Aqui o Breack não é necessário pois o return já //
        // interrompe o funcionamento                      //
        //=================================================//
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}

function ladoAleatorio()
{
    //=============================================//
    // Posição no eixo X para a imagem do mosquito //
    //=============================================//
    var classe = Math.floor(Math.random() * 2)
    
    switch(classe)
    {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}
