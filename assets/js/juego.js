//  2C = Two of Clubs (Treboles)
//  2D = Two of Diamond
//  2H = Two of Hearts
//  2S = Two of Spades

let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0;
let puntosComputadora = 0;

//Referencias del HTML
const btnNuevoJuego = document.querySelector('#btnNuevo');
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const puntosHTML = document.querySelectorAll('small');

//Esta funcion crea una nueva baraja
const crearDeck = () => {
    for (let i = 2; i <= 10; i++){

        for (let tipo of tipos){            
            deck.push(i + tipo);
        }
    }

    for (let tipo of tipos){

        for (let especial of especiales){
            deck.push(especial + tipo);
        }
    }

    deck = _.shuffle(deck);

    return deck;
}

crearDeck();

//Esta función me permita tomar una carta
const pedirCarta = ()=> {

    if (deck.length === 0){
        throw 'No hay cartas en el Deck'
    }

    const carta = deck.pop();
    return carta;
}

// pedirCarta();

const valorCarta = (carta)=> {

    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
}
//turno de la computadora
const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta();
        puntosComputadora += valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;

        // <img class="carta" src="./assets/cartas/10C.png" alt="">
        const imgCarta = document.createElement('img');
        imgCarta.src = `./assets/cartas/${carta}.png`;
        imgCarta.className = 'carta';
        divCartasComputadora.append(imgCarta);

        if (puntosMinimos > 21){
            break;
        }

    }while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

    setTimeout(()=>{
        if (puntosComputadora === puntosMinimos){
            alert('Nadie gana');
        }else if (puntosMinimos > 21){
            alert('Computadora gana');
        }else if (puntosComputadora > 21){
            alert('Jugador gana');
        }else if ((puntosComputadora > puntosMinimos) && (puntosComputadora < 21) ){
            alert('Computadora gana');
        }else{
            alert('Computadora gana');
        }
    }, 10);

    
};

//Eventos
btnPedir.addEventListener('click', ()=>{
    const carta = pedirCarta();
    puntosJugador += valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    // <img class="carta" src="./assets/cartas/10C.png" alt="">
    const imgCarta = document.createElement('img');
    imgCarta.src = `./assets/cartas/${carta}.png`;
    imgCarta.className = 'carta';
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21){
        console.warn('21 Genial!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugador);
    }
});

btnDetener.addEventListener('click', ()=>{
    btnPedir.disabled = true;
    turnoComputadora(puntosJugador);
    btnDetener.disabled = true;
});

btnNuevoJuego.addEventListener('click', ()=>{
    btnDetener.disabled = false;
    btnPedir.disabled = false;

    puntosJugador = 0;
    puntosComputadora = 0;

    deck = [];
    crearDeck();

    divCartasJugador.innerHTML = '';
    divCartasComputadora.innerHTML = '';

    puntosHTML[0].innerText = '0';
    puntosHTML[1].innerText = '0';
});

