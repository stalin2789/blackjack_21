//  2C = Two of Clubs (Treboles)
//  2D = Two of Diamond
//  2H = Two of Hearts
//  2S = Two of Spades
//funcion anonima autoinvocada
const miModulo = (()=>{
    'use strict';
    
    let deck = [];
    const tipos = ['C','D','H','S'],
          especiales = ['A','J','Q','K'];

    // let puntosJugador = 0,
    //     puntosComputadora = 0;
    let puntosJugadores = [];

    //Referencias del HTML
    const btnNuevoJuego = document.querySelector('#btnNuevo'),
          btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small');


    const inicializarJuego = ( numJugadores = 2 )=>{

        deck = crearDeck();
        puntosJugadores = [];

        for (let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0);
        }

        puntosHTML.forEach( elementoHtml => elementoHtml.innerText = 0 );
        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        btnDetener.disabled = false;
        btnPedir.disabled = false;
    };

    //Esta funcion crea una nueva baraja
    const crearDeck = () => {

        deck = [];

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

        return _.shuffle(deck);
    }

    
    //Esta función me permita tomar una carta
    const pedirCarta = ()=> {

        if (deck.length === 0){
            throw 'No hay cartas en el Deck'
        }
        
        return deck.pop();
    }

    //Esta función sirve para obtener el valor de la carta
    const valorCarta = (carta)=> {

        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
                (valor === 'A') ? 11 : 10
                : valor * 1;
    }
    //Turno: 0 primer jugador y el ultimo sera la computadora
    const acumularPuntos = ( carta, turno ) => {
        
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];
    }

    const crearCarta = ( carta, turno )=>{

        const imgCarta = document.createElement('img');
        imgCarta.src = `./assets/cartas/${carta}.png`;
        imgCarta.className = 'carta';

        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

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
    }

    //turno de la computadora
    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();

            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);


        } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

        determinarGanador();
       
    }

    //Eventos
    btnPedir.addEventListener('click', ()=>{

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(1);

        } else if (puntosJugador === 21){
            console.warn('21 Genial!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);            
        }
    });

    btnDetener.addEventListener('click', ()=>{
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });

    btnNuevoJuego.addEventListener('click', ()=>{

        inicializarJuego();
        
    });

    return {
        nuevoJuego: inicializarJuego
    };
    
})();
