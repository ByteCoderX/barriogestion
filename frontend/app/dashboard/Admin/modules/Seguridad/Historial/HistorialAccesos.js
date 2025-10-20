// HistorialAccesos.js

// Datos de ejemplo (simulación - luego se conectará con el backend)
let accesos = [
    {
        id: 1,
        fecha: '2024-10-20',
        hora: '14:30',
        tipo: 'visita',
        nombre: 'Roberto González',
        documento: '35789456',
        lote: 'lote1',
        propietario: 'Juan Pérez',
        movimiento: 'entrada',
        vehiculo: 'Ford Focus ABC123',
        guardia: 'Pedro González',
        observaciones: ''
    },
    {
        id: 2,
        fecha: '2024-10-20',
        hora: '13:15',
        tipo: 'propietario',
        nombre: 'María García',
        documento: '28456789',
        lote: 'lote2',
        propietario: 'María García',
        movimiento: 'entrada',
        vehiculo: 'Toyota Corolla DEF456',
        guardia: 'Pedro González',
        observaciones: ''
    },
    {
        id: 3,
        fecha: '2024-10-20',
        hora: '12:45',
        tipo: 'proveedor',
        nombre: 'Servicios Express SA',
        documento: '30-71234567-8',
        lote: 'lote3',
        propietario: 'Carlos López',
        movimiento: 'entrada',
        vehiculo: 'Fiat Ducato GHI789',
        guardia: 'Luis Martín',
        observaciones: 'Entrega de materiales'
    },
    {
        id: 4,
        fecha: '2024-10-20',
        hora: '11:30',
        tipo: 'delivery',
        nombre: 'Pedidos Ya - Juan Ramírez',
        documento: '40123456',
        lote: 'lote4',
        propietario: 'Ana Martínez',
        movimiento: 'salida',
        vehiculo: 'Moto Honda JKL321',
        guardia: 'Luis Martín',
        observaciones: 'Entrega de almuerzo'
    },
    {
        id: 5,
        fecha: '2024-10-20',
        hora: '10:15',
        tipo: 'empleado',
        nombre: 'Laura Fernández',
        documento: '33654987',
        lote: 'lote1',
        propietario: 'Juan Pérez',
        movimiento: 'entrada',
        vehiculo: '',
        guardia: 'Jorge Ramírez',
        observaciones: 'Empleada doméstica'
    },
    {
        id: 6,
        fecha: '2024-10-19',
        hora: '18:45',
        tipo: 'propietario',
        nombre: 'Ana Martínez',
        documento: '29753159',
        lote: 'lote4',
        propietario: 'Ana Martínez',
        movimiento: 'entrada',
        vehiculo: 'Peugeot 208 STU147',
        guardia: 'Luis Martín',
        observaciones: 'Regreso del trabajo'
    },
    {
        id: 7,
        fecha: '2024-10-19',
        hora: '17:20',
        tipo: 'proveedor',
        nombre: 'Mantenimiento Total',
        documento: '33-65478912-4',
        lote: 'lote1',
        propietario: 'Juan Pérez',
        movimiento: 'salida',
        vehiculo: 'Ford Ranger VWX258',
        guardia: 'Luis Martín',
        observaciones: 'Finalizó trabajo de plomería'
    },
    {
        id: 8,
        fecha: '2024-10-19',
        hora: '09:45',
        tipo: 'visita',
        nombre: 'Diego Castro',
        documento: '39874561',
        lote: 'lote5',
        propietario: 'Roberto Sánchez',
        movimiento: 'entrada',
        vehiculo: 'Chevrolet Cruze MNO654',
        guardia: 'Jorge Ramírez',
        observaciones: 'Visita familiar'
    },
    {
        id: 9,
        fecha: '2024-10-19',
        hora: '09:00',
        tipo: 'propietario',
        nombre: 'Carlos López',
        documento: '32456123',
        lote: 'lote3',
        propietario: 'Carlos López',
        movimiento: 'salida',
        vehiculo: 'Volkswagen Gol PQR987',
        guardia: 'Pedro González',
        observaciones: 'Salida al trabajo'
    },
    {
        id: 10,
        fecha: '2024-10-18',
        hora: '16:30',
        tipo: 'visita',
        nombre: 'Sofía Martínez',
        documento: '41258963',
        lote: 'lote2',
        propietario: 'María García',
        movimiento: 'salida',
        vehiculo: '',
        guardia: 'Pedro González',
        observaciones: ''
    }
];

