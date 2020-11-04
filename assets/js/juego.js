(() => {

    // ARRAYS
    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K']

    // VARIABLES
    let puntosJugador = 0;
    let puntosComputadora = 0;


    // REFERENCIAS DE HTML
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevo = document.querySelector('#btnNuevo');
    const smalls = document.querySelectorAll('small');

    const divCartasJugador = document.querySelector('#jugador-cartas')
    const divCartasComputadora = document.querySelector('#computadora-cartas')


    // Funcion para crear la baraja de cartas
    const crearDeck = () => {
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
        deck = _.shuffle(deck);

        return deck
    }

    crearDeck();

    // Funcion que permite tomar una carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        // cogemos la ultima carta del array 
        const carta = deck.pop();

        return carta
    }


    // Funcion para sacar el valor de la carta
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);

        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : parseInt(valor);

        /* codigo largo
            if (isNaN(valor)) {
                puntos = (valor === 'A') ? 11 : 10;
            } else {
                console.log('Es un numero')
                puntos = parseInt(valor);
            }
            console.log(puntos);
            */
    }


    // TURNO DE LA COMPUTADORA
    const turnoComputadora = (puntosMinimos) => {
        do {
            const carta = pedirCarta();
            puntosComputadora += valorCarta(carta);
            smalls[1].innerText = puntosComputadora;

            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartasComputadora.append(imgCarta);

            if (puntosMinimos > 21) {
                break;
            }

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie gana :(');
            } else if (puntosMinimos > 21) {
                alert('La computadora Gana')
            } else if (puntosComputadora > 21) {
                alert('Jugador Gana')
            }
        }, 10)
    };




    // FUNCIONES EVENTOS

    // BOTON PEDIR CARTA
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        puntosJugador += valorCarta(carta);
        smalls[0].innerText = puntosJugador;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');

        divCartasJugador.append(imgCarta);

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

        turnoComputadora(puntosJugador);

    });

    // BOTON NUEVO JUEGO
    btnNuevo.addEventListener('click', () => {
        console.clear();

        deck = [];
        deck = crearDeck();
        puntosJugador = 0;
        puntosComputadora = 0;

        smalls[0].innerText = 0;
        smalls[1].innerText = 0;

        divCartasJugador.innerHTML = '';
        divCartasComputadora.innerHTML = '';

        btnPedir.disabled = false;
        btnDetener.disabled = false;

    })
})()