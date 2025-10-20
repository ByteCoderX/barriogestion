// ingresos.js

// Datos de ejemplo (simulación - luego se conectará con el backend)
let ingresos = [
    {
        id: 1,
        fecha: '2024-10-18',
        lote: 'lote1',
        propietario: 'Juan Pérez',
        tipo: 'expensas',
        concepto: 'Expensas Octubre 2024',
        monto: 85000,
        estado: 'pagado',
        metodoPago: 'transferencia',
        recibo: 'REC-001-2024',
        observaciones: 'Pago realizado en fecha'
    },
    {
        id: 2,
        fecha: '2024-10-17',
        lote: 'lote2',
        propietario: 'María García',
        tipo: 'expensas',
        concepto: 'Expensas Octubre 2024',
        monto: 85000,
        estado: 'pagado',
        metodoPago: 'efectivo',
        recibo: 'REC-002-2024',
        observaciones: ''
    },
    {
        id: 3,
        fecha: '2024-10-15',
        lote: 'lote3',
        propietario: 'Carlos López',
        tipo: 'extraordinarias',
        concepto: 'Aporte para obras de mejora',
        monto: 150000,
        estado: 'pagado',
        metodoPago: 'transferencia',
        recibo: 'REC-003-2024',
        observaciones: 'Aporte voluntario para refacción de entrada'
    },
    {
        id: 4,
        fecha: '2024-10-14',
        lote: 'lote4',
        propietario: 'Ana Martínez',
        tipo: 'expensas',
        concepto: 'Expensas Octubre 2024',
        monto: 42500,
        estado: 'parcial',
        metodoPago: 'efectivo',
        recibo: 'REC-004-2024',
        observaciones: 'Pago parcial - Saldo pendiente $42,500'
    },
    {
        id: 5,
        fecha: '2024-10-12',
        lote: 'lote5',
        propietario: 'Roberto Sánchez',
        tipo: 'multa',
        concepto: 'Multa por ruidos molestos',
        monto: 25000,
        estado: 'pagado',
        metodoPago: 'transferencia',
        recibo: 'REC-005-2024',
        observaciones: 'Multa aplicada según reglamento'
    },
    {
        id: 6,
        fecha: '2024-10-10',
        lote: 'lote1',
        propietario: 'Juan Pérez',
        tipo: 'alquiler',
        concepto: 'Alquiler salón de usos múltiples',
        monto: 50000,
        estado: 'pagado',
        metodoPago: 'mercadopago',
        recibo: 'REC-006-2024',
        observaciones: 'Evento familiar - 3 horas'
    },
    {
        id: 7,
        fecha: '2024-10-08',
        lote: 'lote3',
        propietario: 'Carlos López',
        tipo: 'expensas',
        concepto: 'Expensas Septiembre 2024',
        monto: 85000,
        estado: 'vencido',
        metodoPago: '',
        recibo: '',
        observaciones: 'Vencido - Contactar al propietario'
    }
];

let lotes = [
    { id: 'lote1', nombre: 'Lote 1', propietario: 'Juan Pérez' },
    { id: 'lote2', nombre: 'Lote 2', propietario: 'María García' },
    { id: 'lote3', nombre: 'Lote 3', propietario: 'Carlos López' },
    { id: 'lote4', nombre: 'Lote 4', propietario: 'Ana Martínez' },
    { id: 'lote5', nombre: 'Lote 5', propietario: 'Roberto Sánchez' },
    { id: 'lote6', nombre: 'Lote 6', propietario: 'Laura Fernández' },
    { id: 'lote7', nombre: 'Lote 7', propietario: 'Diego Romero' },
    { id: 'lote8', nombre: 'Lote 8', propietario: 'Sofía Castro' }
];

let ingresosFiltrados = [...ingresos];
let paginaActual = 1;
let registrosPorPagina = 10;
let modoEdicion = false;
let ingresoEditando = null;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    inicializarEventos();
    cargarIngresos();
    actualizarResumen();
    inicializarGrafico();
    establecerFechaActual();
    generarNumeroRecibo();
    generarLotesCheckbox();
});