let accesosFiltrados = [...accesos];
let paginaActual = 1;
let registrosPorPagina = 10;
let accesoSeleccionado = null;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    inicializarEventos();
    cargarAccesos();
    actualizarResumen();
    inicializarGrafico();
    establecerFechaHoraActual();
});

// Establecer fecha y hora actual en el modal de salida
function establecerFechaHoraActual() {
    const hoy = new Date();
    const fechaStr = hoy.toISOString().split('T')[0];
    const horaStr = hoy.toTimeString().slice(0, 5);
    
    const fechaSalida = document.getElementById('fechaSalida');
    const horaSalida = document.getElementById('horaSalida');
    
    if (fechaSalida) fechaSalida.value = fechaStr;
    if (horaSalida) horaSalida.value = horaStr;
}

// Inicializar eventos
function inicializarEventos() {
    // Botones de acciones
    const exportarBtn = document.getElementById('exportarHistorialBtn');
    const reporteBtn = document.getElementById('generarReporteBtn');
    const imprimirBtn = document.getElementById('imprimirHistorialBtn');
    
    if (exportarBtn) exportarBtn.addEventListener('click', exportarHistorial);
    if (reporteBtn) reporteBtn.addEventListener('click', generarReporte);
    if (imprimirBtn) imprimirBtn.addEventListener('click', imprimirHistorial);
    
    // Filtros
    const aplicarFiltrosBtn = document.getElementById('aplicarFiltros');
    const limpiarFiltrosBtn = document.getElementById('limpiarFiltros');
    
    if (aplicarFiltrosBtn) aplicarFiltrosBtn.addEventListener('click', aplicarFiltros);
    if (limpiarFiltrosBtn) limpiarFiltrosBtn.addEventListener('click', limpiarFiltros);
    
    // Búsqueda
    const buscarInput = document.getElementById('buscarAcceso');
    if (buscarInput) buscarInput.addEventListener('input', buscarAcceso);
    
    // Formulario de salida
    const salidaForm = document.getElementById('salidaForm');
    if (salidaForm) salidaForm.addEventListener('submit', guardarSalida);
    
    // Botones de cancelar
    const cancelarSalidaBtn = document.getElementById('cancelarSalida');
    if (cancelarSalidaBtn) cancelarSalidaBtn.addEventListener('click', cerrarModalSalida);
    
    // Cerrar modales con X
    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Cerrar modal al hacer click fuera
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Registros por página
    const registrosPorPaginaSelect = document.getElementById('registrosPorPagina');
    if (registrosPorPaginaSelect) {
        registrosPorPaginaSelect.addEventListener('change', function() {
            registrosPorPagina = parseInt(this.value);
            paginaActual = 1;
            cargarAccesos();
        });
    }
    
    // Botones de período del gráfico
    document.querySelectorAll('.btn-periodo').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.btn-periodo').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            actualizarGrafico(this.dataset.periodo);
        });
    });
}

// Cerrar modal de salida
function cerrarModalSalida() {
    const modal = document.getElementById('salidaModal');
    if (modal) modal.style.display = 'none';
}

