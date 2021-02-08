//  2C = Two of Clubs (Treboles)
//  2D = Two of Diamond
//  2H = Two of Hearts
//  2S = Two of Spades


let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

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

    // console.log(deck);
    deck = _.shuffle(deck);
    console.log(deck);

    return deck;
}

crearDeck();

//Esta función me permita tomar una carta
const pedirCarta = ()=> {

    if (deck.length === 0){
        throw 'No hay cartas en el Deck'
    }

    const carta = deck.pop();
    console.log(carta);//debe ser de la baraja y salir de ahí
    return carta;
}

// pedirCarta();
// console.log(deck);

const valorCarta = (carta)=> {

    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
    // let puntos = 0;
    // if (isNaN(valor)){
    //     //si no es un numero
    //     puntos = (valor === 'A') ? 11 : 10;
    //     //operador ternario la A vale 11
    //     //si es cualquier otra leta vale 10
    // }else {
    //     puntos = valor * 1; // con esta multiplicación convertimos a número
    // }

    // console.log(puntos);
}

const valor = valorCarta(pedirCarta());
console.log(valor);