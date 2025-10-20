// gestionar-fondos.js

// Datos de ejemplo (simulación - luego se conectará con el backend)
let movimientos = [
    {
        id: 1,
        fecha: '2024-10-15',
        tipo: 'ingreso',
        fondo: 'comun',
        concepto: 'Cobro expensas Octubre',
        categoria: 'expensas',
        monto: 850000,
        saldo: 2450000,
        comprobante: 'REC-001',
        descripcion: 'Cobro de expensas mensuales'
    },
    {
        id: 2,
        fecha: '2024-10-12',
        tipo: 'egreso',
        fondo: 'comun',
        concepto: 'Servicio de limpieza',
        categoria: 'limpieza',
        monto: 125000,
        saldo: 1600000,
        comprobante: 'FC-445',
        descripcion: 'Pago mensual servicio de limpieza'
    },
    {
        id: 3,
        fecha: '2024-10-10',
        tipo: 'ingreso',
        fondo: 'reserva',
        concepto: 'Aporte mensual al fondo',
        categoria: 'aporte',
        monto: 200000,
        saldo: 5800000,
        comprobante: 'TRF-089',
        descripcion: 'Transferencia mensual al fondo de reserva'
    },
    {
        id: 4,
        fecha: '2024-10-08',
        tipo: 'egreso',
        fondo: 'comun',
        concepto: 'Reparación portón principal',
        categoria: 'mantenimiento',
        monto: 180000,
        saldo: 1725000,
        comprobante: 'FC-442',
        descripcion: 'Reparación de motor y estructura del portón'
    },
    {
        id: 5,
        fecha: '2024-10-05',
        tipo: 'transferencia',
        fondo: 'comun',
        concepto: 'Transferencia a fondo de emergencia',
        categoria: 'otros',
        monto: 300000,
        saldo: 1905000,
        comprobante: 'TRF-088',
        descripcion: 'Refuerzo del fondo de emergencia'
    }
];

let fondos = {
    comun: 2450000,
    reserva: 5800000,
    emergencia: 1200000,
    obras: 0
};

let movimientosFiltrados = [...movimientos];
let paginaActual = 1;
let registrosPorPagina = 10;
let modoEdicion = false;
let movimientoEditando = null;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    inicializarEventos();
    cargarMovimientos();
    actualizarResumen();
    inicializarGrafico();
    establecerFechaActual();
});

// Establecer fecha actual en los campos de fecha
function establecerFechaActual() {
    const hoy = new Date().toISOString().split('T')[0];
    document.getElementById('fechaMovimiento').value = hoy;
    document.getElementById('fechaTransferencia').value = hoy;
}

// Inicializar todos los eventos
function inicializarEventos() {
    // Botones de acciones
    document.getElementById('nuevoMovimientoBtn').addEventListener('click', abrirModalNuevoMovimiento);
    document.getElementById('transferirFondosBtn').addEventListener('click', abrirModalTransferencia);
    document.getElementById('exportarFondosBtn').addEventListener('click', exportarMovimientos);
    document.getElementById('generarReporteBtn').addEventListener('click', generarReporte);
    
    // Filtros
    document.getElementById('aplicarFiltros').addEventListener('click', aplicarFiltros);
    document.getElementById('limpiarFiltros').addEventListener('click', limpiarFiltros);
    
    // Búsqueda
    document.getElementById('buscarMovimiento').addEventListener('input', buscarMovimiento);
    
    // Formularios
    document.getElementById('movimientoForm').addEventListener('submit', guardarMovimiento);
    document.getElementById('transferenciaForm').addEventListener('submit', guardarTransferencia);
    
    // Botones de cancelar
    document.getElementById('cancelarMovimiento').addEventListener('click', cerrarModalMovimiento);
    document.getElementById('cancelarTransferencia').addEventListener('click', cerrarModalTransferencia);
    
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
    document.getElementById('registrosPorPagina').addEventListener('change', function() {
        registrosPorPagina = parseInt(this.value);
        paginaActual = 1;
        cargarMovimientos();
    });
    
    // Botones de período del gráfico
    document.querySelectorAll('.btn-periodo').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.btn-periodo').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            actualizarGrafico(this.dataset.periodo);
        });
    });
    
    // Actualizar saldo disponible en transferencias
    document.getElementById('fondoOrigen').addEventListener('change', actualizarSaldoDisponible);
}

// Abrir modal de nuevo movimiento
function abrirModalNuevoMovimiento() {
    modoEdicion = false;
    movimientoEditando = null;
    document.getElementById('modalTitle').textContent = 'Nuevo Movimiento';
    document.getElementById('movimientoForm').reset();
    establecerFechaActual();
    document.getElementById('movimientoModal').style.display = 'block';
}

