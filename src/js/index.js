//INTERAÇÃO ENTRE AS SESSÕES.
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");

    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});


//INTERAÇÃO DA SESSÃO INICIAL.
const text = 'Olá! Eu sou um <span class="tag">&lt;Desenvolvedor Backend C#/.NET&gt;</span>';
const typingSpeed = 40; // Velocidade de digitação
let index = 0;

function typeWriter() {
    const textElement = document.getElementsByClassName("text-animation")[0];
    const cursorSpan = document.createElement('span');
    cursorSpan.className = 'cursor';
    cursorSpan.innerHTML = '|';

    textElement.innerHTML = ''; // Reset content
    textElement.appendChild(cursorSpan);

    function type() {
        if (index < text.length) {
            // Adiciona o próximo caractere ao conteúdo, preservando o HTML
            textElement.innerHTML = text.substring(0, index + 1);
            textElement.appendChild(cursorSpan); // Garante que o cursor esteja sempre no final
            index++;
            setTimeout(type, typingSpeed);
        } else {
            blinkCursor(cursorSpan);
        }
    }
    type();
}

function blinkCursor(cursorSpan) {
    setInterval(() => {
        cursorSpan.style.visibility = (cursorSpan.style.visibility === 'visible') ? 'hidden' : 'visible';
    }, 500); // Intervalo de piscada do cursor
}

window.onload = function() {
    typeWriter();
};


// INTERAÇÃO DA SESSÃO SOBRE
document.addEventListener('DOMContentLoaded', function() {
    const sobreSection = document.getElementById('sobre');
    const btnAprofundar = document.querySelector('.btn-aprofundar');
    const btnResumo = document.querySelector('.btn-resumo');
    const items = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    // Expandir sessão "sobre" e rolar suavemente para os detalhes
    btnAprofundar.addEventListener('click', function() {
        sobreSection.classList.add('expanded');
        // Rolagem suave para os detalhes
        document.getElementById('detalhes').scrollIntoView({ behavior: 'smooth' });
    });

    // Voltar ao estado inicial
    btnResumo.addEventListener('click', function() {
        sobreSection.classList.remove('expanded');
        window.scrollTo({
            top: sobreSection.offsetTop,
            behavior: 'smooth'
        });
    });

    // Atualizar o carrossel
    function updateCarousel() {
        const offset = -currentIndex * 100;
        document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
        items.forEach((item, index) => {
            item.classList.remove('selected');
            if (index === currentIndex) {
                item.classList.add('selected');
            }
        });
    }

    // Navegar entre os cards
    function showNextItem() {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    }

    // Inicializa o carrossel
    setInterval(showNextItem, 3000);
});