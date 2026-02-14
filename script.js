/* ==========================================
   CONFIGURACIÓN GENERAL
========================================== */

// Año, mes (0-indexado), día
const startDate = new Date(2024, 2, 9); 


/* ==========================================
   CONTADOR DE TIEMPO
========================================== */

function updateCounter() {
    const now = new Date();
    const diff = now - startDate;

    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    document.getElementById("contador").innerHTML =
        `${days} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos`;
}

setInterval(updateCounter, 1000);
updateCounter();

/* ==========================================
   BOTÓN MÚSICA
========================================== */

const audio = document.getElementById("audio");
const musicBtn = document.getElementById("musicBtn");

musicBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        musicBtn.textContent = "Pausar música";
    } else {
        audio.pause();
        musicBtn.textContent = "Te dedico esta canción";
    }
});

/* ==========================================
   MODAL CARTA
========================================== */

const secretBtn = document.getElementById("secretBtn");
const carta = document.getElementById("cartaContainer");
const closeCarta = document.getElementById("closeCarta");

secretBtn.addEventListener("click", () => {
    carta.classList.remove("hidden");
    document.body.style.overflow = "hidden";
});

closeCarta.addEventListener("click", () => {
    carta.classList.add("hidden");
    document.body.style.overflow = "auto";
});

/* ==========================================
   CANVAS FLORAL ANIMADO
========================================== */

const canvas = document.getElementById("flowerCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

/* Clase Partícula Floral */
class FlowerParticle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 200;
        this.size = Math.random() * 20 + 10;
        this.speedY = Math.random() * 0.5 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.type = Math.random() > 0.5 ? "petunia" : "tulip";
    }

    update() {
        this.y -= this.speedY;
        this.x += this.speedX;

        if (this.y < -50) {
            this.reset();
        }
    }

    draw() {
        ctx.globalAlpha = this.opacity;

        if (this.type === "petunia") {
            drawPetunia(this.x, this.y, this.size);
        } else {
            drawTulip(this.x, this.y, this.size);
        }

        ctx.globalAlpha = 1;
    }
}

/* Dibujar Petunia */
function drawPetunia(x, y, size) {
    ctx.fillStyle = "#CDA4F3";
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.ellipse(
            x,
            y,
            size / 2,
            size,
            (Math.PI / 5) * i,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }
}

/* Dibujar Tulipán */
function drawTulip(x, y, size) {
    ctx.fillStyle = "#B58EDC";

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.quadraticCurveTo(x - size / 2, y - size, x, y - size * 1.5);
    ctx.quadraticCurveTo(x + size / 2, y - size, x, y);
    ctx.fill();
}

/* Crear partículas */
const flowers = [];
const flowerCount = 35;

for (let i = 0; i < flowerCount; i++) {
    flowers.push(new FlowerParticle());
}

/* Animación */
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    flowers.forEach(flower => {
        flower.update();
        flower.draw();
    });

    requestAnimationFrame(animate);
}

animate();
document.addEventListener("DOMContentLoaded", function () {

    const audio = document.getElementById("audio");
    const musicBtn = document.getElementById("musicBtn");

    if (!audio || !musicBtn) {
        console.error("No se encontró el audio o el botón.");
        return;
    }

    let isPlaying = false;
    audio.volume = 0.6;

    musicBtn.addEventListener("click", function () {

        if (!isPlaying) {
            audio.play()
                .then(() => {
                    musicBtn.textContent = "⏸ Pausar música";
                    isPlaying = true;
                })
                .catch(error => {
                    console.error("Error al reproducir:", error);
                });
        } else {
            audio.pause();
            musicBtn.textContent = "▶️ Reanudar Canción";
            isPlaying = false;
        }

    });

});
const openLetterBtn = document.getElementById("openLetterBtn");
const letterContainer = document.getElementById("letterContainer");

openLetterBtn.addEventListener("click", function () {

    letterContainer.classList.toggle("hidden");

    if (!letterContainer.classList.contains("hidden")) {
        openLetterBtn.textContent = "💌 Cerrar carta";
    } else {
        openLetterBtn.textContent = "💌 Leer la carta";
    }

});
