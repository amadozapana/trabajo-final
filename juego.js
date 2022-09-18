let palabrainicio;
let cant_errores = 0; //cuantas veces me equivoqué
let cant_aciertos = 0; //cuantas letras acerté

const palabras = [
    'ahorcado',     /* indice 0 */
    'peruano',     /* indice 1 */
    'frutas',    /* indice 2 */
    'turismo',       /* indice 3 */
    'publicación',     /* indice 4 */
    'jugando',       /* indice 5 */
    'volador',   /* indice 6 */
    'microfono'     /* indice 7 */
];

const btn = id('jugar');
const imagen = id( 'imagen' );
const btn_letras = document.querySelectorAll( "#letras button" );

/* click en iniciar juego */
btn.addEventListener('click', iniciar );

//muestra el imagen 0 al empezas el juego
function iniciar(event){
    imagen.src = 'img/img0.png';//llama el img0
    btn.disabled = true;
    cant_errores = 0;
    cant_aciertos = 0;

    const parrafo = id( 'palabra_a_adivinar' );
    parrafo.innerHTML = '';

    const cant_palabras = palabras.length; //agumentando
    const valor_al_azar = obtener_random( 0, cant_palabras );

    palabrainicio = palabras[ valor_al_azar ];

    const cant_letras = palabrainicio.length;

    for( let i = 0; i < btn_letras.length ; i++ ){
        btn_letras[ i ].disabled = false;
    }

    for( let i = 0; i < cant_letras; i++ ){
        const span = document.createElement( 'span' );
        parrafo.appendChild( span );
    }

}

/* boton click para adivinar letra */
for( let i = 0; i < btn_letras.length ; i++ ){
    btn_letras[ i ].addEventListener( 'click', click_letras );
}

function click_letras(event){
    const spans = document.querySelectorAll( '#palabra_a_adivinar span' );
    const button = event.target; //cuál de todas las letras, llamó a la función.
    button.disabled = true;

    const letra = button.innerHTML.toLowerCase( );
    const palabra = palabrainicio.toLowerCase( ); // .toUpperCase( )

    let acerto = false;
    for( let i = 0; i < palabra.length;  i++ ){
        if( letra == palabra[i] ){
            //la variable i es la posición de la letra en la palabra.
            //que coincide con el span al que tenemos que mostarle esta letra...
            spans[i].innerHTML = letra;
            cant_aciertos++;
            acerto = true;
        }
    }

    if( acerto == false ){
        cant_errores++;
        const source = `img/img${cant_errores}.png` ;
        imagen.src = source;
    }
    //cantidad de erreres maximo
    if( cant_errores == 7 ){
        id('resultado').innerHTML ="Perdiste, la palabra era " + palabrainicio;
        game_over( );
    }else if( cant_aciertos == palabrainicio.length ){
        id('resultado').innerHTML = "GANASTE EN HORA BUENA";
        game_over( );
    }
    //console.log( "la letra " + letra + " en la palabra " + palabra + " ¿existe?: " + acerto );
}


/* Finaliza el juego juego */
function game_over( ){
    for( let i = 0; i < btn_letras.length ; i++ ){
        btn_letras[ i ].disabled = true;
    }

    btn.disabled = false;
}


game_over( );