// Establecer fecha actual
function establecerFechaActual() {
    const hoy = new Date().toISOString().split('T')[0];
    document.getElementById('fechaIngreso').value = hoy;
    
    const mesActual = new Date().toISOString().slice(0, 7);
    document.getElementById('periodoExpensas').value = mesActual;
    
    const fechaVencimiento = new Date();
    fechaVencimiento.setDate(fechaVencimiento.getDate() + 10);
    document.getElementById('fechaVencimiento').value = fechaVencimiento.toISOString().split('T')[0];
}

// Generar número de recibo automático
function generarNumeroRecibo() {
    const año = new Date().getFullYear();
    const numero = String(ingresos.length + 1).padStart(3, '0');
    document.getElementById('nroRecibo').value = `REC-${numero}-${año}`;
}

// Generar checkboxes de lotes
function generarLotesCheckbox() {
    const container = document.getElementById('lotesCheckbox');
    container.innerHTML = '';
    
    lotes.forEach(lote => {
        const div = document.createElement('div');
        div.className = 'checkbox-item';
        div.innerHTML = `
            <label>
                <input type="checkbox" class="lote-checkbox" value="${lote.id}" data-propietario="${lote.propietario}">
                ${lote.nombre} - ${lote.propietario}
            </label>
        `;
        container.appendChild(div);
    });
    
    // Agregar eventos a los checkboxes
    document.querySelectorAll('.lote-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', actualizarResumenCobro);
    });
}

// Inicializar eventos
function inicializarEventos() {
    // Botones de acciones
    document.getElementById('nuevoIngresoBtn').addEventListener('click', abrirModalNuevoIngreso);
    document.getElementById('cobrarExpensasBtn').addEventListener('click', abrirModalCobrarExpensas);
    document.getElementById('exportarIngresosBtn').addEventListener('click', exportarIngresos);
    document.getElementById('generarRecibosBtn').addEventListener('click', generarRecibos);
    
    // Filtros
    document.getElementById('aplicarFiltros').addEventListener('click', aplicarFiltros);
    document.getElementById('limpiarFiltros').addEventListener('click', limpiarFiltros);
    
    // Búsqueda
    document.getElementById('buscarIngreso').addEventListener('input', buscarIngreso);
    
    // Formularios
    document.getElementById('ingresoForm').addEventListener('submit', guardarIngreso);
    document.getElementById('cobrarExpensasForm').addEventListener('submit', procesarCobroMasivo);
    
    // Botones de cancelar
    document.getElementById('cancelarIngreso').addEventListener('click', cerrarModalIngreso);
    document.getElementById('cancelarCobro').addEventListener('click', cerrarModalCobrarExpensas);
    
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
        cargarIngresos();
    });
    
    // Botones de período del gráfico
    document.querySelectorAll('.btn-periodo').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.btn-periodo').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            actualizarGrafico(this.dataset.periodo);
        });
    });
    
    // Botones de selección de lotes
    document.getElementById('seleccionarTodos').addEventListener('click', function() {
        document.querySelectorAll('.lote-checkbox').forEach(cb => cb.checked = true);
        actualizarResumenCobro();
    });
    
    document.getElementById('deseleccionarTodos').addEventListener('click', function() {
        document.querySelectorAll('.lote-checkbox').forEach(cb => cb.checked = false);
        actualizarResumenCobro();
    });
    
    // Actualizar resumen cuando cambia el monto
    document.getElementById('montoExpensas').addEventListener('input', actualizarResumenCobro);
}

// Abrir modales
function abrirModalNuevoIngreso() {
    modoEdicion = false;
    ingresoEditando = null;
    document.getElementById('modalTitle').textContent = 'Registrar Nuevo Ingreso';
    document.getElementById('ingresoForm').reset();
    establecerFechaActual();
    generarNumeroRecibo();
    document.getElementById('ingresoModal').style.display = 'block';
}

function abrirModalCobrarExpensas() {
    document.getElementById('cobrarExpensasForm').reset();
    establecerFechaActual();
    generarLotesCheckbox();
    actualizarResumenCobro();
    document.getElementById('cobrarExpensasModal').style.display = 'block';
}

