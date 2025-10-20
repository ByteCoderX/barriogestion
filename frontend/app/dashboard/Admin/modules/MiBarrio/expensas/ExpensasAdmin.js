// expensas.js - Completado

// Datos de ejemplo (simulación - luego se conectará con el backend)
let expensas = [
    {
        id: 1,
        lote: 'Lote 1',
        propietario: 'Juan Pérez',
        periodo: '2024-10',
        monto: 85000,
        pagado: 85000,
        saldo: 0,
        estado: 'pagado',
        vencimiento: '2024-11-10',
        fechaPago: '2024-10-18',
        metodoPago: 'transferencia'
    },
    {
        id: 2,
        lote: 'Lote 2',
        propietario: 'María García',
        periodo: '2024-10',
        monto: 85000,
        pagado: 85000,
        saldo: 0,
        estado: 'pagado',
        vencimiento: '2024-11-10',
        fechaPago: '2024-10-17',
        metodoPago: 'efectivo'
    },
    {
        id: 3,
        lote: 'Lote 3',
        propietario: 'Carlos López',
        periodo: '2024-10',
        monto: 85000,
        pagado: 0,
        saldo: 85000,
        estado: 'pendiente',
        vencimiento: '2024-11-10',
        fechaPago: null,
        metodoPago: null
    },
    {
        id: 4,
        lote: 'Lote 4',
        propietario: 'Ana Martínez',
        periodo: '2024-10',
        monto: 85000,
        pagado: 42500,
        saldo: 42500,
        estado: 'parcial',
        vencimiento: '2024-11-10',
        fechaPago: '2024-10-14',
        metodoPago: 'efectivo'
    },
    {
        id: 5,
        lote: 'Lote 5',
        propietario: 'Roberto Sánchez',
        periodo: '2024-10',
        monto: 85000,
        pagado: 0,
        saldo: 85000,
        estado: 'vencido',
        vencimiento: '2024-10-10',
        fechaPago: null,
        metodoPago: null
    },
    {
        id: 6,
        lote: 'Lote 6',
        propietario: 'Laura Fernández',
        periodo: '2024-10',
        monto: 85000,
        pagado: 85000,
        saldo: 0,
        estado: 'pagado',
        vencimiento: '2024-11-10',
        fechaPago: '2024-10-15',
        metodoPago: 'debito'
    },
    {
        id: 7,
        lote: 'Lote 7',
        propietario: 'Diego Romero',
        periodo: '2024-10',
        monto: 85000,
        pagado: 0,
        saldo: 85000,
        estado: 'pendiente',
        vencimiento: '2024-11-10',
        fechaPago: null,
        metodoPago: null
    },
    {
        id: 8,
        lote: 'Lote 8',
        propietario: 'Sofía Castro',
        periodo: '2024-10',
        monto: 85000,
        pagado: 85000,
        saldo: 0,
        estado: 'pagado',
        vencimiento: '2024-11-10',
        fechaPago: '2024-10-19',
        metodoPago: 'mercadopago'
    }
];

let expensasFiltradas = [...expensas];
let paginaActual = 1;
let registrosPorPagina = 10;
let expensaSeleccionada = null;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    inicializarEventos();
    cargarExpensas();
    actualizarResumen();
    inicializarGrafico();
    establecerFechas();
});

// Establecer fechas por defecto
function establecerFechas() {
    const hoy = new Date();
    const mesActual = hoy.toISOString().slice(0, 7);
    
    document.getElementById('periodoExpensas').value = mesActual;
    document.getElementById('fechaPago').value = hoy.toISOString().split('T')[0];
    
    // Fecha de vencimiento: 10 del mes siguiente
    const proximoMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 10);
    document.getElementById('fechaVencimiento').value = proximoMes.toISOString().split('T')[0];
    
    // Actualizar monto total al cambiar el monto base
    document.getElementById('montoBase').value = 85000;
    actualizarMontoTotal();
}

// Actualizar monto total en el formulario de generar
function actualizarMontoTotal() {
    const montoBase = parseFloat(document.getElementById('montoBase').value) || 0;
    const totalLotes = 45;
    const montoTotal = montoBase * totalLotes;
    document.getElementById('montoTotalGenerar').textContent = formatearMoneda(montoTotal);
}