// Abrir modal de transferencia
function abrirModalTransferencia() {
    document.getElementById('transferenciaForm').reset();
    establecerFechaActual();
    actualizarSaldoDisponible();
    document.getElementById('transferenciaModal').style.display = 'block';
}

// Cerrar modales
function cerrarModalMovimiento() {
    document.getElementById('movimientoModal').style.display = 'none';
}

function cerrarModalTransferencia() {
    document.getElementById('transferenciaModal').style.display = 'none';
}

// Guardar movimiento
function guardarMovimiento(e) {
    e.preventDefault();
    
    const tipo = document.getElementById('tipoMovimiento').value;
    const fondo = document.getElementById('fondoMovimiento').value;
    const concepto = document.getElementById('conceptoMovimiento').value;
    const categoria = document.getElementById('categoriaMovimiento').value;
    const monto = parseFloat(document.getElementById('montoMovimiento').value);
    const fecha = document.getElementById('fechaMovimiento').value;
    const comprobante = document.getElementById('comprobanteMovimiento').value;
    const descripcion = document.getElementById('descripcionMovimiento').value;
    
    // Actualizar saldo del fondo
    if (tipo === 'ingreso') {
        fondos[fondo] += monto;
    } else {
        fondos[fondo] -= monto;
    }
    
    const nuevoMovimiento = {
        id: modoEdicion ? movimientoEditando.id : Date.now(),
        fecha,
        tipo,
        fondo,
        concepto,
        categoria,
        monto,
        saldo: fondos[fondo],
        comprobante: comprobante || 'N/A',
        descripcion: descripcion || 'Sin descripción'
    };
    
    if (modoEdicion) {
        const index = movimientos.findIndex(m => m.id === movimientoEditando.id);
        movimientos[index] = nuevoMovimiento;
        mostrarNotificacion('Movimiento actualizado correctamente', 'success');
    } else {
        movimientos.unshift(nuevoMovimiento);
        mostrarNotificacion('Movimiento registrado correctamente', 'success');
    }
    
    cerrarModalMovimiento();
    cargarMovimientos();
    actualizarResumen();
    actualizarGrafico('mes');
}

// Guardar transferencia
function guardarTransferencia(e) {
    e.preventDefault();
    
    const fondoOrigen = document.getElementById('fondoOrigen').value;
    const fondoDestino = document.getElementById('fondoDestino').value;
    const monto = parseFloat(document.getElementById('montoTransferencia').value);
    const fecha = document.getElementById('fechaTransferencia').value;
    const motivo = document.getElementById('motivoTransferencia').value;
    
    // Validar que los fondos sean diferentes
    if (fondoOrigen === fondoDestino) {
        mostrarNotificacion('No puedes transferir al mismo fondo', 'error');
        return;
    }
    
    // Validar saldo suficiente
    if (fondos[fondoOrigen] < monto) {
        mostrarNotificacion('Saldo insuficiente en el fondo origen', 'error');
        return;
    }
    
    // Actualizar saldos
    fondos[fondoOrigen] -= monto;
    fondos[fondoDestino] += monto;
    
    // Crear movimiento de egreso
    const movimientoEgreso = {
        id: Date.now(),
        fecha,
        tipo: 'transferencia',
        fondo: fondoOrigen,
        concepto: `Transferencia a ${getNombreFondo(fondoDestino)}`,
        categoria: 'otros',
        monto: monto,
        saldo: fondos[fondoOrigen],
        comprobante: `TRF-${Date.now().toString().slice(-6)}`,
        descripcion: motivo
    };
    
    // Crear movimiento de ingreso
    const movimientoIngreso = {
        id: Date.now() + 1,
        fecha,
        tipo: 'transferencia',
        fondo: fondoDestino,
        concepto: `Transferencia desde ${getNombreFondo(fondoOrigen)}`,
        categoria: 'otros',
        monto: monto,
        saldo: fondos[fondoDestino],
        comprobante: `TRF-${Date.now().toString().slice(-6)}`,
        descripcion: motivo
    };
    
    movimientos.unshift(movimientoIngreso, movimientoEgreso);
    
    mostrarNotificacion('Transferencia realizada correctamente', 'success');
    cerrarModalTransferencia();
    cargarMovimientos();
    actualizarResumen();
}

// Actualizar saldo disponible en transferencias
function actualizarSaldoDisponible() {
    const fondoOrigen = document.getElementById('fondoOrigen').value;
    const saldoSpan = document.getElementById('saldoDisponible');
    
    if (fondoOrigen) {
        saldoSpan.textContent = formatearMoneda(fondos[fondoOrigen]);
    } else {
        saldoSpan.textContent = '$0';
    }
}

