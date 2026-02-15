const sobre = document.getElementById('sobre');
const carta = document.getElementById('carta');
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');

let animationId = null;
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
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
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    animationId = requestAnimationFrame(animate);
}

sobre.addEventListener('click', () => {
    sobre.classList.add('abierto');
    carta.classList.add('mostrar');
    
    setTimeout(() => {
        if (particles.length === 0) {
            createConfetti();
            animate();
        }
    }, 300);
});

// Limpiar animación si la página se oculta
window.addEventListener('beforeunload', () => {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
});