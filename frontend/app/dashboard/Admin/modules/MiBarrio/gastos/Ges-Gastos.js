// JavaScript para Gestionar Gastos
document.addEventListener('DOMContentLoaded', function() {
    initGestorGastos();
});

// Variables globales
let gastosData = [];
let editandoGasto = null;

function initGestorGastos() {
    setupEventListeners();
    loadGastosData();
    setupModal();
}

function setupEventListeners() {
    // Botones de acciones principales
    document.getElementById('nuevoGastoBtn').addEventListener('click', mostrarModalNuevoGasto);
    document.getElementById('importarGastosBtn').addEventListener('click', importarGastos);
    document.getElementById('exportarGastosBtn').addEventListener('click', exportarGastos);
    
    // Filtros
    document.getElementById('aplicarFiltros').addEventListener('click', aplicarFiltros);
    document.getElementById('buscarGasto').addEventListener('input', buscarGastos);
    
    // Formulario
    document.getElementById('gastoForm').addEventListener('submit', guardarGasto);
    document.getElementById('cancelarGasto').addEventListener('click', cerrarModal);
}

function setupModal() {
    const modal = document.getElementById('gastoModal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.addEventListener('click', cerrarModal);
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            cerrarModal();
        }
    });
}

function loadGastosData() {
    // Datos simulados - En producción vendría de una API
    gastosData = [
        {
            id: 1,
            fecha: '2024-09-20',
            concepto: 'Mantenimiento de jardines',
            categoria: 'mantenimiento',
            proveedor: 'Jardinería Verde S.A.',
            monto: 85000,
            estado: 'pagado',
            descripcion: 'Poda de árboles y mantenimiento general de espacios verdes'
        },
        {
            id: 2,
            fecha: '2024-09-18',
            concepto: 'Servicio de limpieza',
            categoria: 'limpieza',
            proveedor: 'Limpieza Total',
            monto: 120000,
            estado: 'aprobado',
            descripcion: 'Limpieza semanal de áreas comunes'
        },
        {
            id: 3,
            fecha: '2024-09-15',
            concepto: 'Reparación portón principal',
            categoria: 'mantenimiento',
            proveedor: 'Herrería Moderna',
            monto: 45000,
            estado: 'pendiente',
            descripcion: 'Reparación de motor del portón de acceso'
        },
        {
            id: 4,
            fecha: '2024-09-12',
            concepto: 'Servicio de seguridad',
            categoria: 'seguridad',
            proveedor: 'Seguridad Plus',
            monto: 180000,
            estado: 'pagado',
            descripcion: 'Servicio de vigilancia nocturna'
        },
        {
            id: 5,
            fecha: '2024-09-10',
            concepto: 'Suministros de limpieza',
            categoria: 'limpieza',
            proveedor: 'Distribuidora San Juan',
            monto: 25000,
            estado: 'aprobado',
            descripcion: 'Productos de limpieza para áreas comunes'
        }
    ];
    
    renderizarTablaGastos(gastosData);
}

