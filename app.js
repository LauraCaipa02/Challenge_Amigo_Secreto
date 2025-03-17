// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

//Creación de variables globales para el Challenge.
// Lista que almacenará los nombres de los participantes
let arregloNombres = [];

// Contador utilizado para evitar iniciar el sorteo con menos de tres jugadores
let contador = 1;

// Agrega un nuevo participante cuando se presiona el botón "Añadir"
function registrarParticipante() {
    let nombreIngresado = document.getElementById("amigo").value;

    // Habilita el botón de sorteo una vez que se ingresa un nombre
    document.getElementById("button-draw").disabled = false;

    let contieneNumeros = /\d/;

    // Verifica si el nombre ingresado es válido
    if (nombreIngresado !== "") {
        if (nombreIngresado.length === 1) {
            alert("El nombre debe tener más de un carácter.");
        } else if (contieneNumeros.test(nombreIngresado)) {
            alert("El nombre no puede contener números.");
        } else if (arregloNombres.includes(nombreIngresado)) {
            alert("La persona ya está en la lista.");
        } else {
            arregloNombres.push(nombreIngresado);
            actualizarParticipantes();
        }
    } else {
        alert("Por favor, ingrese un nombre antes de continuar.");
    }
    limpiarEntrada();
}

// Refresca la lista de participantes en la pantalla
function actualizarParticipantes() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";
    let resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
    arregloNombres.forEach((nombre) => {
        let li = document.createElement("li");
        li.textContent = `${nombre} ♥`;
        lista.appendChild(li);
    });
}

// Verifica si hay suficientes jugadores antes de realizar el sorteo
function iniciarSorteo() {
    if (contador <= 1) {
        if (arregloNombres.length <= 2) {
            alert("Se necesitan al menos 3 participantes para iniciar el juego.");
        } else {
            ejecutarSorteo();
        }
    } else {
        ejecutarSorteo();
    }
}

// Borra el contenido del campo de entrada después de añadir un nombre
function limpiarEntrada() {
    document.getElementById("amigo").value = "";
}

// Restablece la partida eliminando los jugadores y reiniciando los valores
function reiniciarJuegoCompleto() {
    arregloNombres = [];
    document.getElementById("button-draw").style.visibility = "visible";
    document.getElementById("button-draw").style.opacity = 1;
    document.getElementById("button-draw").disabled = true;

    limpiarEntrada();

    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
    contador = 1;
}

// Realiza el sorteo y asigna un amigo secreto al azar
function ejecutarSorteo() {
    let posicionGanadora = Math.floor(Math.random() * arregloNombres.length);

    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    let resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    let li = document.createElement("li");
    li.textContent = `Tu amigo secreto es ${arregloNombres[posicionGanadora]}`;
    resultado.appendChild(li);

    // Elimina al participante sorteado para evitar repeticiones
    if (arregloNombres.includes(arregloNombres[posicionGanadora])) {
        arregloNombres.splice(posicionGanadora, 1);
        if (arregloNombres.length === 0) {
            document.getElementById("button-draw").disabled = true;
            alert("Todos han sido sorteados, el juego ha terminado.");
        }
    }
    contador++;
    console.log(arregloNombres);
    console.log(contador);
}