// Cargar accesos en la tabla
function cargarAccesos() {
    const tbody = document.getElementById('accesos-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    const inicio = (paginaActual - 1) * registrosPorPagina;
    const fin = inicio + registrosPorPagina;
    const accesosPagina = accesosFiltrados.slice(inicio, fin);
    
    if (accesosPagina.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 2rem;">No hay accesos para mostrar</td></tr>';
        return;
    }
    
    accesosPagina.forEach(acc => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td><strong>${formatearFecha(acc.fecha)}</strong><br><small style="color: #b8b8b8;">${acc.hora}</small></td>
            <td><span class="badge tipo-${acc.tipo}">${getTipoNombre(acc.tipo)}</span></td>
            <td>${acc.nombre}</td>
            <td>${acc.documento}</td>
            <td><strong>${capitalizar(acc.lote.replace('lote', 'Lote '))}</strong><br><small style="color: #b8b8b8;">${acc.propietario}</small></td>
            <td><span class="badge movimiento-${acc.movimiento}">${capitalizar(acc.movimiento)}</span></td>
            <td>${acc.vehiculo || '<span style="color: #666;">-</span>'}</td>
            <td>${acc.guardia}</td>
            <td class="acciones">
                <button class="btn-icon" onclick="verDetalleAcceso(${acc.id})" title="Ver detalle">
                    <img src="../../../assets/icons/eye.svg" alt="Ver">
                </button>
                ${acc.movimiento === 'entrada' ? `<button class="btn-icon" onclick="abrirModalSalida(${acc.id})" title="Registrar salida">
                    <img src="../../../assets/icons/actualizardatos.png" alt="Salida">
                </button>` : ''}
                <button class="btn-icon" onclick="eliminarAcceso(${acc.id})" title="Eliminar">
                    <img src="../../../assets/icons/trash.svg" alt="Eliminar">
                </button>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
    
    actualizarPaginacion();
}

// Ver detalle de acceso
function verDetalleAcceso(id) {
    const acceso = accesos.find(a => a.id === id);
    if (!acceso) return;
    
    const detalleContent = document.getElementById('detalleContent');
    if (!detalleContent) return;
    
    detalleContent.innerHTML = `
        <div class="detalle-item">
            <strong>Fecha y Hora:</strong>
            <span>${formatearFecha(acceso.fecha)} - ${acceso.hora}</span>
        </div>
        <div class="detalle-item">
            <strong>Tipo de Acceso:</strong>
            <span class="badge tipo-${acceso.tipo}">${getTipoNombre(acceso.tipo)}</span>
        </div>
        <div class="detalle-item">
            <strong>Nombre:</strong>
            <span>${acceso.nombre}</span>
        </div>
        <div class="detalle-item">
            <strong>Documento:</strong>
            <span>${acceso.documento}</span>
        </div>
        <div class="detalle-item">
            <strong>Lote Destino:</strong>
            <span>${capitalizar(acceso.lote.replace('lote', 'Lote '))}</span>
        </div>
        <div class="detalle-item">
            <strong>Propietario:</strong>
            <span>${acceso.propietario}</span>
        </div>
        <div class="detalle-item">
            <strong>Movimiento:</strong>
            <span class="badge movimiento-${acceso.movimiento}">${capitalizar(acceso.movimiento)}</span>
        </div>
        <div class="detalle-item">
            <strong>Vehículo:</strong>
            <span>${acceso.vehiculo || 'Sin vehículo'}</span>
        </div>
        <div class="detalle-item">
            <strong>Guardia:</strong>
            <span>${acceso.guardia}</span>
        </div>
        <div class="detalle-item">
            <strong>Observaciones:</strong>
            <span>${acceso.observaciones || 'Sin observaciones'}</span>
        </div>
    `;
    
    const modal = document.getElementById('detalleModal');
    if (modal) modal.style.display = 'block';
    
    const cerrarBtn = document.getElementById('cerrarDetalle');
    if (cerrarBtn) {
        cerrarBtn.onclick = function() {
            modal.style.display = 'none';
        };
    }
    
    const imprimirBtn = document.getElementById('imprimirDetalle');
    if (imprimirBtn) {
        imprimirBtn.onclick = function() {
            window.print();
        };
    }
}

// Abrir modal de salida
function abrirModalSalida(id) {
    const acceso = accesos.find(a => a.id === id);
    if (!acceso) return;
    
    accesoSeleccionado = acceso;
    
    document.getElementById('salidaNombre').textContent = acceso.nombre;
    document.getElementById('salidaDocumento').textContent = acceso.documento;
    document.getElementById('salidaTipo').textContent = getTipoNombre(acceso.tipo);
    document.getElementById('salidaHoraEntrada').textContent = `${formatearFecha(acceso.fecha)} - ${acceso.hora}`;
    
    establecerFechaHoraActual();
    
    const modal = document.getElementById('salidaModal');
    if (modal) modal.style.display = 'block';
}

// Guardar salida
function guardarSalida(e) {
    e.preventDefault();
    
    if (!accesoSeleccionado) return;
    
    const fechaSalida = document.getElementById('fechaSalida').value;
    const horaSalida = document.getElementById('horaSalida').value;
    const guardiaSalida = document.getElementById('guardiaSalida').value;
    const observacionesSalida = document.getElementById('observacionesSalida').value;
    
    const guardiaSelect = document.getElementById('guardiaSalida');
    const guardiaTexto = guardiaSelect.options[guardiaSelect.selectedIndex].text;
    
    // Crear nuevo registro de salida
    const nuevaSalida = {
        id: Date.now(),
        fecha: fechaSalida,
        hora: horaSalida,
        tipo: accesoSeleccionado.tipo,
        nombre: accesoSeleccionado.nombre,
        documento: accesoSeleccionado.documento,
        lote: accesoSeleccionado.lote,
        propietario: accesoSeleccionado.propietario,
        movimiento: 'salida',
        vehiculo: accesoSeleccionado.vehiculo,
        guardia: guardiaTexto,
        observaciones: observacionesSalida || ''
    };
    
    accesos.unshift(nuevaSalida);
    accesosFiltrados = [...accesos];
    
    mostrarNotificacion('Salida registrada correctamente', 'success');
    cerrarModalSalida();
    cargarAccesos();
    actualizarResumen();
    
    accesoSeleccionado = null;
}

// Eliminar acceso
function eliminarAcceso(id) {
    if (!confirm('¿Está seguro de eliminar este registro de acceso?')) return;
    
    const index = accesos.findIndex(a => a.id === id);
    if (index !== -1) {
        accesos.splice(index, 1);
        accesosFiltrados = accesosFiltrados.filter(a => a.id !== id);
        cargarAccesos();
        actualizarResumen();
        mostrarNotificacion('Registro eliminado', 'success');
    }
}

// Actualizar resumen
function actualizarResumen() {
    const hoy = new Date().toISOString().split('T')[0];
    
    const accesosHoy = accesos.filter(a => a.fecha === hoy);
    const entradasHoy = accesosHoy.filter(a => a.movimiento === 'entrada').length;
    const salidasHoy = accesosHoy.filter(a => a.movimiento === 'salida').length;
    
    // Calcular visitas activas
    const visitasActivas = calcularVisitasActivas();
    
    // Accesos esta semana
    const inicioSemana = new Date();
    inicioSemana.setDate(inicioSemana.getDate() - inicioSemana.getDay());
    const accesosSemana = accesos.filter(a => new Date(a.fecha) >= inicioSemana).length;
    
    // Alertas pendientes
    const alertasPendientes = calcularAlertasPendientes();
    
    // Actualizar valores en el DOM
    const cards = document.querySelectorAll('.resumen-card');
    
    if (cards[0]) {
        cards[0].querySelector('.resumen-valor').textContent = accesosHoy.length;
        const info = cards[0].querySelector('.info');
        if (info) info.textContent = `${entradasHoy} entradas / ${salidasHoy} salidas`;
    }
    
    if (cards[1]) {
        cards[1].querySelector('.resumen-valor').textContent = visitasActivas;
    }
    
    if (cards[2]) {
        cards[2].querySelector('.resumen-valor').textContent = accesosSemana;
    }
    
    if (cards[3]) {
        cards[3].querySelector('.resumen-valor').textContent = alertasPendientes;
    }
}

// Calcular visitas activas
function calcularVisitasActivas() {
    const visitantes = {};
    
    accesos.forEach(acc => {
        const key = `${acc.documento}-${acc.lote}`;
        
        if (acc.movimiento === 'entrada') {
            visitantes[key] = true;
        } else if (acc.movimiento === 'salida') {
            delete visitantes[key];
        }
    });
    
    return Object.keys(visitantes).length;
}

// Calcular alertas pendientes
function calcularAlertasPendientes() {
    const ahora = new Date();
    const doceHorasAtras = new Date(ahora.getTime() - (12 * 60 * 60 * 1000));
    let alertas = 0;
    
    const visitantes = {};
    
    accesos.forEach(acc => {
        const key = `${acc.documento}-${acc.lote}`;
        const fechaHora = new Date(`${acc.fecha}T${acc.hora}`);
        
        if (acc.movimiento === 'entrada') {
            visitantes[key] = fechaHora;
        } else if (acc.movimiento === 'salida') {
            delete visitantes[key];
        }
    });
    
    Object.values(visitantes).forEach(fechaEntrada => {
        if (fechaEntrada < doceHorasAtras) {
            alertas++;
        }
    });
    
    return alertas;
}

// Aplicar filtros
function aplicarFiltros() {
    const filtroTipo = document.getElementById('filtroTipo').value;
    const filtroMovimiento = document.getElementById('filtroMovimiento').value;
    const filtroLote = document.getElementById('filtroLote').value;
    const filtroFechaDesde = document.getElementById('filtroFechaDesde').value;
    const filtroFechaHasta = document.getElementById('filtroFechaHasta').value;
    
    accesosFiltrados = accesos.filter(acc => {
        let cumpleFiltro = true;
        
        if (filtroTipo !== 'todos' && acc.tipo !== filtroTipo) {
            cumpleFiltro = false;
        }
        
        if (filtroMovimiento !== 'todos' && acc.movimiento !== filtroMovimiento) {
            cumpleFiltro = false;
        }
        
        if (filtroLote !== 'todos' && acc.lote !== filtroLote) {
            cumpleFiltro = false;
        }
        
        if (filtroFechaDesde && acc.fecha < filtroFechaDesde) {
            cumpleFiltro = false;
        }
        
        if (filtroFechaHasta && acc.fecha > filtroFechaHasta) {
            cumpleFiltro = false;
        }
        
        return cumpleFiltro;
    });
    
    paginaActual = 1;
    cargarAccesos();
    mostrarNotificacion('Filtros aplicados', 'info');
}

// Limpiar filtros
function limpiarFiltros() {
    document.getElementById('filtroTipo').value = 'todos';
    document.getElementById('filtroMovimiento').value = 'todos';
    document.getElementById('filtroLote').value = 'todos';
    document.getElementById('filtroFechaDesde').value = '';
    document.getElementById('filtroFechaHasta').value = '';
    
    accesosFiltrados = [...accesos];
    paginaActual = 1;
    cargarAccesos();
    mostrarNotificacion('Filtros limpiados', 'info');
}

// Buscar acceso
function buscarAcceso(e) {
    const termino = e.target.value.toLowerCase();
    
    accesosFiltrados = accesos.filter(acc => 
        acc.nombre.toLowerCase().includes(termino) ||
        acc.documento.toLowerCase().includes(termino) ||
        acc.lote.toLowerCase().includes(termino) ||
        acc.propietario.toLowerCase().includes(termino) ||
        acc.vehiculo.toLowerCase().includes(termino) ||
        acc.guardia.toLowerCase().includes(termino) ||
        acc.observaciones.toLowerCase().includes(termino)
    );
    
    paginaActual = 1;
    cargarAccesos();
}

// Exportar historial
function exportarHistorial() {
    const csv = convertirACSV(accesosFiltrados);
    descargarArchivo(csv, 'historial-accesos.csv', 'text/csv');
    mostrarNotificacion('Historial exportado correctamente', 'success');
}

// Generar reporte
function generarReporte() {
    mostrarNotificacion('Generando reporte...', 'info');
    setTimeout(() => {
        mostrarNotificacion('Reporte generado correctamente', 'success');
    }, 1500);
}

// Imprimir historial
function imprimirHistorial() {
    mostrarNotificacion('Preparando impresión...', 'info');
    setTimeout(() => {
        window.print();
    }, 500);
}

// Inicializar gráfico
function inicializarGrafico() {
    const canvas = document.getElementById('accesosChart');
    if (!canvas) return;
    
    const container = canvas.parentElement;
    container.innerHTML = '<p style="text-align: center; color: #b8b8b8; padding: 3rem;">Gráfico de evolución de accesos</p>';
}

// Actualizar gráfico
function actualizarGrafico(periodo) {
    console.log('Gráfico actualizado para período:', periodo);
}

// Actualizar paginación
function actualizarPaginacion() {
    const totalPaginas = Math.ceil(accesosFiltrados.length / registrosPorPagina);
    const paginacionDiv = document.getElementById('paginacion');
    
    if (!paginacionDiv) return;
    
    if (totalPaginas <= 1) {
        paginacionDiv.innerHTML = '';
        return;
    }
    
    let html = '<div class="paginacion-botones">';
    
    html += `<button class="btn-pagina" ${paginaActual === 1 ? 'disabled' : ''} onclick="cambiarPagina(${paginaActual - 1})">Anterior</button>`;
    
    for (let i = 1; i <= totalPaginas; i++) {
        if (i === 1 || i === totalPaginas || (i >= paginaActual - 1 && i <= paginaActual + 1)) {
            html += `<button class="btn-pagina ${i === paginaActual ? 'active' : ''}" onclick="cambiarPagina(${i})">${i}</button>`;
        } else if (i === paginaActual - 2 || i === paginaActual + 2) {
            html += '<span class="paginacion-puntos">...</span>';
        }
    }
    
    html += `<button class="btn-pagina" ${paginaActual === totalPaginas ? 'disabled' : ''} onclick="cambiarPagina(${paginaActual + 1})">Siguiente</button>`;
    
    html += '</div>';
    paginacionDiv.innerHTML = html;
}

// Cambiar página
function cambiarPagina(pagina) {
    paginaActual = pagina;
    cargarAccesos();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Funciones auxiliares
function formatearFecha(fecha) {
    const date = new Date(fecha + 'T00:00:00');
    return date.toLocaleDateString('es-AR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
    });
}

function capitalizar(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getTipoNombre(tipo) {
    const nombres = {
        propietario: 'Propietario',
        visita: 'Visita',
        proveedor: 'Proveedor',
        empleado: 'Empleado',
        delivery: 'Delivery'
    };
    return nombres[tipo] || tipo;
}

function convertirACSV(datos) {
    const headers = ['Fecha', 'Hora', 'Tipo', 'Nombre', 'Documento', 'Lote', 'Movimiento', 'Vehículo', 'Guardia'];
    let csv = headers.join(',') + '\n';
    
    datos.forEach(acc => {
        const fila = [
            acc.fecha,
            acc.hora,
            getTipoNombre(acc.tipo),
            `"${acc.nombre}"`,
            acc.documento,
            acc.lote,
            capitalizar(acc.movimiento),
            `"${acc.vehiculo}"`,
            `"${acc.guardia}"`
        ];
        csv += fila.join(',') + '\n';
    });
    
    return csv;
}

function descargarArchivo(contenido, nombreArchivo, tipo) {
    const blob = new Blob([contenido], { type: tipo });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nombreArchivo;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function mostrarNotificacion(mensaje, tipo = 'info') {
    const notif = document.createElement('div');
    notif.className = `notificacion notificacion-${tipo}`;
    notif.textContent = mensaje;
    
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}