gsap.to('#bg', {
    scrollTrigger: {
        scrub:1
    },
    scale:1.5
})

gsap.to('#logo', {
    scrollTrigger: {
        scrub:1
    },
    y:250,
    scale:0.8
});

gsap.to('#nube1', {
    scrollTrigger: {
        scrub:1
    },
    y:-200 
    
});

gsap.to('#nube2', {
    scrollTrigger: {
        scrub:1
    },
    y:-200 
    
});

gsap.to('#parrafo', {
    scrollTrigger: {
        scrub:1
    },
    y:-500 
    
});



/* bloque juego */


// Variable para llevar el seguimiento del índice de la pregunta actual  
let currentQuestionIndex = 0;

// Variable para sumar el puntaje
let score = 0;

// Función para iniciar el cuestionario mostrando la primera pregunta
function startQuiz() {
    showQuestion(questions[currentQuestionIndex]);
}

// Función para mostrar la pregunta actual y sus respuestas
function showQuestion(question) {
    const questionElement = document.getElementById('question'); //cacha el dom de un h2
    const answerButtons = document.querySelectorAll('.btn'); //cacha dom de los botones(c/boton esta onclick a una funcion en html)
    

   

    // aquí crear la imagen y trabajamos estilos creandole  class="fotoPregunta"
   
    // Crear un nuevo elemento de imagen
   // imageElement.src = question.image; // Asignar la ubicacion de la imagen
    //imageElement.classList.add('fotoPregunta');

     // Actualizamos el texto de la pregunta
    //se agrega al h2 el valor de la propiedad question DE CADA PREGUNTA (event)
    questionElement.textContent = question.question;

    
   

    


    // Combinamos las respuestas incorrectas con la respuesta correcta en un nuevo array
    const answers = [
        question.correctAnswer,
        question.respuestaIncorrecta1,
        question.respuestaIncorrecta2
    ];

    // Generamos un índice aleatorio para la respuesta correcta
    // sort los acomoda aleatoriamente segun el resultado de random - 0.5
    answers.sort(() => Math.random() - 0.5);

    //con cada llamada a la funcion se cambia el orden de las preguntas (objetos en el array answer)

    // Asignamos las respuestas a los botones y guardamos cuál es la correcta
    //no importa cuantas preguntas tengamos, siempre son 3 respuestas y tres botones
    //forEach recorre cada boton ademas nos entrega su indice(index) que son 0, 1 o 2, esto lo utilizaremos para recorrer cada pregunta
    answerButtons.forEach((button, index) => {
        button.textContent = answers[index];
        button.dataset.correct = answers[index] === question.correctAnswer; //dataset da true cuando la respuest del btn es = a la correcta
    });
}

// Función que se ejecuta al seleccionar una respuesta
function selectAnswer(event) {
    const selectedButton = event.target; // boton selecionado --- es el evento
    const correct = selectedButton.dataset.correct === 'true'; //guarda en una variable si concide los valores y dataset arroja true 

    // Mostrar mensaje de correcto o incorrecto
    if (correct) {

        document.getElementById('result').textContent = 'Correcto!!'; //cacha a un div vacio --- |acá podriamos agregar el tomatito|
        score += 100; // Aumentar el puntaje si la respuesta es correcta

    } else {

        document.getElementById('result').textContent = 'Incorrecto!!'; // cacha al mismo div vacio
    }

    // Actualizar el puntaje en pantalla
    document.getElementById('score').textContent = score; // cacha de dom un h3

    // Pasar a la siguiente pregunta si hay más preguntas disponibles
    currentQuestionIndex++; // en el comienzo lo inicializamos en 0

    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        // Si no hay más preguntas, mostrar mensaje de finalización, cambia pregunta y botones por mensaje en h2 gracias a innerHTML
        
        document.getElementById('question-container').innerHTML = `<h2 class='completado'>¡Has completado el desafío!</h2>`;
        document.getElementById('reiniciar').innerHTML = `<button id='alInicio' class='btn2'>Jugar Nuevamente</button>`;
        document.getElementById('alInicio').addEventListener('click', reinicio);
        document.getElementById('result').textContent = '';
        

        // Asegurarse de que el contenido del primer (y único) elemento con la clase 'preguntas' esté vacío
        const preguntasElement = document.getElementsByClassName('preguntas')[0];
        if (preguntasElement) {
        preguntasElement.innerHTML = '';
    }
        
    }
}

// Función para reiniciar el cuestionario
function reinicio() {
    // aquí vaciamos tanto el resultado de la experiencia actual como tambien el boton de reiniciar y el score lo devolvemos a 0
    score = 0;
    currentQuestionIndex = 0;
    document.getElementById('reiniciar').innerHTML = '';
    document.getElementById('result').textContent = '';
    document.getElementById('score').textContent = score;
    

    // Obtener el contenedor principal del cuestionario
    const quizContainer = document.getElementById('quiz-container');

    // Limpiar el contenido del contenedor principal
    quizContainer.innerHTML = `
        <span class="preguntas">Preguntas</span>
        <div id="question-container" class="elementosContenedor">
            <div class="contenedorPregunta">
                <h2 id="question"></h2>
            </div>
            <div id="answer-buttons" class="btn-container contenedorBotones">
                <button class="btn" onclick="selectAnswer(event)"></button>
                <button class="btn" onclick="selectAnswer(event)"></button>
                <button class="btn" onclick="selectAnswer(event)"></button>
            </div>
        </div>
        <div class="contenedorScore">
            <div id="result" class="result"></div>
            <div id="score-container">
                <h3>Puntaje: <span id="score">0</span></h3>
            </div> 
        </div>
        <div id="reiniciar"></div>
    `;

    startQuiz(); // llamamos a la funcion inicial
}

// Iniciar el cuestionario cuando la página se cargue
window.onload = startQuiz;