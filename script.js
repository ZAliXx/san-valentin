const sobre = document.getElementById('sobre');
const carta = document.getElementById('carta');
const btnCerrar = document.getElementById('btnCerrar');
const frasesContainer = document.getElementById('frasesContainer');
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');

let animationId = null;
let particles = [];
let confetiActivo = false;

// Lista de frases bonitas
const frases = [
    "✨ Muchas gracias por tu apoyo ✨",
    "💕 Te quiero mucho 💕",
    "🌸 Eres una persona especial 🌸",
    "🌟 Gracias por estar siempre 🌟",
    "💖 Te aprecio un montón 💖",
    "🌺 Te agradezco por estar presente en mi vida 🌺",
    "⭐ Gracias por tu amistad ⭐",
    "💗 Me alegra tenerte en mi vida 💗",
    "🍀 Eres mi bendición 🍀",
    "💝 Gracias por existir 💝",
    "🌹 Te mando un abrazo gigante 🌹",
    "💓 Eres luz en mi vida 💓",
    "🎈 Gracias por cada momento 🎈",
    "💞 Te llevo en mi corazón 💞",
    "🌸 Eres increíble 🌸",
    "🌻En todo tiempo ama el amigo, para ayudar en la adversidad nació el hermano.🌻",
    "🪷El que ama a Dios, ame también a su hermano.🪷",
    "🫧La dulzura de la amistad fortalece el ánimo.🫧"
];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 10 + 5;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.color = `hsl(${Math.random() * 10 + 350}, 100%, 65%)`; // Tonos rojos/rosas
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        
        if (this.y > canvas.height) {
            this.reset();
            this.y = -10;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        
        // Dibujar corazón
        const size = this.size;
        const x = this.x;
        const y = this.y;
        
        ctx.moveTo(x, y);
        ctx.bezierCurveTo(x - size/2, y - size/2, x - size, y + size/3, x, y + size);
        ctx.bezierCurveTo(x + size, y + size/3, x + size/2, y - size/2, x, y);
        
        ctx.fill();
    }
}

function createConfetti() {
    particles = []; // Limpiar partículas existentes
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
}

function startConfetti() {
    if (!confetiActivo) {
        confetiActivo = true;
        animate();
    }
}

function stopConfetti() {
    if (confetiActivo) {
        confetiActivo = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles = [];
    }
}

function animate() {
    if (!confetiActivo) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    animationId = requestAnimationFrame(animate);
}

// Función para crear frases flotantes
function crearFrases() {
    // Limpiar frases anteriores
    frasesContainer.innerHTML = '';
    
    // Número aleatorio de frases (entre 5 y 10)
    const numFrases = Math.floor(Math.random() * 6) + 5;
    
    for (let i = 0; i < numFrases; i++) {
        // Crear elemento de frase
        const frase = document.createElement('div');
        frase.className = 'frase-flotante';
        
        // Seleccionar frase aleatoria
        const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
        frase.textContent = fraseAleatoria;
        
        // Posición aleatoria en la pantalla
        const left = Math.random() * (window.innerWidth - 200); // Evitar bordes
        const top = Math.random() * (window.innerHeight - 100);
        
        frase.style.left = left + 'px';
        frase.style.top = top + 'px';
        
        // Tamaño de fuente aleatorio
        const fontSize = Math.floor(Math.random() * 20) + 20; // Entre 20 y 40px
        frase.style.fontSize = fontSize + 'px';
        
        // Rotación aleatoria
        const rotation = Math.random() * 20 - 10; // Entre -10 y 10 grados
        frase.style.transform = `rotate(${rotation}deg)`;
        
        // Agregar al contenedor
        frasesContainer.appendChild(frase);
        
        // Eliminar la frase después de 4 segundos
        setTimeout(() => {
            if (frase.parentNode) {
                frase.remove();
            }
        }, 4000);
    }
}

function abrirSobre() {
    sobre.classList.add('abierto');
    carta.classList.add('mostrar');
    
    // Crear frases flotantes
    crearFrases();
    
    // Crear y activar confeti si no hay
    if (particles.length === 0) {
        createConfetti();
        startConfetti();
    }
}

function cerrarSobre() {
    sobre.classList.remove('abierto');
    carta.classList.remove('mostrar');
    
    // Detener confeti
    stopConfetti();
    
    // Limpiar frases (opcional, también se limpian solas)
    frasesContainer.innerHTML = '';
}

sobre.addEventListener('click', abrirSobre);

btnCerrar.addEventListener('click', (e) => {
    e.stopPropagation();
    cerrarSobre();
});

// Limpiar animación si la página se oculta
window.addEventListener('beforeunload', () => {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
});

// Opcional: Cerrar con tecla ESC
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && carta.classList.contains('mostrar')) {
        cerrarSobre();
    }
});