// patron modulo // Funcion anonima autoinvocada
const miModulo = (() => {
    'use strict'

    // ARRAYS
    let deck = [];
    const tipos = ['C', 'D', 'H', 'S']
    const especiales = ['A', 'J', 'Q', 'K'];

    // VARIABLES
    let puntosJugadores = [];



    // REFERENCIAS DE HTML
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevo = document.querySelector('#btnNuevo');
    const smalls = document.querySelectorAll('small');

    const divCartasJugadores = document.querySelectorAll('.divCartas')


    // Funcion para inicializar el Juego
    const iniciarJuego = (numeroJugadores = 2) => {
        deck = crearDeck();

        puntosJugadores = [];
        for (let i = 0; i < numeroJugadores; i++) {
            puntosJugadores.push(0);
        }

        smalls.forEach(puntos => puntos.innerText = 0);
        divCartasJugadores.forEach(carta => carta.innerHTML = '')

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    // Funcion para crear la baraja de cartas
    const crearDeck = () => {
        deck = [];

        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }
        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }
        }
        // funcion de una biblioteca externa para desordene los elementos del array 
        return _.shuffle(deck);
    }


    // Funcion que permite tomar una carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        // cogemos la ultima carta del array 
        return deck.pop();
    }


    // Funcion para obtener el valor de la carta
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        // const valor = carta.slice(0,-1); otra forma de hacer lo de arriba

        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : parseInt(valor);
    }


    // Funcion para acomular puntos Jugador
    // turno: 0 = primer jugador y el ultimo sera la computadora
    const acomularPuntos = (carta, turno) => {
        puntosJugadores[turno] += valorCarta(carta);
        smalls[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];
    }

    // Funcion para pintar la carta 
    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    // Funcion para determinar el ganador 
    const determinarGanador = () => {
        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie gana :(');
            } else if (puntosMinimos > 21) {
                alert('La computadora Gana')
            } else if (puntosComputadora > 21) {
                alert('Jugador Gana')
            } else {
                alert('Computadora Gana')
            }
        }, 100)

    }

    // TURNO DE LA COMPUTADORA
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            puntosComputadora = acomularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();
    };

    // FUNCIONES EVENTOS

    // BOTON PEDIR CARTA
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acomularPuntos(carta, 0);

        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);

        } else if (puntosJugador === 21) {
            console.warm('21, genial');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }

    });

    // BOTON DETENER 
    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugadores[0]);
    });

    // BOTON NUEVO JUEGO
    btnNuevo.addEventListener('click', () => {
        iniciarJuego();
    })

    return {
        nuevoJuego: iniciarJuego
    };

})();


