// Variables globales
let lotes = [];
let lotesFiltrados = [];
let paginaActual = 1;
let registrosPorPagina = 10;
let modoEdicion = false;
let loteEditando = null;
let chartInstance = null;

// ==================== GENERACIÓN DE DATOS ====================

function generarDatosEjemplo() {
    const nombres = [
        'Juan Pérez', 'María García', 'Carlos López', 'Ana Martínez', 'Roberto Sánchez',
        'Laura Fernández', 'Diego Romero', 'Sofía Castro', 'Miguel Torres', 'Valentina Ruiz',
        'Federico Morales', 'Camila Navarro', 'Sebastián Silva', 'Isabella Vargas', 'Mateo Reyes',
        'Lucía Herrera', 'Andrés Medina', 'Paula Jiménez', 'Martín Rojas', 'Carolina Vega'
    ];
    
    const manzanas = ['A', 'B', 'C', 'D'];
    
    for (let i = 1; i <= 45; i++) {
        const manzana = manzanas[Math.floor((i - 1) / 12) % 4];
        let estado;
        
        if (i <= 38) estado = 'ocupado';
        else if (i <= 40) estado = 'disponible';
        else if (i <= 43) estado = 'construccion';
        else estado = 'reservado';
        
        const superficie = 250 + Math.floor(Math.random() * 600);
        const nombreProp = estado === 'ocupado' ? nombres[Math.floor(Math.random() * nombres.length)] : null;
        
        lotes.push({
            id: i,
            numero: i,
            manzana: manzana,
            propietario: nombreProp,
            dni: estado === 'ocupado' ? `${Math.floor(10000000 + Math.random() * 90000000)}` : null,
            superficie: superficie,
            estado: estado,
            telefono: estado === 'ocupado' ? `+54 11 ${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}` : null,
            email: estado === 'ocupado' && nombreProp ? `${nombreProp.toLowerCase().replace(' ', '.')}@email.com` : null,
            direccion: `Calle ${Math.ceil(i / 10)} #${i}`,
            observaciones: '',
            fechaAsignacion: estado === 'ocupado' ? new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0] : null
        });
    }
}

// ==================== INICIALIZACIÓN ====================

document.addEventListener('DOMContentLoaded', function() {
    generarDatosEjemplo();
    lotesFiltrados = [...lotes];
    inicializarEventos();
    cargarLotes();
    actualizarResumen();
    inicializarGrafico();
});

// ==================== EVENTOS ====================

function inicializarEventos() {
    // Botones principales
    document.getElementById('nuevoLoteBtn').addEventListener('click', abrirModalNuevoLote);
    document.getElementById('exportarLotesBtn').addEventListener('click', exportarLotes);
    document.getElementById('generarMapaBtn').addEventListener('click', generarMapa);
    
    // Filtros
    document.getElementById('aplicarFiltros').addEventListener('click', aplicarFiltros);
    document.getElementById('limpiarFiltros').addEventListener('click', limpiarFiltros);
    document.getElementById('buscarLote').addEventListener('input', buscarLote);
    
    // Formulario
    document.getElementById('loteForm').addEventListener('submit', guardarLote);
    document.getElementById('cancelarLote').addEventListener('click', () => cerrarModal('loteModal'));
    document.getElementById('cerrarDetalleLote').addEventListener('click', () => cerrarModal('detalleLoteModal'));
    document.getElementById('imprimirFichaBtn').addEventListener('click', imprimirFicha);
    
    // Mostrar/ocultar sección de propietario según estado
    document.getElementById('estadoLote').addEventListener('change', function() {
        const propietarioSection = document.getElementById('propietarioSection');
        if (this.value === 'ocupado') {
            propietarioSection.style.display = 'block';
            document.getElementById('nombrePropietario').required = true;
            document.getElementById('telefonoPropietario').required = true;
            document.getElementById('emailPropietario').required = true;
        } else {
            propietarioSection.style.display = 'none';
            document.getElementById('nombrePropietario').required = false;
            document.getElementById('telefonoPropietario').required = false;
            document.getElementById('emailPropietario').required = false;
        }
    });
    
    // Cerrar modales
    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Paginación
    document.getElementById('registrosPorPagina').addEventListener('change', function() {
        registrosPorPagina = this.value === '100' ? lotesFiltrados.length : parseInt(this.value);
        paginaActual = 1;
        cargarLotes();
    });
    
    // Gráfico
    document.querySelectorAll('.btn-periodo').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.btn-periodo').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            actualizarGrafico(this.dataset.vista);
        });
    });
}

