let intentos = 6;
//let PALABRA = "APPLE";
let diccionario = ['CHIPS', 'GRAPE', 'FABLE', 'GROVE', 'JUMPS', 'PLUCK', 'RHYME', 'SWEEP', 'THUMB', 'TWIST'];
const PALABRA = diccionario[Math.floor(Math.random() * diccionario.length)];
//console.log(PALABRA+"funciona hasta aqui")
let contenedorVida = document.getElementById('vida')

const INPUT = document.getElementById('guess-input');
const BOTON = document.getElementById("guess-button");
BOTON.addEventListener("click", validarInput);
INPUT.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {

        validarInput();
    }
});

function validarInput() {
    const PALABRA = leerIntento();
    //console.log("funciona hasta aqui")
    const ERROR = document.getElementById("error");
    if (PALABRA.length != 5) {
        ERROR.innerHTML = "*La palabra debe tener 5 caracteres para seguir avanzando";
    } else {
        ERROR.innerHTML = "";
        intentar();
    }
}

function leerIntento() {
    let intento = document.getElementById("guess-input").value;
    console.log(intento);
    return intento.toUpperCase();
}

function intentar() {
    const INTENTO = leerIntento();
    if (INTENTO === PALABRA) {
        terminar("<h1>GANASTE!&#128512</h1>");
        return;
    }
    const GRID = document.getElementById("grid");
    const ROW = document.createElement("div");
    ROW.className = "row";

    for (let i in PALABRA) {
        const SPAN = document.createElement("span");
        SPAN.className = "letter";
        if (INTENTO[i] === PALABRA[i]) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = "#79b851";
        } else if (PALABRA.includes(INTENTO[i])) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = "#f3c237";
        } else {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = "#a4aec4";
        }
        ROW.appendChild(SPAN);
    }
    GRID.appendChild(ROW);
    intentos--;
    mostrarVidas(intentos); // para mostrar las vidas
    if (intentos == 0) {
        contenedorVida.innerHTML = "Te quedan " + intentos + " &#128151";
        terminar("<h3>PERDISTE!&#x1F494; la palabra era " + PALABRA + "</h3>");
    }
}

function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    BOTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}
function mostrarVidas(intentos) {
    const CORAZONES = document.getElementById("corazones");
    CORAZONES.innerHTML = "";

    for (let i = 0; i < intentos; i++) {
        const CORAZON = document.createElement("span");

        contenedorVida.innerHTML = "Te quedan " + intentos + " &#128151";
        CORAZON.innerHTML = "&#128151;";
        CORAZONES.appendChild(CORAZON);
    }
    for (let i = 0; i < 6 - intentos; i++) { // para mostrar corazones rotos
        const CORAZON_ROTO = document.createElement("span");
        CORAZON_ROTO.innerHTML = "&#x1F494;";
        CORAZONES.appendChild(CORAZON_ROTO);
    }
}