// Cerrar modales
function cerrarModalIngreso() {
    document.getElementById('ingresoModal').style.display = 'none';
}

function cerrarModalCobrarExpensas() {
    document.getElementById('cobrarExpensasModal').style.display = 'none';
}

// Actualizar resumen de cobro masivo
function actualizarResumenCobro() {
    const checkboxes = document.querySelectorAll('.lote-checkbox:checked');
    const cantidad = checkboxes.length;
    const monto = parseFloat(document.getElementById('montoExpensas').value) || 0;
    const total = cantidad * monto;
    
    document.getElementById('lotesSeleccionados').textContent = cantidad;
    document.getElementById('montoTotal').textContent = formatearMoneda(total);
}

// Guardar ingreso
function guardarIngreso(e) {
    e.preventDefault();
    
    const tipo = document.getElementById('tipoIngreso').value;
    const lote = document.getElementById('loteIngreso').value;
    const concepto = document.getElementById('conceptoIngreso').value;
    const monto = parseFloat(document.getElementById('montoIngreso').value);
    const metodoPago = document.getElementById('metodoPago').value;
    const fecha = document.getElementById('fechaIngreso').value;
    const recibo = document.getElementById('nroRecibo').value;
    const observaciones = document.getElementById('observaciones').value;
    
    const loteSeleccionado = lotes.find(l => l.id === lote);
    
    const nuevoIngreso = {
        id: modoEdicion ? ingresoEditando.id : Date.now(),
        fecha,
        lote,
        propietario: loteSeleccionado ? loteSeleccionado.propietario : 'Desconocido',
        tipo,
        concepto,
        monto,
        estado: 'pagado',
        metodoPago,
        recibo,
        observaciones: observaciones || ''
    };
    
    if (modoEdicion) {
        const index = ingresos.findIndex(i => i.id === ingresoEditando.id);
        ingresos[index] = nuevoIngreso;
        mostrarNotificacion('Ingreso actualizado correctamente', 'success');
    } else {
        ingresos.unshift(nuevoIngreso);
        mostrarNotificacion('Ingreso registrado correctamente', 'success');
    }
    
    cerrarModalIngreso();
    cargarIngresos();
    actualizarResumen();
    actualizarGrafico('mes');
}

// Procesar cobro masivo
function procesarCobroMasivo(e) {
    e.preventDefault();
    
    const periodo = document.getElementById('periodoExpensas').value;
    const monto = parseFloat(document.getElementById('montoExpensas').value);
    const fechaVenc = document.getElementById('fechaVencimiento').value;
    const checkboxes = document.querySelectorAll('.lote-checkbox:checked');
    
    if (checkboxes.length === 0) {
        mostrarNotificacion('Debe seleccionar al menos un lote', 'error');
        return;
    }
    
    let contadorRecibos = ingresos.length + 1;
    const año = new Date().getFullYear();
    
    checkboxes.forEach(checkbox => {
        const loteId = checkbox.value;
        const propietario = checkbox.dataset.propietario;
        const numero = String(contadorRecibos).padStart(3, '0');
        
        const nuevoIngreso = {
            id: Date.now() + contadorRecibos,
            fecha: new Date().toISOString().split('T')[0],
            lote: loteId,
            propietario: propietario,
            tipo: 'expensas',
            concepto: `Expensas ${periodo}`,
            monto: monto,
            estado: 'pendiente',
            metodoPago: '',
            recibo: `REC-${numero}-${año}`,
            observaciones: `Vencimiento: ${fechaVenc}`
        };
        
        ingresos.unshift(nuevoIngreso);
        contadorRecibos++;
    });
    
    mostrarNotificacion(`Se generaron ${checkboxes.length} cobros de expensas correctamente`, 'success');
    cerrarModalCobrarExpensas();
    cargarIngresos();
    actualizarResumen();
}