// ==================== MODALES ====================

function abrirModalNuevoLote() {
    modoEdicion = false;
    loteEditando = null;
    document.getElementById('modalTitle').textContent = 'Agregar Nuevo Lote';
    document.getElementById('loteForm').reset();
    document.getElementById('propietarioSection').style.display = 'none';
    document.getElementById('loteModal').style.display = 'block';
}

function cerrarModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// ==================== CRUD DE LOTES ====================

function guardarLote(e) {
    e.preventDefault();
    
    const numero = parseInt(document.getElementById('numeroLote').value);
    const manzana = document.getElementById('manzanaLote').value;
    const superficie = parseFloat(document.getElementById('superficieLote').value);
    const estado = document.getElementById('estadoLote').value;
    const direccion = document.getElementById('direccionLote').value;
    const observaciones = document.getElementById('observacionesLote').value;
    
    // Validar que el número de lote no exista (excepto en edición)
    if (!modoEdicion && lotes.some(l => l.numero === numero && l.manzana === manzana)) {
        mostrarNotificacion('Ya existe un lote con ese número en la manzana seleccionada', 'error');
        return;
    }
    
    const nuevoLote = {
        id: modoEdicion ? loteEditando.id : Date.now(),
        numero,
        manzana,
        superficie,
        estado,
        direccion,
        observaciones,
        propietario: null,
        dni: null,
        telefono: null,
        email: null,
        fechaAsignacion: null
    };
    
    // Si el estado es ocupado, agregar datos del propietario
    if (estado === 'ocupado') {
        nuevoLote.propietario = document.getElementById('nombrePropietario').value;
        nuevoLote.dni = document.getElementById('dniPropietario').value;
        nuevoLote.telefono = document.getElementById('telefonoPropietario').value;
        nuevoLote.email = document.getElementById('emailPropietario').value;
        nuevoLote.fechaAsignacion = new Date().toISOString().split('T')[0];
    }
    
    if (modoEdicion) {
        const index = lotes.findIndex(l => l.id === loteEditando.id);
        lotes[index] = nuevoLote;
        mostrarNotificacion('Lote actualizado correctamente', 'success');
    } else {
        lotes.push(nuevoLote);
        mostrarNotificacion('Lote agregado correctamente', 'success');
    }
    
    cerrarModal('loteModal');
    lotesFiltrados = [...lotes];
    cargarLotes();
    actualizarResumen();
    actualizarGrafico('ocupacion');
}

function editarLote(id) {
    const lote = lotes.find(l => l.id === id);
    if (!lote) return;
    
    modoEdicion = true;
    loteEditando = lote;
    
    document.getElementById('modalTitle').textContent = 'Editar Lote';
    document.getElementById('numeroLote').value = lote.numero;
    document.getElementById('manzanaLote').value = lote.manzana;
    document.getElementById('superficieLote').value = lote.superficie;
    document.getElementById('estadoLote').value = lote.estado;
    document.getElementById('direccionLote').value = lote.direccion || '';
    document.getElementById('observacionesLote').value = lote.observaciones || '';
    
    // Si está ocupado, mostrar datos del propietario
    if (lote.estado === 'ocupado' && lote.propietario) {
        document.getElementById('propietarioSection').style.display = 'block';
        document.getElementById('nombrePropietario').value = lote.propietario;
        document.getElementById('dniPropietario').value = lote.dni || '';
        document.getElementById('telefonoPropietario').value = lote.telefono || '';
        document.getElementById('emailPropietario').value = lote.email || '';
    }
    
    document.getElementById('loteModal').style.display = 'block';
}

