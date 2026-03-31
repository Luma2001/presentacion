// 1. FUNCIÓN PARA CARGAR PROYECTOS DESDE EL JSON
async function cargarProyectos() {
    try {
        const respuesta = await fetch('json/proyectos.json'); // Buscamos el archivo
        const proyectos = await respuesta.json();            // Lo convertimos a datos
        
        const contenedor = document.getElementById('portfolio-container');

        proyectos.forEach(proyecto => {
            // Creamos el HTML de la tarjeta (Card)
            const card = document.createElement('div');
            card.classList.add('card'); // Le damos la clase de CSS que creamos antes

            card.innerHTML = `
                <img src="${proyecto.imagen}" alt="${proyecto.titulo}">
                <h3>${proyecto.titulo}</h3>
                <p>${proyecto.descripcion}</p>
                <a href="${proyecto.link}" target="_blank" class="btn-neon">Ver más</a>
            `;
            
            contenedor.appendChild(card);
        });
    } catch (error) {
        console.error("Error cargando los proyectos:", error);
    }
}

// 2. ANIMACIÓN AL HACER SCROLL (Intersection Observer)
const observarScroll = () => {
    // Configuramos el "observador"
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Si la sección es visible en la pantalla...
            if (entry.isIntersecting) {
                entry.target.classList.add('show'); // Le ponemos la clase que mueve al centro
            }
        });
    }, { threshold: 0.1 }); // Se activa cuando se ve el 10% de la sección

    // Le decimos qué elementos debe vigilar
    const elementosOcultos = document.querySelectorAll('.hidden-left, .hidden-right');
    elementosOcultos.forEach((el) => observer.observe(el));
};

// 3. EJECUTAR TODO AL CARGAR LA PÁGINA
window.onload = () => {
    cargarProyectos();
    observarScroll();
};