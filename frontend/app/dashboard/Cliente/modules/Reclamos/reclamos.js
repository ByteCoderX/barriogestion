// Variables globales
let reclamos = [];
let reclamoActivo = null;
let contadorReclamos = 1;

// Cargar settings
async function cargarSettings() {
    const res = await fetch('../../../../settings.json');
    return await res.json();
}

// Cargar datos del almacenamiento local
function cargarDatos() {
    const datosGuardados = JSON.parse(sessionStorage.getItem('reclamos_chat') || '[]');
    const contadorGuardado = sessionStorage.getItem('contador_reclamos');
    
    if (datosGuardados.length > 0) reclamos = datosGuardados;
    if (contadorGuardado) contadorReclamos = parseInt(contadorGuardado);
}

// Guardar datos en almacenamiento local
function guardarDatos() {
    sessionStorage.setItem('reclamos_chat', JSON.stringify(reclamos));
    sessionStorage.setItem('contador_reclamos', contadorReclamos.toString());
}

// Renderizar lista de reclamos
function renderizarListaReclamos() {
    const lista = document.getElementById('complaintsList');
    if (!lista) return;

    if (reclamos.length === 0) {
        lista.innerHTML = '<div>No hay reclamos registrados</div>';
        return;
    }

    lista.innerHTML = reclamos.map(reclamo => `
        <div class="${reclamoActivo?.id === reclamo.id ? 'active' : ''}" 
             onclick="seleccionarReclamo('${reclamo.id}')">
            <div>${reclamo.id}</div>
            <div>${formatearFechaCorta(reclamo.fechaCreacion)}</div>
            <div>${reclamo.titulo}</div>
        </div>
    `).join('');
}

// Seleccionar reclamo
function seleccionarReclamo(id) {
    reclamoActivo = reclamos.find(r => r.id === id);
    renderizarListaReclamos();
    renderizarChat();
}

// Renderizar chat
function renderizarChat() {
    const chatContent = document.getElementById('chatContent');
    if (!chatContent) return;

    if (!reclamoActivo) {
        chatContent.innerHTML = `<button onclick="abrirModalNuevoReclamo()">Crear Nueva Queja</button>`;
        return;
    }

    chatContent.innerHTML = `
        <div>
            <div>${reclamoActivo.titulo}</div>
            <div>${reclamoActivo.id}</div>
        </div>
        <div id="chatMessages">
            ${reclamoActivo.mensajes.map(m => `<div>${m.contenido}</div>`).join('')}
        </div>
        <div>
            <textarea id="messageInput" onkeydown="manejarEnterEnMensaje(event)" oninput="ajustarAlturaTextarea(this)"></textarea>
            <button onclick="enviarMensaje()">Enviar</button>
        </div>
    `;
    setTimeout(() => scrollToBottom(), 100);
}

// Enviar mensaje
function enviarMensaje() {
    const input = document.getElementById('messageInput');
    if (!input || !reclamoActivo) return;

    const contenido = input.value.trim();
    if (!contenido) return;

    reclamoActivo.mensajes.push({
        id: reclamoActivo.mensajes.length + 1,
        tipo: 'user',
        contenido,
        timestamp: new Date().toISOString(),
        leido: false
    });

    input.value = '';
    input.style.height = 'auto';

    guardarDatos();
    renderizarChat();
    renderizarListaReclamos();
}

// Manejar Enter en textarea
function manejarEnterEnMensaje(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        enviarMensaje();
    }
}

// Notificación
function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.className = 'notification';
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);

    setTimeout(() => {
        notificacion.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            if (document.body.contains(notificacion)) document.body.removeChild(notificacion);
        }, 300);
    }, 3000);
}

// Crear nuevo reclamo
async function crearReclamo(event) {
    event.preventDefault();

    // let settings;
    // try {
    //     settings = await cargarSettings();
    // } catch (e) {
    //     console.error('Error cargando settings:', e);
    //     mostrarNotificacion('No se pudieron cargar settings');
    //     return;
    // }

    const formData = new FormData(event.target);
    const nuevoReclamo = {
        title: formData.get('titulo'),
        category: formData.get('categoria'),
        priority: formData.get('prioridad'),
        location: formData.get('ubicacion') || 'No especificada',
        description: formData.get('descripcion'),
        dni: localStorage.getItem('dni') || '11222333'
    };

    try {
        const res = await fetch(`http://localhost:3000/bg/v1/client/complaints`, {
            method: 'POST',
            headers: { 
                'x-api-key': 'hola',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(nuevoReclamo)
        });

        if (!res.ok) throw new Error('Error al crear el reclamo');
        const ticket = await res.json();

        reclamos.unshift({
            id: ticket.id,
            titulo: ticket.title,
            categoria: ticket.category,
            prioridad: ticket.priority,
            estado: ticket.estatus || 'pendiente',
            ubicacion: ticket.location,
            descripcion: ticket.description,
            fechaCreacion: new Date().toISOString(),
            mensajes: [{
                id: 1,
                tipo: 'user',
                contenido: ticket.description,
                timestamp: new Date().toISOString(),
                leido: false
            }]
        });

        contadorReclamos++;
        guardarDatos();
        renderizarListaReclamos();
        cerrarModal();
        seleccionarReclamo(reclamos[0].id);
        mostrarNotificacion('Reclamo creado con éxito');
    } catch (error) {
        console.error(error);
        mostrarNotificacion('Error al crear el reclamo');
    }
}

// Filtrar reclamos
function filtrarReclamos() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;
    const termino = searchInput.value.toLowerCase();

    const reclamosFiltrados = reclamos.filter(r =>
        r.titulo.toLowerCase().includes(termino) ||
        r.id.toLowerCase().includes(termino) ||
        r.categoria.toLowerCase().includes(termino)
    );

    const lista = document.getElementById('complaintsList');
    if (!lista) return;

    lista.innerHTML = reclamosFiltrados.length
        ? reclamosFiltrados.map(r => `
            <div class="${reclamoActivo?.id === r.id ? 'active' : ''}" 
                 onclick="seleccionarReclamo('${r.id}')">
                <div>${r.id}</div>
                <div>${formatearFechaCorta(r.fechaCreacion)}</div>
                <div>${r.titulo}</div>
            </div>
        `).join('')
        : '<div>No se encontraron reclamos</div>';
}

// Modales
function abrirModalNuevoReclamo() {
    document.getElementById('modalNuevoReclamo').style.display = 'block';
}
function cerrarModal() {
    document.getElementById('modalNuevoReclamo').style.display = 'none';
    document.getElementById('formNuevoReclamo').reset();
}

// Formateo
function formatearFechaCorta(fecha) {
    const date = new Date(fecha);
    const ahora = new Date();
    const diff = ahora - date;

    if (diff < 86400000) return date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
    if (diff < 604800000) return date.toLocaleDateString('es-AR', { weekday: 'short' });
    return date.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' });
}

// Scroll automático
function scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Ajustar textarea
function ajustarAlturaTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    cargarDatos();
    renderizarListaReclamos();
    const form = document.getElementById('formNuevoReclamo');
    if (form) form.addEventListener('submit', crearReclamo);
});

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    const modal = document.getElementById('modalNuevoReclamo');
    if (event.target === modal) cerrarModal();
};