function eliminarLote(id) {
    const lote = lotes.find(l => l.id === id);
    if (!lote) return;
    
    if (confirm(`¿Está seguro que desea eliminar el Lote ${lote.numero} de la Manzana ${lote.manzana}?`)) {
        lotes = lotes.filter(l => l.id !== id);
        lotesFiltrados = lotesFiltrados.filter(l => l.id !== id);
        cargarLotes();
        actualizarResumen();
        actualizarGrafico('ocupacion');
        mostrarNotificacion('Lote eliminado correctamente', 'success');
    }
}

function verDetalleLote(id) {
    const lote = lotes.find(l => l.id === id);
    if (!lote) return;
    
    const content = document.getElementById('detalleLoteContent');
    content.innerHTML = `
        <div class="detalle-grid">
            <div class="detalle-seccion">
                <h4>Información del Lote</h4>
                <div class="detalle-item">
                    <span class="detalle-label">Número de Lote:</span>
                    <span class="detalle-valor"><strong>${lote.numero}</strong></span>
                </div>
                <div class="detalle-item">
                    <span class="detalle-label">Manzana:</span>
                    <span class="detalle-valor">Manzana ${lote.manzana}</span>
                </div>
                <div class="detalle-item">
                    <span class="detalle-label">Superficie:</span>
                    <span class="detalle-valor">${lote.superficie} m²</span>
                </div>
                <div class="detalle-item">
                    <span class="detalle-label">Estado:</span>
                    <span class="detalle-valor"><span class="badge estado-${lote.estado}">${capitalizar(lote.estado)}</span></span>
                </div>
                <div class="detalle-item">
                    <span class="detalle-label">Dirección:</span>
                    <span class="detalle-valor">${lote.direccion || '-'}</span>
                </div>
            </div>
            
            ${lote.propietario ? `
            <div class="detalle-seccion">
                <h4>Datos del Propietario</h4>
                <div class="detalle-item">
                    <span class="detalle-label">Nombre:</span>
                    <span class="detalle-valor"><strong>${lote.propietario}</strong></span>
                </div>
                <div class="detalle-item">
                    <span class="detalle-label">DNI/CUIT:</span>
                    <span class="detalle-valor">${lote.dni || '-'}</span>
                </div>
                <div class="detalle-item">
                    <span class="detalle-label">Teléfono:</span>
                    <span class="detalle-valor">${lote.telefono || '-'}</span>
                </div>
                <div class="detalle-item">
                    <span class="detalle-label">Email:</span>
                    <span class="detalle-valor">${lote.email || '-'}</span>
                </div>
                <div class="detalle-item">
                    <span class="detalle-label">Fecha de Asignación:</span>
                    <span class="detalle-valor">${lote.fechaAsignacion ? formatearFecha(lote.fechaAsignacion) : '-'}</span>
                </div>
            </div>
            ` : ''}
        </div>
        
        ${lote.observaciones ? `
        <div class="detalle-seccion" style="margin-top: 1rem;">
            <h4>Observaciones</h4>
            <p style="margin: 0.5rem 0; color: #666;">${lote.observaciones}</p>
        </div>
        ` : ''}
    `;
    
    document.getElementById('detalleLoteModal').style.display = 'block';
}

// ==================== TABLA ====================