// Cargar ingresos en la tabla
function cargarIngresos() {
    const tbody = document.getElementById('ingresos-tbody');
    tbody.innerHTML = '';
    
    const inicio = (paginaActual - 1) * registrosPorPagina;
    const fin = inicio + registrosPorPagina;
    const ingresosPagina = ingresosFiltrados.slice(inicio, fin);
    
    if (ingresosPagina.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 2rem;">No hay ingresos para mostrar</td></tr>';
        return;
    }
    
    ingresosPagina.forEach(ing => {
        const tr = document.createElement('tr');
        
        const estadoClass = ing.estado === 'pagado' ? 'estado-pagado' : 
                           ing.estado === 'pendiente' ? 'estado-pendiente' :
                           ing.estado === 'parcial' ? 'estado-parcial' : 'estado-vencido';
        
        tr.innerHTML = `
            <td>${formatearFecha(ing.fecha)}</td>
            <td>${capitalizar(ing.lote.replace('lote', 'Lote '))}</td>
            <td>${ing.propietario}</td>
            <td><span class="badge tipo-${ing.tipo}">${getTipoNombre(ing.tipo)}</span></td>
            <td>${ing.concepto}</td>
            <td class="monto-positivo">${formatearMoneda(ing.monto)}</td>
            <td><span class="badge ${estadoClass}">${capitalizar(ing.estado)}</span></td>
            <td>${ing.recibo || 'Pendiente'}</td>
            <td class="acciones">
                <button class="btn-icon" onclick="verDetalle(${ing.id})" title="Ver detalle">
                    <img src="../../../assets/icons/eye.svg" alt="Ver">
                </button>
                <button class="btn-icon" onclick="editarIngreso(${ing.id})" title="Editar">
                    <img src="../../../assets/icons/edit.svg" alt="Editar">
                </button>
                <button class="btn-icon" onclick="eliminarIngreso(${ing.id})" title="Eliminar">
                    <img src="../../../assets/icons/trash.svg" alt="Eliminar">
                </button>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
    
    actualizarPaginacion();
}

// Actualizar resumen
function actualizarResumen() {
    const mesActual = new Date().getMonth();
    const añoActual = new Date().getFullYear();
    
    const ingresosMes = ingresos.filter(i => {
        const fecha = new Date(i.fecha);
        return fecha.getMonth() === mesActual && fecha.getFullYear() === añoActual;
    });
    
    const totalMes = ingresosMes.reduce((sum, i) => sum + i.monto, 0);
    const totalExpensas = ingresosMes
        .filter(i => i.tipo === 'expensas')
        .reduce((sum, i) => sum + i.monto, 0);
    const totalAportes = ingresosMes
        .filter(i => i.tipo === 'extraordinarias' || i.tipo === 'aporte')
        .reduce((sum, i) => sum + i.monto, 0);
    const totalOtros = ingresosMes
        .filter(i => i.tipo !== 'expensas' && i.tipo !== 'extraordinarias' && i.tipo !== 'aporte')
        .reduce((sum, i) => sum + i.monto, 0);
    
    // Calcular expensas cobradas
    const expensasPagadas = ingresosMes.filter(i => i.tipo === 'expensas' && i.estado === 'pagado').length;
    const totalLotes = lotes.length;
    const porcentajeCobrado = totalLotes > 0 ? Math.round((expensasPagadas / totalLotes) * 100) : 0;
    
    // Actualizar valores en el DOM
    document.querySelectorAll('.resumen-card')[0].querySelector('.resumen-valor').textContent = formatearMoneda(totalMes);
    document.querySelectorAll('.resumen-card')[0].querySelector('.ingreso').textContent = `${ingresosMes.length} transacciones registradas`;
    
    document.querySelectorAll('.resumen-card')[1].querySelector('.resumen-valor').textContent = formatearMoneda(totalExpensas);
    document.querySelectorAll('.resumen-card')[1].querySelector('.resumen-detalle').textContent = 
        `${expensasPagadas} de ${totalLotes} lotes pagados (${porcentajeCobrado}%)`;
    document.querySelectorAll('.resumen-card')[1].querySelector('.progreso-fill').style.width = `${porcentajeCobrado}%`;
    
    document.querySelectorAll('.resumen-card')[2].querySelector('.resumen-valor').textContent = formatearMoneda(totalAportes);
    const cantidadAportes = ingresosMes.filter(i => i.tipo === 'extraordinarias' || i.tipo === 'aporte').length;
    document.querySelectorAll('.resumen-card')[2].querySelector('.resumen-detalle').textContent = 
        `${cantidadAportes} aportes recibidos`;
    
    document.querySelectorAll('.resumen-card')[3].querySelector('.resumen-valor').textContent = formatearMoneda(totalOtros);
}

// Aplicar filtros
function aplicarFiltros() {
    const filtroTipo = document.getElementById('filtroTipo').value;
    const filtroEstado = document.getElementById('filtroEstado').value;
    const filtroLote = document.getElementById('filtroLote').value;
    const filtroFechaDesde = document.getElementById('filtroFechaDesde').value;
    const filtroFechaHasta = document.getElementById('filtroFechaHasta').value;
    
    ingresosFiltrados = ingresos.filter(ing => {
        let cumpleFiltro = true;
        
        if (filtroTipo !== 'todos' && ing.tipo !== filtroTipo) {
            cumpleFiltro = false;
        }
        
        if (filtroEstado !== 'todos' && ing.estado !== filtroEstado) {
            cumpleFiltro = false;
        }
        
        if (filtroLote !== 'todos' && ing.lote !== filtroLote) {
            cumpleFiltro = false;
        }
        
        if (filtroFechaDesde && ing.fecha < filtroFechaDesde) {
            cumpleFiltro = false;
        }
        
        if (filtroFechaHasta && ing.fecha > filtroFechaHasta) {
            cumpleFiltro = false;
        }
        
        return cumpleFiltro;
    });
    
    paginaActual = 1;
    cargarIngresos();
    mostrarNotificacion('Filtros aplicados', 'info');
}

// Limpiar filtros
function limpiarFiltros() {
    document.getElementById('filtroTipo').value = 'todos';
    document.getElementById('filtroEstado').value = 'todos';
    document.getElementById('filtroLote').value = 'todos';
    document.getElementById('filtroFechaDesde').value = '';
    document.getElementById('filtroFechaHasta').value = '';
    
    ingresosFiltrados = [...ingresos];
    paginaActual = 1;
    cargarIngresos();
    mostrarNotificacion('Filtros limpiados', 'info');
}

// Buscar ingreso
function buscarIngreso(e) {
    const termino = e.target.value.toLowerCase();
    
    ingresosFiltrados = ingresos.filter(ing => 
        ing.concepto.toLowerCase().includes(termino) ||
        ing.propietario.toLowerCase().includes(termino) ||
        ing.lote.toLowerCase().includes(termino) ||
        ing.recibo.toLowerCase().includes(termino) ||
        ing.observaciones.toLowerCase().includes(termino)
    );
    
    paginaActual = 1;
    cargarIngresos();
}

// Ver detalle del ingreso
function verDetalle(id) {
    const ingreso = ingresos.find(i => i.id === id);
    if (!ingreso) return;
    
    const detalleContent = document.getElementById('detalleContent');
    detalleContent.innerHTML = `
        <div class="detalle-item">
            <strong>Fecha:</strong>
            <span>${formatearFecha(ingreso.fecha)}</span>
        </div>
        <div class="detalle-item">
            <strong>Lote:</strong>
            <span>${capitalizar(ingreso.lote.replace('lote', 'Lote '))}</span>
        </div>
        <div class="detalle-item">
            <strong>Propietario:</strong>
            <span>${ingreso.propietario}</span>
        </div>
        <div class="detalle-item">
            <strong>Tipo de Ingreso:</strong>
            <span class="badge tipo-${ingreso.tipo}">${getTipoNombre(ingreso.tipo)}</span>
        </div>
        <div class="detalle-item">
            <strong>Concepto:</strong>
            <span>${ingreso.concepto}</span>
        </div>
        <div class="detalle-item">
            <strong>Monto:</strong>
            <span class="monto-positivo">${formatearMoneda(ingreso.monto)}</span>
        </div>
        <div class="detalle-item">
            <strong>Estado:</strong>
            <span class="badge estado-${ingreso.estado}">${capitalizar(ingreso.estado)}</span>
        </div>
        <div class="detalle-item">
            <strong>Método de Pago:</strong>
            <span>${ingreso.metodoPago ? capitalizar(ingreso.metodoPago) : 'No especificado'}</span>
        </div>
        <div class="detalle-item">
            <strong>Nº de Recibo:</strong>
            <span>${ingreso.recibo || 'Pendiente'}</span>
        </div>
        <div class="detalle-item">
            <strong>Observaciones:</strong>
            <span>${ingreso.observaciones || 'Sin observaciones'}</span>
        </div>
    `;
    
    document.getElementById('detalleModal').style.display = 'block';
    
    document.getElementById('cerrarDetalle').onclick = function() {
        document.getElementById('detalleModal').style.display = 'none';
    };
    
    document.getElementById('imprimirRecibo').onclick = function() {
        window.print();
    };
    
    document.getElementById('enviarEmail').onclick = function() {
        mostrarNotificacion('Recibo enviado por email', 'success');
    };
}

// Editar ingreso
function editarIngreso(id) {
    const ingreso = ingresos.find(i => i.id === id);
    if (!ingreso) return;
    
    modoEdicion = true;
    ingresoEditando = ingreso;
    
    document.getElementById('modalTitle').textContent = 'Editar Ingreso';
    document.getElementById('tipoIngreso').value = ingreso.tipo;
    document.getElementById('loteIngreso').value = ingreso.lote;
    document.getElementById('conceptoIngreso').value = ingreso.concepto;
    document.getElementById('montoIngreso').value = ingreso.monto;
    document.getElementById('metodoPago').value = ingreso.metodoPago;
    document.getElementById('fechaIngreso').value = ingreso.fecha;
    document.getElementById('nroRecibo').value = ingreso.recibo;
    document.getElementById('observaciones').value = ingreso.observaciones;
    
    document.getElementById('ingresoModal').style.display = 'block';
}

// Eliminar ingreso
function eliminarIngreso(id) {
    if (!confirm('¿Está seguro de eliminar este ingreso?')) return;
    
    const index = ingresos.findIndex(i => i.id === id);
    if (index !== -1) {
        ingresos.splice(index, 1);
        ingresosFiltrados = ingresosFiltrados.filter(i => i.id !== id);
        cargarIngresos();
        actualizarResumen();
        mostrarNotificacion('Ingreso eliminado', 'success');
    }
}

// Exportar ingresos
function exportarIngresos() {
    const csv = convertirACSV(ingresosFiltrados);
    descargarArchivo(csv, 'ingresos.csv', 'text/csv');
    mostrarNotificacion('Ingresos exportados correctamente', 'success');
}

// Generar recibos
function generarRecibos() {
    mostrarNotificacion('Generando recibos...', 'info');
    setTimeout(() => {
        mostrarNotificacion('Recibos generados correctamente', 'success');
    }, 1500);
}

// Inicializar gráfico
function inicializarGrafico() {
    console.log('Gráfico inicializado');
}

// Actualizar gráfico
function actualizarGrafico(periodo) {
    console.log('Gráfico actualizado para período:', periodo);
}

// Actualizar paginación
function actualizarPaginacion() {
    const totalPaginas = Math.ceil(ingresosFiltrados.length / registrosPorPagina);
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
    cargarIngresos();
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

function getTipoNombre(tipo) {
    const nombres = {
        expensas: 'Expensas',
        extraordinarias: 'Extraordinarias',
        aporte: 'Aporte',
        alquiler: 'Alquiler',
        interes: 'Intereses',
        multa: 'Multa',
        otros: 'Otros'
    };
    return nombres[tipo] || tipo;
}

function convertirACSV(datos) {
    const headers = ['Fecha', 'Lote', 'Propietario', 'Tipo', 'Concepto', 'Monto', 'Estado', 'Recibo'];
    let csv = headers.join(',') + '\n';
    
    datos.forEach(ing => {
        const fila = [
            ing.fecha,
            ing.lote,
            `"${ing.propietario}"`,
            getTipoNombre(ing.tipo),
            `"${ing.concepto}"`,
            ing.monto,
            ing.estado,
            ing.recibo
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
    
    setTimeout(() => {
        notif.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}