// Inicializar eventos
function inicializarEventos() {
    // Botones de acciones
    document.getElementById('generarExpensasBtn').addEventListener('click', abrirModalGenerarExpensas);
    document.getElementById('enviarExpensasBtn').addEventListener('click', abrirModalEnviarEmail);
    document.getElementById('exportarExpensasBtn').addEventListener('click', exportarExpensas);
    document.getElementById('imprimirExpensasBtn').addEventListener('click', imprimirExpensas);
    
    // Filtros
    document.getElementById('aplicarFiltros').addEventListener('click', aplicarFiltros);
    document.getElementById('limpiarFiltros').addEventListener('click', limpiarFiltros);
    document.getElementById('filtroPeriodo').addEventListener('change', aplicarFiltros);
    
    // Búsqueda
    document.getElementById('buscarExpensa').addEventListener('input', buscarExpensa);
    
    // Formularios
    document.getElementById('generarExpensasForm').addEventListener('submit', generarExpensas);
    document.getElementById('registrarPagoForm').addEventListener('submit', guardarPago);
    document.getElementById('enviarEmailForm').addEventListener('submit', enviarEmails);
    
    // Monto base change
    document.getElementById('montoBase').addEventListener('input', actualizarMontoTotal);
    
    // Botones de cancelar
    document.getElementById('cancelarGenerar').addEventListener('click', () => cerrarModal('generarExpensasModal'));
    document.getElementById('cancelarPago').addEventListener('click', () => cerrarModal('registrarPagoModal'));
    document.getElementById('cancelarEmail').addEventListener('click', () => cerrarModal('enviarEmailModal'));
    
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
        registrosPorPagina = this.value === '100' ? expensasFiltradas.length : parseInt(this.value);
        paginaActual = 1;
        cargarExpensas();
    });
    
    // Botones de período del gráfico
    document.querySelectorAll('.btn-periodo').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.btn-periodo').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            actualizarGrafico(this.dataset.periodo);
        });
    });
    
    // Checkboxes de envío de email
    document.getElementById('enviarTodos').addEventListener('change', actualizarTotalEmails);
    document.getElementById('enviarPendientes').addEventListener('change', actualizarTotalEmails);
    document.getElementById('enviarPagados').addEventListener('change', actualizarTotalEmails);
}

// Abrir modales
function abrirModalGenerarExpensas() {
    document.getElementById('generarExpensasForm').reset();
    establecerFechas();
    document.getElementById('generarExpensasModal').style.display = 'block';
}

function abrirModalEnviarEmail() {
    document.getElementById('enviarEmailForm').reset();
    actualizarTotalEmails();
    document.getElementById('enviarEmailModal').style.display = 'block';
}

// Cerrar modal
function cerrarModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Actualizar total de emails
function actualizarTotalEmails() {
    let total = 0;
    
    if (document.getElementById('enviarTodos').checked) {
        total = expensas.length;
    } else {
        if (document.getElementById('enviarPendientes').checked) {
            total += expensas.filter(e => e.estado === 'pendiente' || e.estado === 'vencido' || e.estado === 'parcial').length;
        }
        if (document.getElementById('enviarPagados').checked) {
            total += expensas.filter(e => e.estado === 'pagado').length;
        }
    }
    
    document.getElementById('totalEmails').textContent = total;
}

// Generar expensas
function generarExpensas(e) {
    e.preventDefault();
    
    mostrarNotificacion('Generando expensas...', 'info');
    
    setTimeout(() => {
        mostrarNotificacion('Expensas generadas correctamente para todos los lotes', 'success');
        cerrarModal('generarExpensasModal');
        actualizarResumen();
    }, 1500);
}

// Enviar emails
function enviarEmails(e) {
    e.preventDefault();
    
    const total = parseInt(document.getElementById('totalEmails').textContent);
    
    if (total === 0) {
        mostrarNotificacion('Debes seleccionar al menos una opción de envío', 'error');
        return;
    }
    
    mostrarNotificacion(`Enviando ${total} emails...`, 'info');
    
    setTimeout(() => {
        mostrarNotificacion(`Se enviaron ${total} emails correctamente`, 'success');
        cerrarModal('enviarEmailModal');
    }, 2000);
}