function cargarLotes() {
    const tbody = document.getElementById('lotes-tbody');
    tbody.innerHTML = '';
    
    const inicio = (paginaActual - 1) * registrosPorPagina;
    const fin = Math.min(inicio + registrosPorPagina, lotesFiltrados.length);
    const lotesPagina = lotesFiltrados.slice(inicio, fin);
    
    if (lotesPagina.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 2rem;">No hay lotes para mostrar</td></tr>';
        actualizarPaginacion();
        return;
    }
    
    lotesPagina.forEach(lote => {
        const tr = document.createElement('tr');
        tr.style.opacity = '0';
        tr.style.transform = 'translateY(20px)';
        
        const estadoClass = lote.estado === 'ocupado' ? 'estado-ocupado' : 
                           lote.estado === 'disponible' ? 'estado-disponible' :
                           lote.estado === 'construccion' ? 'estado-construccion' : 'estado-reservado';
        
        tr.innerHTML = `
            <td><strong>Lote ${lote.numero}</strong></td>
            <td>Manzana ${lote.manzana}</td>
            <td>${lote.propietario || '-'}</td>
            <td>${lote.superficie} m²</td>
            <td><span class="badge ${estadoClass}">${capitalizar(lote.estado)}</span></td>
            <td>${lote.telefono || '-'}</td>
            <td>${lote.email || '-'}</td>
            <td class="acciones">
                <button class="btn-icon" onclick="verDetalleLote(${lote.id})" title="Ver detalle">
                    <img src="../../../assets/icons/eye.svg" alt="Ver">
                </button>
                <button class="btn-icon" onclick="editarLote(${lote.id})" title="Editar">
                    <img src="../../../assets/icons/edit.svg" alt="Editar">
                </button>
                <button class="btn-icon" onclick="eliminarLote(${lote.id})" title="Eliminar">
                    <img src="../../../assets/icons/trash.svg" alt="Eliminar">
                </button>
            </td>
        `;
        
        tbody.appendChild(tr);
        
        // Animación de entrada
        setTimeout(() => {
            tr.style.transition = 'all 0.3s ease';
            tr.style.opacity = '1';
            tr.style.transform = 'translateY(0)';
        }, 50);
    });
    
    actualizarPaginacion();
}

// ==================== RESUMEN ====================

function actualizarResumen() {
    const total = lotes.length;
    const ocupados = lotes.filter(l => l.estado === 'ocupado').length;
    const disponibles = lotes.filter(l => l.estado === 'disponible').length;
    const construccion = lotes.filter(l => l.estado === 'construccion').length;
    const porcentajeOcupacion = total > 0 ? Math.round((ocupados / total) * 100) : 0;
    const porcentajeDisponibilidad = total > 0 ? Math.round((disponibles / total) * 100) : 0;
    
    animarNumero('totalLotes', total);
    animarNumero('lotesOcupados', ocupados);
    animarNumero('lotesDisponibles', disponibles);
    animarNumero('lotesConstruccion', construccion);
    
    document.getElementById('porcentajeOcupacion').textContent = `${porcentajeOcupacion}% de ocupación`;
    document.getElementById('porcentajeDisponibilidad').textContent = `${porcentajeDisponibilidad}% disponibilidad`;
    
    // Animar barra de progreso
    setTimeout(() => {
        document.getElementById('progresoOcupacion').style.width = `${porcentajeOcupacion}%`;
    }, 100);
}

function animarNumero(elementId, valorFinal) {
    const elemento = document.getElementById(elementId);
    const valorInicial = parseInt(elemento.textContent) || 0;
    const duracion = 1000;
    const incremento = (valorFinal - valorInicial) / (duracion / 16);
    let valorActual = valorInicial;
    
    const intervalo = setInterval(() => {
        valorActual += incremento;
        if ((incremento > 0 && valorActual >= valorFinal) || (incremento < 0 && valorActual <= valorFinal)) {
            elemento.textContent = valorFinal;
            clearInterval(intervalo);
        } else {
            elemento.textContent = Math.round(valorActual);
        }
    }, 16);
}

// ==================== GRÁFICOS ====================