function renderizarTablaGastos(gastos) {
    const tbody = document.getElementById('gastos-tbody');
    tbody.innerHTML = '';
    
    gastos.forEach(gasto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatearFecha(gasto.fecha)}</td>
            <td>${gasto.concepto}</td>
            <td>${capitalizarTexto(gasto.categoria)}</td>
            <td>${gasto.proveedor}</td>
            <td>$${formatearNumero(gasto.monto)}</td>
            <td><span class="estado-badge estado-${gasto.estado}">${capitalizarTexto(gasto.estado)}</span></td>
            <td>
                <div class="acciones-tabla">
                    <button class="btn-accion btn-ver" onclick="verGasto(${gasto.id})" title="Ver detalles">
                        Ver
                    </button>
                    <button class="btn-accion btn-editar" onclick="editarGasto(${gasto.id})" title="Editar gasto">
                        Editar
                    </button>
                    <button class="btn-accion btn-eliminar" onclick="eliminarGasto(${gasto.id})" title="Eliminar gasto">
                        Eliminar
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function mostrarModalNuevoGasto() {
    editandoGasto = null;
    document.getElementById('modalTitle').textContent = 'Nuevo Gasto';
    document.getElementById('gastoForm').reset();
    document.getElementById('fechaGasto').value = new Date().toISOString().split('T')[0];
    document.getElementById('gastoModal').style.display = 'block';
}

function editarGasto(id) {
    const gasto = gastosData.find(g => g.id === id);
    if (!gasto) return;
    
    editandoGasto = gasto;
    document.getElementById('modalTitle').textContent = 'Editar Gasto';
    
    // Llenar formulario con datos del gasto
    document.getElementById('conceptoGasto').value = gasto.concepto;
    document.getElementById('categoriaGasto').value = gasto.categoria;
    document.getElementById('proveedorGasto').value = gasto.proveedor;
    document.getElementById('montoGasto').value = gasto.monto;
    document.getElementById('fechaGasto').value = gasto.fecha;
    document.getElementById('descripcionGasto').value = gasto.descripcion || '';
    
    document.getElementById('gastoModal').style.display = 'block';
}

function verGasto(id) {
    const gasto = gastosData.find(g => g.id === id);
    if (!gasto) return;
    
    alert(`Detalles del Gasto:
    
Concepto: ${gasto.concepto}
Categoría: ${capitalizarTexto(gasto.categoria)}
Proveedor: ${gasto.proveedor}
Monto: ${formatearNumero(gasto.monto)}
Fecha: ${formatearFecha(gasto.fecha)}
Estado: ${capitalizarTexto(gasto.estado)}
Descripción: ${gasto.descripcion || 'Sin descripción'}`);
}

function eliminarGasto(id) {
    if (confirm('¿Está seguro de que desea eliminar este gasto?')) {
        gastosData = gastosData.filter(g => g.id !== id);
        renderizarTablaGastos(gastosData);
        mostrarNotificacion('Gasto eliminado correctamente', 'success');
    }
}

function guardarGasto(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const gastoData = {
        concepto: document.getElementById('conceptoGasto').value,
        categoria: document.getElementById('categoriaGasto').value,
        proveedor: document.getElementById('proveedorGasto').value,
        monto: parseFloat(document.getElementById('montoGasto').value),
        fecha: document.getElementById('fechaGasto').value,
        descripcion: document.getElementById('descripcionGasto').value,
        estado: 'pendiente'
    };
    
    if (editandoGasto) {
        // Actualizar gasto existente
        const index = gastosData.findIndex(g => g.id === editandoGasto.id);
        if (index !== -1) {
            gastosData[index] = { ...editandoGasto, ...gastoData };
            mostrarNotificacion('Gasto actualizado correctamente', 'success');
        }
    } else {
        // Crear nuevo gasto
        const nuevoGasto = {
            id: Date.now(),
            ...gastoData
        };
        gastosData.unshift(nuevoGasto);
        mostrarNotificacion('Gasto creado correctamente', 'success');
    }
    
    renderizarTablaGastos(gastosData);
    cerrarModal();
}

function cerrarModal() {
    document.getElementById('gastoModal').style.display = 'none';
    editandoGasto = null;
}

function aplicarFiltros() {
    const categoria = document.getElementById('filtroCategoria').value;
    const fecha = document.getElementById('filtroFecha').value;
    const estado = document.getElementById('filtroEstado').value;
    
    let gastosFiltrados = [...gastosData];
    
    if (categoria && categoria !== 'todas') {
        gastosFiltrados = gastosFiltrados.filter(g => g.categoria === categoria);
    }
    
    if (fecha) {
        const [year, month] = fecha.split('-');
        gastosFiltrados = gastosFiltrados.filter(g => {
            const gastoDate = new Date(g.fecha);
            return gastoDate.getFullYear() == year && gastoDate.getMonth() + 1 == month;
        });
    }
    
    if (estado && estado !== 'todos') {
        gastosFiltrados = gastosFiltrados.filter(g => g.estado === estado);
    }
    
    renderizarTablaGastos(gastosFiltrados);
    mostrarNotificacion(`Se encontraron ${gastosFiltrados.length} gastos`, 'info');
}

function buscarGastos() {
    const termino = document.getElementById('buscarGasto').value.toLowerCase();
    
    if (!termino) {
        renderizarTablaGastos(gastosData);
        return;
    }
    
    const gastosEncontrados = gastosData.filter(gasto => 
        gasto.concepto.toLowerCase().includes(termino) ||
        gasto.proveedor.toLowerCase().includes(termino) ||
        gasto.categoria.toLowerCase().includes(termino)
    );
    
    renderizarTablaGastos(gastosEncontrados);
}

function importarGastos() {
    // Simular importación de gastos
    mostrarNotificacion('Función de importación en desarrollo', 'info');
}

function exportarGastos() {
    // Simular exportación de gastos
    const csvContent = convertirACSV(gastosData);
    descargarCSV(csvContent, 'gastos-barrio.csv');
    mostrarNotificacion('Gastos exportados correctamente', 'success');
}

function convertirACSV(data) {
    const headers = ['Fecha', 'Concepto', 'Categoría', 'Proveedor', 'Monto', 'Estado'];
    const csvRows = [headers.join(',')];
    
    data.forEach(gasto => {
        const row = [
            gasto.fecha,
            `"${gasto.concepto}"`,
            gasto.categoria,
            `"${gasto.proveedor}"`,
            gasto.monto,
            gasto.estado
        ];
        csvRows.push(row.join(','));
    });
    
    return csvRows.join('\n');
}

function descargarCSV(csvContent, filename) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Funciones auxiliares
function formatearFecha(fecha) {
    return new Date(fecha).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function formatearNumero(numero) {
    return new Intl.NumberFormat('es-ES').format(numero);
}

function capitalizarTexto(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function mostrarNotificacion(mensaje, tipo = 'info') {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion notificacion-${tipo}`;
    notificacion.textContent = mensaje;
    
    // Estilos de la notificación
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${tipo === 'success' ? 'rgba(40, 167, 69, 0.9)' : 
                     tipo === 'error' ? 'rgba(220, 53, 69, 0.9)' : 'rgba(23, 162, 184, 0.9)'};
        color: white;
        border-radius: 0.5rem;
        backdrop-filter: blur(10px);
        z-index: 10000;
        font-weight: 500;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notificacion);
    
    // Animar entrada
    setTimeout(() => {
        notificacion.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notificacion.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notificacion)) {
                document.body.removeChild(notificacion);
            }
        }, 300);
    }, 3000);
}