// Cargar expensas en la tabla
function cargarExpensas() {
    const tbody = document.getElementById('expensas-tbody');
    tbody.innerHTML = '';
    
    const inicio = (paginaActual - 1) * registrosPorPagina;
    const fin = Math.min(inicio + registrosPorPagina, expensasFiltradas.length);
    const expensasPagina = expensasFiltradas.slice(inicio, fin);
    
    if (expensasPagina.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 2rem;">No hay expensas para mostrar</td></tr>';
        return;
    }
    
    expensasPagina.forEach(exp => {
        const tr = document.createElement('tr');
        
        const estadoClass = exp.estado === 'pagado' ? 'estado-pagado' : 
                           exp.estado === 'pendiente' ? 'estado-pendiente' :
                           exp.estado === 'parcial' ? 'estado-parcial' : 'estado-vencido';
        
        tr.innerHTML = `
            <td><strong>${exp.lote}</strong></td>
            <td>${exp.propietario}</td>
            <td>${formatearPeriodo(exp.periodo)}</td>
            <td>${formatearMoneda(exp.monto)}</td>
            <td class="monto-positivo">${formatearMoneda(exp.pagado)}</td>
            <td class="${exp.saldo > 0 ? 'monto-negativo' : ''}">${formatearMoneda(exp.saldo)}</td>
            <td><span class="badge ${estadoClass}">${capitalizar(exp.estado)}</span></td>
            <td>${formatearFecha(exp.vencimiento)}</td>
            <td class="acciones">
                <button class="btn-icon" onclick="verDetalleExpensa(${exp.id})" title="Ver detalle">
                    <img src="../../../assets/icons/eye.svg" alt="Ver">
                </button>
                ${exp.saldo > 0 ? `<button class="btn-icon" onclick="abrirModalPago(${exp.id})" title="Registrar pago">
                    <img src="../../../assets/icons/iconmas.png" alt="Pagar">
                </button>` : ''}
                <button class="btn-icon" onclick="eliminarExpensa(${exp.id})" title="Eliminar">
                    <img src="../../../assets/icons/trash.svg" alt="Eliminar">
                </button>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
    
    actualizarPaginacion();
}

// Ver detalle de expensa
function verDetalleExpensa(id) {
    const expensa = expensas.find(e => e.id === id);
    if (!expensa) return;
    
    const detalleContent = document.getElementById('detalleExpensaContent');
    detalleContent.innerHTML = `
        <div class="detalle-item">
            <strong>Lote:</strong>
            <span>${expensa.lote}</span>
        </div>
        <div class="detalle-item">
            <strong>Propietario:</strong>
            <span>${expensa.propietario}</span>
        </div>
        <div class="detalle-item">
            <strong>Período:</strong>
            <span>${formatearPeriodo(expensa.periodo)}</span>
        </div>
        <div class="detalle-item">
            <strong>Monto Total:</strong>
            <span>${formatearMoneda(expensa.monto)}</span>
        </div>
        <div class="detalle-item">
            <strong>Monto Pagado:</strong>
            <span class="monto-positivo">${formatearMoneda(expensa.pagado)}</span>
        </div>
        <div class="detalle-item">
            <strong>Saldo Pendiente:</strong>
            <span class="${expensa.saldo > 0 ? 'monto-negativo' : 'monto-positivo'}">${formatearMoneda(expensa.saldo)}</span>
        </div>
        <div class="detalle-item">
            <strong>Estado:</strong>
            <span class="badge estado-${expensa.estado}">${capitalizar(expensa.estado)}</span>
        </div>
        <div class="detalle-item">
            <strong>Fecha de Vencimiento:</strong>
            <span>${formatearFecha(expensa.vencimiento)}</span>
        </div>
        ${expensa.fechaPago ? `
        <div class="detalle-item">
            <strong>Fecha de Pago:</strong>
            <span>${formatearFecha(expensa.fechaPago)}</span>
        </div>
        <div class="detalle-item">
            <strong>Método de Pago:</strong>
            <span>${capitalizar(expensa.metodoPago)}</span>
        </div>
        ` : ''}
    `;
    
    document.getElementById('detalleExpensaModal').style.display = 'block';
    
    document.getElementById('cerrarDetalleExpensa').onclick = function() {
        document.getElementById('detalleExpensaModal').style.display = 'none';
    };
    
    document.getElementById('imprimirExpensa').onclick = function() {
        window.print();
    };
    
    document.getElementById('enviarEmailExpensa').onclick = function() {
        mostrarNotificacion('Expensa enviada por email', 'success');
    };
}

// Abrir modal de pago
function abrirModalPago(id) {
    const expensa = expensas.find(e => e.id === id);
    if (!expensa) return;
    
    expensaSeleccionada = expensa;
    
    document.getElementById('pagoLote').textContent = expensa.lote;
    document.getElementById('pagoPropietario').textContent = expensa.propietario;
    document.getElementById('pagoMontoTotal').textContent = formatearMoneda(expensa.monto);
    document.getElementById('pagoSaldoPendiente').textContent = formatearMoneda(expensa.saldo);
    
    document.getElementById('montoPago').value = expensa.saldo;
    document.getElementById('fechaPago').value = new Date().toISOString().split('T')[0];
    
    document.getElementById('registrarPagoModal').style.display = 'block';
}

// Guardar pago
function guardarPago(e) {
    e.preventDefault();
    
    if (!expensaSeleccionada) return;
    
    const montoPago = parseFloat(document.getElementById('montoPago').value);
    const fechaPago = document.getElementById('fechaPago').value;
    const metodoPago = document.getElementById('metodoPago').value;
    const referencia = document.getElementById('referenciaPago').value;
    const observaciones = document.getElementById('observacionesPago').value;
    
    if (montoPago > expensaSeleccionada.saldo) {
        mostrarNotificacion('El monto no puede ser mayor al saldo pendiente', 'error');
        return;
    }
    
    // Actualizar expensa
    const index = expensas.findIndex(e => e.id === expensaSeleccionada.id);
    if (index !== -1) {
        expensas[index].pagado += montoPago;
        expensas[index].saldo -= montoPago;
        expensas[index].fechaPago = fechaPago;
        expensas[index].metodoPago = metodoPago;
        
        if (expensas[index].saldo === 0) {
            expensas[index].estado = 'pagado';
        } else if (expensas[index].pagado > 0) {
            expensas[index].estado = 'parcial';
        }
    }
    
    mostrarNotificacion('Pago registrado correctamente', 'success');
    cerrarModal('registrarPagoModal');
    cargarExpensas();
    actualizarResumen();
}

// Eliminar expensa
function eliminarExpensa(id) {
    if (!confirm('¿Está seguro de eliminar esta expensa?')) return;
    
    const index = expensas.findIndex(e => e.id === id);
    if (index !== -1) {
        expensas.splice(index, 1);
        expensasFiltradas = expensasFiltradas.filter(e => e.id !== id);
        cargarExpensas();
        actualizarResumen();
        mostrarNotificacion('Expensa eliminada', 'success');
    }
}

// Actualizar resumen
function actualizarResumen() {
    const totalFacturado = expensas.reduce((sum, e) => sum + e.monto, 0);
    const totalCobrado = expensas.reduce((sum, e) => sum + e.pagado, 0);
    const totalPendiente = expensas.reduce((sum, e) => sum + e.saldo, 0);
    
    const lotesPagados = expensas.filter(e => e.estado === 'pagado').length;
    const lotesPendientes = expensas.filter(e => e.saldo > 0).length;
    const totalLotes = expensas.length;
    const porcentajeCobrado = totalLotes > 0 ? Math.round((lotesPagados / totalLotes) * 100) : 0;
    
    // Actualizar valores en el DOM
    const cards = document.querySelectorAll('.resumen-card');
    
    cards[1].querySelector('.resumen-valor').textContent = formatearMoneda(totalFacturado);
    cards[1].querySelector('.resumen-detalle').textContent = `${totalLotes} lotes facturados`;
    
    cards[2].querySelector('.resumen-valor').textContent = formatearMoneda(totalCobrado);
    cards[2].querySelector('.resumen-detalle').textContent = `${lotesPagados} lotes pagos (${porcentajeCobrado}%)`;
    cards[2].querySelector('.progreso-fill').style.width = `${porcentajeCobrado}%`;
    
    cards[3].querySelector('.resumen-valor').textContent = formatearMoneda(totalPendiente);
    cards[3].querySelector('.resumen-detalle').textContent = `${lotesPendientes} lotes deben (${100 - porcentajeCobrado}%)`;
}

// Aplicar filtros
function aplicarFiltros() {
    const filtroPeriodo = document.getElementById('filtroPeriodo').value;
    const filtroEstado = document.getElementById('filtroEstado').value;
    const filtroMonto = document.getElementById('filtroMonto').value;
    
    expensasFiltradas = expensas.filter(exp => {
        let cumpleFiltro = true;
        
        if (filtroPeriodo !== 'todos' && exp.periodo !== filtroPeriodo) {
            cumpleFiltro = false;
        }
        
        if (filtroEstado !== 'todos' && exp.estado !== filtroEstado) {
            cumpleFiltro = false;
        }
        
        if (filtroMonto !== 'todos') {
            const [min, max] = filtroMonto.split('-').map(v => parseFloat(v));
            if (max) {
                if (exp.monto < min || exp.monto > max) {
                    cumpleFiltro = false;
                }
            } else {
                if (exp.monto < min) {
                    cumpleFiltro = false;
                }
            }
        }
        
        return cumpleFiltro;
    });
    
    paginaActual = 1;
    cargarExpensas();
    mostrarNotificacion('Filtros aplicados', 'info');
}

// Limpiar filtros
function limpiarFiltros() {
    document.getElementById('filtroPeriodo').value = '2024-10';
    document.getElementById('filtroEstado').value = 'todos';
    document.getElementById('filtroMonto').value = 'todos';
    
    expensasFiltradas = [...expensas];
    paginaActual = 1;
    cargarExpensas();
    mostrarNotificacion('Filtros limpiados', 'info');
}

// Buscar expensa
function buscarExpensa(e) {
    const termino = e.target.value.toLowerCase();
    
    expensasFiltradas = expensas.filter(exp => 
        exp.lote.toLowerCase().includes(termino) ||
        exp.propietario.toLowerCase().includes(termino) ||
        exp.estado.toLowerCase().includes(termino) ||
        formatearPeriodo(exp.periodo).toLowerCase().includes(termino)
    );
    
    paginaActual = 1;
    cargarExpensas();
}

// Exportar expensas
function exportarExpensas() {
    const csv = convertirACSV(expensasFiltradas);
    descargarArchivo(csv, 'expensas.csv', 'text/csv');
    mostrarNotificacion('Expensas exportadas correctamente', 'success');
}

// Imprimir expensas
function imprimirExpensas() {
    mostrarNotificacion('Preparando impresión...', 'info');
    setTimeout(() => {
        window.print();
    }, 500);
}

// Inicializar gráfico
function inicializarGrafico() {
    const canvas = document.getElementById('expensasChart');
    if (!canvas) return;
    
    const container = canvas.parentElement;
    container.innerHTML = '<p style="text-align: center; color: #b8b8b8;">Gráfico de evolución de cobranza</p>';
}

// Actualizar gráfico
function actualizarGrafico(periodo) {
    console.log('Gráfico actualizado para período:', periodo);
}

// Actualizar paginación
function actualizarPaginacion() {
    const totalPaginas = Math.ceil(expensasFiltradas.length / registrosPorPagina);
    const paginacionDiv = document.getElementById('paginacion');
    
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
    cargarExpensas();
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

function formatearPeriodo(periodo) {
    const [año, mes] = periodo.split('-');
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                   'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return `${meses[parseInt(mes) - 1]} ${año}`;
}

function capitalizar(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function convertirACSV(datos) {
    const headers = ['Lote', 'Propietario', 'Período', 'Monto', 'Pagado', 'Saldo', 'Estado', 'Vencimiento'];
    let csv = headers.join(',') + '\n';
    
    datos.forEach(exp => {
        const fila = [
            `"${exp.lote}"`,
            `"${exp.propietario}"`,
            formatearPeriodo(exp.periodo),
            exp.monto,
            exp.pagado,
            exp.saldo,
            exp.estado,
            exp.vencimiento
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