// Cargar movimientos en la tabla
function cargarMovimientos() {
    const tbody = document.getElementById('movimientos-tbody');
    tbody.innerHTML = '';
    
    const inicio = (paginaActual - 1) * registrosPorPagina;
    const fin = inicio + registrosPorPagina;
    const movimientosPagina = movimientosFiltrados.slice(inicio, fin);
    
    if (movimientosPagina.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 2rem;">No hay movimientos para mostrar</td></tr>';
        return;
    }
    
    movimientosPagina.forEach(mov => {
        const tr = document.createElement('tr');
        
        const tipoClass = mov.tipo === 'ingreso' ? 'tipo-ingreso' : 
                         mov.tipo === 'egreso' ? 'tipo-egreso' : 'tipo-transferencia';
        
        tr.innerHTML = `
            <td>${formatearFecha(mov.fecha)}</td>
            <td><span class="badge ${tipoClass}">${capitalizar(mov.tipo)}</span></td>
            <td>${getNombreFondo(mov.fondo)}</td>
            <td>${mov.concepto}</td>
            <td>${capitalizar(mov.categoria)}</td>
            <td class="${mov.tipo === 'ingreso' ? 'monto-positivo' : 'monto-negativo'}">
                ${mov.tipo === 'ingreso' ? '+' : '-'}${formatearMoneda(mov.monto)}
            </td>
            <td>${formatearMoneda(mov.saldo)}</td>
            <td class="acciones">
                <button class="btn-accion btn-ver" onclick="verDetalle(${mov.id})" title="Ver detalle">
                    Ver
                </button>
                <button class="btn-accion btn-editar" onclick="editarMovimiento(${mov.id})" title="Editar">
                    Editar
                </button>
                <button class="btn-accion btn-eliminar" onclick="eliminarMovimiento(${mov.id})" title="Eliminar">
                    Eliminar
                </button>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
    
    actualizarPaginacion();
}

// Actualizar resumen
function actualizarResumen() {
    const totalFondos = Object.values(fondos).reduce((a, b) => a + b, 0);
    
    // Calcular ingresos y egresos del mes
    const mesActual = new Date().getMonth();
    const movimientosMes = movimientos.filter(m => {
        const fechaMov = new Date(m.fecha);
        return fechaMov.getMonth() === mesActual;
    });
    
    const ingresos = movimientosMes
        .filter(m => m.tipo === 'ingreso')
        .reduce((sum, m) => sum + m.monto, 0);
    
    const egresos = movimientosMes
        .filter(m => m.tipo === 'egreso')
        .reduce((sum, m) => sum + m.monto, 0);
    
    // Actualizar valores en el DOM
    document.querySelectorAll('.resumen-card')[0].querySelector('.resumen-valor').textContent = formatearMoneda(fondos.comun);
    document.querySelectorAll('.resumen-card')[0].querySelector('.ingreso').textContent = `+${formatearMoneda(ingresos)} ingresos`;
    document.querySelectorAll('.resumen-card')[0].querySelector('.egreso').textContent = `-${formatearMoneda(egresos)} egresos`;
    
    document.querySelectorAll('.resumen-card')[1].querySelector('.resumen-valor').textContent = formatearMoneda(fondos.reserva);
    
    const metaReserva = 10000000;
    const porcentajeReserva = Math.round((fondos.reserva / metaReserva) * 100);
    document.querySelectorAll('.resumen-card')[1].querySelector('.resumen-detalle').textContent = 
        `Meta: ${formatearMoneda(metaReserva)} (${porcentajeReserva}%)`;
    document.querySelectorAll('.resumen-card')[1].querySelector('.progreso-fill').style.width = `${porcentajeReserva}%`;
    
    document.querySelectorAll('.resumen-card')[2].querySelector('.resumen-valor').textContent = formatearMoneda(fondos.emergencia);
    document.querySelectorAll('.resumen-card')[3].querySelector('.resumen-valor').textContent = formatearMoneda(totalFondos);
}

// Aplicar filtros
function aplicarFiltros() {
    const filtroFondo = document.getElementById('filtroFondo').value;
    const filtroTipo = document.getElementById('filtroTipo').value;
    const filtroFechaDesde = document.getElementById('filtroFechaDesde').value;
    const filtroFechaHasta = document.getElementById('filtroFechaHasta').value;
    
    movimientosFiltrados = movimientos.filter(mov => {
        let cumpleFiltro = true;
        
        if (filtroFondo !== 'todos' && mov.fondo !== filtroFondo) {
            cumpleFiltro = false;
        }
        
        if (filtroTipo !== 'todos' && mov.tipo !== filtroTipo) {
            cumpleFiltro = false;
        }
        
        if (filtroFechaDesde && mov.fecha < filtroFechaDesde) {
            cumpleFiltro = false;
        }
        
        if (filtroFechaHasta && mov.fecha > filtroFechaHasta) {
            cumpleFiltro = false;
        }
        
        return cumpleFiltro;
    });
    
    paginaActual = 1;
    cargarMovimientos();
    mostrarNotificacion('Filtros aplicados', 'info');
}

// Limpiar filtros
function limpiarFiltros() {
    document.getElementById('filtroFondo').value = 'todos';
    document.getElementById('filtroTipo').value = 'todos';
    document.getElementById('filtroFechaDesde').value = '';
    document.getElementById('filtroFechaHasta').value = '';
    
    movimientosFiltrados = [...movimientos];
    paginaActual = 1;
    cargarMovimientos();
    mostrarNotificacion('Filtros limpiados', 'info');
}

// Buscar movimiento
function buscarMovimiento(e) {
    const termino = e.target.value.toLowerCase();
    
    movimientosFiltrados = movimientos.filter(mov => 
        mov.concepto.toLowerCase().includes(termino) ||
        mov.categoria.toLowerCase().includes(termino) ||
        mov.descripcion.toLowerCase().includes(termino) ||
        mov.comprobante.toLowerCase().includes(termino)
    );
    
    paginaActual = 1;
    cargarMovimientos();
}

// Ver detalle del movimiento
function verDetalle(id) {
    const movimiento = movimientos.find(m => m.id === id);
    if (!movimiento) return;
    
    const detalleContent = document.getElementById('detalleContent');
    detalleContent.innerHTML = `
        <div class="detalle-item">
            <strong>Fecha:</strong>
            <span>${formatearFecha(movimiento.fecha)}</span>
        </div>
        <div class="detalle-item">
            <strong>Tipo:</strong>
            <span class="badge ${movimiento.tipo === 'ingreso' ? 'tipo-ingreso' : 'tipo-egreso'}">${capitalizar(movimiento.tipo)}</span>
        </div>
        <div class="detalle-item">
            <strong>Fondo:</strong>
            <span>${getNombreFondo(movimiento.fondo)}</span>
        </div>
        <div class="detalle-item">
            <strong>Concepto:</strong>
            <span>${movimiento.concepto}</span>
        </div>
        <div class="detalle-item">
            <strong>Categoría:</strong>
            <span>${capitalizar(movimiento.categoria)}</span>
        </div>
        <div class="detalle-item">
            <strong>Monto:</strong>
            <span class="${movimiento.tipo === 'ingreso' ? 'monto-positivo' : 'monto-negativo'}">
                ${movimiento.tipo === 'ingreso' ? '+' : '-'}${formatearMoneda(movimiento.monto)}
            </span>
        </div>
        <div class="detalle-item">
            <strong>Saldo resultante:</strong>
            <span>${formatearMoneda(movimiento.saldo)}</span>
        </div>
        <div class="detalle-item">
            <strong>Comprobante:</strong>
            <span>${movimiento.comprobante}</span>
        </div>
        <div class="detalle-item">
            <strong>Descripción:</strong>
            <span>${movimiento.descripcion}</span>
        </div>
    `;
    
    document.getElementById('detalleModal').style.display = 'block';
    
    document.getElementById('cerrarDetalle').onclick = function() {
        document.getElementById('detalleModal').style.display = 'none';
    };
    
    document.getElementById('imprimirDetalle').onclick = function() {
        window.print();
    };
}

// Editar movimiento
function editarMovimiento(id) {
    const movimiento = movimientos.find(m => m.id === id);
    if (!movimiento) return;
    
    modoEdicion = true;
    movimientoEditando = movimiento;
    
    document.getElementById('modalTitle').textContent = 'Editar Movimiento';
    document.getElementById('tipoMovimiento').value = movimiento.tipo;
    document.getElementById('fondoMovimiento').value = movimiento.fondo;
    document.getElementById('conceptoMovimiento').value = movimiento.concepto;
    document.getElementById('categoriaMovimiento').value = movimiento.categoria;
    document.getElementById('montoMovimiento').value = movimiento.monto;
    document.getElementById('fechaMovimiento').value = movimiento.fecha;
    document.getElementById('comprobanteMovimiento').value = movimiento.comprobante;
    document.getElementById('descripcionMovimiento').value = movimiento.descripcion;
    
    document.getElementById('movimientoModal').style.display = 'block';
}

// Eliminar movimiento
function eliminarMovimiento(id) {
    if (!confirm('¿Está seguro de eliminar este movimiento?')) return;
    
    const index = movimientos.findIndex(m => m.id === id);
    if (index !== -1) {
        movimientos.splice(index, 1);
        movimientosFiltrados = movimientosFiltrados.filter(m => m.id !== id);
        cargarMovimientos();
        actualizarResumen();
        mostrarNotificacion('Movimiento eliminado', 'success');
    }
}

// Exportar movimientos
function exportarMovimientos() {
    const csv = convertirACSV(movimientosFiltrados);
    descargarArchivo(csv, 'movimientos-fondos.csv', 'text/csv');
    mostrarNotificacion('Movimientos exportados correctamente', 'success');
}

// Generar reporte
function generarReporte() {
    mostrarNotificacion('Generando reporte...', 'info');
    // Aquí iría la lógica para generar un PDF o reporte detallado
    setTimeout(() => {
        mostrarNotificacion('Reporte generado correctamente', 'success');
    }, 1500);
}

// Inicializar gráfico (placeholder - requeriría Chart.js)
function inicializarGrafico() {
    // Aquí iría la inicialización del gráfico con Chart.js
    console.log('Gráfico inicializado');
}

// Actualizar gráfico
function actualizarGrafico(periodo) {
    // Aquí iría la actualización del gráfico según el período
    console.log('Gráfico actualizado para período:', periodo);
}

// Actualizar paginación
function actualizarPaginacion() {
    const totalPaginas = Math.ceil(movimientosFiltrados.length / registrosPorPagina);
    const paginacionDiv = document.getElementById('paginacion');
    
    if (totalPaginas <= 1) {
        paginacionDiv.innerHTML = '';
        return;
    }
    
    let html = '<div class="paginacion-botones">';
    
    // Botón anterior
    html += `<button class="btn-pagina" ${paginaActual === 1 ? 'disabled' : ''} onclick="cambiarPagina(${paginaActual - 1})">Anterior</button>`;
    
    // Números de página
    for (let i = 1; i <= totalPaginas; i++) {
        if (i === 1 || i === totalPaginas || (i >= paginaActual - 1 && i <= paginaActual + 1)) {
            html += `<button class="btn-pagina ${i === paginaActual ? 'active' : ''}" onclick="cambiarPagina(${i})">${i}</button>`;
        } else if (i === paginaActual - 2 || i === paginaActual + 2) {
            html += '<span class="paginacion-puntos">...</span>';
        }
    }
    
    // Botón siguiente
    html += `<button class="btn-pagina" ${paginaActual === totalPaginas ? 'disabled' : ''} onclick="cambiarPagina(${paginaActual + 1})">Siguiente</button>`;
    
    html += '</div>';
    paginacionDiv.innerHTML = html;
}

// Cambiar página
function cambiarPagina(pagina) {
    paginaActual = pagina;
    cargarMovimientos();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Funciones auxiliares
function formatearMoneda(valor) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0
    }).format(valor);
}

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

function getNombreFondo(codigo) {
    const nombres = {
        comun: 'Fondo Común',
        reserva: 'Fondo de Reserva',
        emergencia: 'Fondo de Emergencia',
        obras: 'Fondo de Obras'
    };
    return nombres[codigo] || codigo;
}

function convertirACSV(datos) {
    const headers = ['Fecha', 'Tipo', 'Fondo', 'Concepto', 'Categoría', 'Monto', 'Saldo', 'Comprobante'];
    let csv = headers.join(',') + '\n';
    
    datos.forEach(mov => {
        const fila = [
            mov.fecha,
            mov.tipo,
            getNombreFondo(mov.fondo),
            `"${mov.concepto}"`,
            mov.categoria,
            mov.monto,
            mov.saldo,
            mov.comprobante
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
    // Crear elemento de notificación
    const notif = document.createElement('div');
    notif.className = `notificacion notificacion-${tipo}`;
    notif.textContent = mensaje;
    
    // Estilos inline (idealmente estarían en el CSS)
    notif.style.position = 'fixed';
    notif.style.top = '20px';
    notif.style.right = '20px';
    notif.style.padding = '15px 20px';
    notif.style.borderRadius = '8px';
    notif.style.zIndex = '10000';
    notif.style.animation = 'slideIn 0.3s ease';
    
    const colores = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    
    notif.style.backgroundColor = colores[tipo] || colores.info;
    notif.style.color = 'white';
    notif.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    
    document.body.appendChild(notif);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notif.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}