function inicializarGrafico() {
    const ctx = document.getElementById('lotesChart').getContext('2d');
    
    const manzanas = ['A', 'B', 'C', 'D'];
    const ocupados = manzanas.map(m => lotes.filter(l => l.manzana === m && l.estado === 'ocupado').length);
    const disponibles = manzanas.map(m => lotes.filter(l => l.manzana === m && l.estado === 'disponible').length);
    const construccion = manzanas.map(m => lotes.filter(l => l.manzana === m && l.estado === 'construccion').length);
    
    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: manzanas.map(m => `Manzana ${m}`),
            datasets: [
                {
                    label: 'Ocupados',
                    data: ocupados,
                    backgroundColor: 'rgba(46, 204, 113, 0.8)',
                    borderColor: 'rgba(46, 204, 113, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Disponibles',
                    data: disponibles,
                    backgroundColor: 'rgba(241, 196, 15, 0.8)',
                    borderColor: 'rgba(241, 196, 15, 1)',
                    borderWidth: 1
                },
                {
                    label: 'En Construcción',
                    data: construccion,
                    backgroundColor: 'rgba(52, 152, 219, 0.8)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function actualizarGrafico(vista) {
    if (!chartInstance) return;
    
    const manzanas = ['A', 'B', 'C', 'D'];
    
    if (vista === 'ocupacion') {
        const ocupados = manzanas.map(m => lotes.filter(l => l.manzana === m && l.estado === 'ocupado').length);
        const disponibles = manzanas.map(m => lotes.filter(l => l.manzana === m && l.estado === 'disponible').length);
        const construccion = manzanas.map(m => lotes.filter(l => l.manzana === m && l.estado === 'construccion').length);
        
        chartInstance.data.datasets = [
            {
                label: 'Ocupados',
                data: ocupados,
                backgroundColor: 'rgba(46, 204, 113, 0.8)',
                borderColor: 'rgba(46, 204, 113, 1)',
                borderWidth: 1
            },
            {
                label: 'Disponibles',
                data: disponibles,
                backgroundColor: 'rgba(241, 196, 15, 0.8)',
                borderColor: 'rgba(241, 196, 15, 1)',
                borderWidth: 1
            },
            {
                label: 'En Construcción',
                data: construccion,
                backgroundColor: 'rgba(52, 152, 219, 0.8)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 1
            }
        ];
    } else if (vista === 'superficie') {
        const superficies = manzanas.map(m => {
            const lotesManzana = lotes.filter(l => l.manzana === m);
            const total = lotesManzana.reduce((sum, l) => sum + l.superficie, 0);
            return Math.round(total);
        });
        
        chartInstance.data.datasets = [
            {
                label: 'Superficie Total (m²)',
                data: superficies,
                backgroundColor: 'rgba(155, 89, 182, 0.8)',
                borderColor: 'rgba(155, 89, 182, 1)',
                borderWidth: 1
            }
        ];
    }
    
    chartInstance.update();
}

// ==================== FILTROS ====================

function aplicarFiltros() {
    const filtroEstado = document.getElementById('filtroEstado').value;
    const filtroManzana = document.getElementById('filtroManzana').value;
    const filtroSuperficie = document.getElementById('filtroSuperficie').value;
    
    lotesFiltrados = lotes.filter(lote => {
        let cumple = true;
        
        if (filtroEstado !== 'todos' && lote.estado !== filtroEstado) {
            cumple = false;
        }
        
        if (filtroManzana !== 'todas' && lote.manzana !== filtroManzana) {
            cumple = false;
        }
        
        if (filtroSuperficie !== 'todas') {
            const [min, max] = filtroSuperficie.split('-');
            if (max === 'mas') {
                if (lote.superficie < parseInt(min)) cumple = false;
            } else {
                if (lote.superficie < parseInt(min) || lote.superficie > parseInt(max)) cumple = false;
            }
        }
        
        return cumple;
    });
    
    paginaActual = 1;
    cargarLotes();
    mostrarNotificacion('Filtros aplicados', 'info');
}

function limpiarFiltros() {
    document.getElementById('filtroEstado').value = 'todos';
    document.getElementById('filtroManzana').value = 'todas';
    document.getElementById('filtroSuperficie').value = 'todas';
    
    lotesFiltrados = [...lotes];
    paginaActual = 1;
    cargarLotes();
    mostrarNotificacion('Filtros limpiados', 'info');
}

function buscarLote(e) {
    const termino = e.target.value.toLowerCase();
    
    lotesFiltrados = lotes.filter(lote => {
        return lote.numero.toString().includes(termino) ||
               (lote.propietario && lote.propietario.toLowerCase().includes(termino)) ||
               lote.manzana.toLowerCase().includes(termino);
    });
    
    paginaActual = 1;
    cargarLotes();
}

// ==================== PAGINACIÓN ====================

function actualizarPaginacion() {
    const paginacion = document.getElementById('paginacion');
    const totalPaginas = Math.ceil(lotesFiltrados.length / registrosPorPagina);
    
    if (totalPaginas <= 1) {
        paginacion.innerHTML = '';
        return;
    }
    
    let html = '<div class="paginacion-controles">';
    
    // Botón anterior
    html += `<button class="btn-paginacion" ${paginaActual === 1 ? 'disabled' : ''} onclick="cambiarPagina(${paginaActual - 1})">
        <img src="../../../assets/icons/arrow-left.svg" alt="Anterior"> Anterior
    </button>`;
    
    // Números de página
    html += '<div class="paginacion-numeros">';
    
    const rango = 2;
    let inicio = Math.max(1, paginaActual - rango);
    let fin = Math.min(totalPaginas, paginaActual + rango);
    
    if (inicio > 1) {
        html += `<button class="btn-numero" onclick="cambiarPagina(1)">1</button>`;
        if (inicio > 2) html += '<span class="paginacion-dots">...</span>';
    }
    
    for (let i = inicio; i <= fin; i++) {
        html += `<button class="btn-numero ${i === paginaActual ? 'active' : ''}" onclick="cambiarPagina(${i})">${i}</button>`;
    }
    
    if (fin < totalPaginas) {
        if (fin < totalPaginas - 1) html += '<span class="paginacion-dots">...</span>';
        html += `<button class="btn-numero" onclick="cambiarPagina(${totalPaginas})">${totalPaginas}</button>`;
    }
    
    html += '</div>';
    
    // Botón siguiente
    html += `<button class="btn-paginacion" ${paginaActual === totalPaginas ? 'disabled' : ''} onclick="cambiarPagina(${paginaActual + 1})">
        Siguiente <img src="../../../assets/icons/arrow-right.svg" alt="Siguiente">
    </button>`;
    
    html += '</div>';
    
    paginacion.innerHTML = html;
}

function cambiarPagina(pagina) {
    paginaActual = pagina;
    cargarLotes();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== EXPORTAR ====================

function exportarLotes() {
    let csv = 'Lote,Manzana,Propietario,DNI,Superficie,Estado,Teléfono,Email,Dirección\n';
    
    lotesFiltrados.forEach(lote => {
        csv += `${lote.numero},`;
        csv += `${lote.manzana},`;
        csv += `${lote.propietario || ''},`;
        csv += `${lote.dni || ''},`;
        csv += `${lote.superficie},`;
        csv += `${lote.estado},`;
        csv += `${lote.telefono || ''},`;
        csv += `${lote.email || ''},`;
        csv += `${lote.direccion || ''}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `lotes_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    mostrarNotificacion('Listado exportado correctamente', 'success');
}

function generarMapa() {
    mostrarNotificacion('Funcionalidad de mapa en desarrollo', 'info');
}

function imprimirFicha() {
    window.print();
}

// ==================== UTILIDADES ====================

function capitalizar(str) {
    if (str === 'construccion') return 'En Construcción';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatearFecha(fecha) {
    const date = new Date(fecha);
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', opciones);
}

function mostrarNotificacion(mensaje, tipo) {
    const notif = document.createElement('div');
    notif.className = `notificacion notif-${tipo}`;
    notif.textContent = mensaje;
    
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notif.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notif);
        }, 300);
    }, 3000);
}