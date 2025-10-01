// Script para manejar la funcionalidad del sidebar derecho
document.addEventListener('DOMContentLoaded', function() {
    // Datos de ejemplo para los lotes
    const lotes = [
        { id: 1, numero: '101', propietario: 'Familia A', estado: 'al-dia' },
        { id: 2, numero: '102', propietario: 'Familia B', estado: 'mora' },
        { id: 3, numero: '103', propietario: 'Familia C', estado: 'al-dia' },
        { id: 4, numero: '104', propietario: 'Familia D', estado: 'al-dia' },
        { id: 5, numero: '105', propietario: 'Familia E', estado: 'al-dia' },
        { id: 6, numero: '106', propietario: 'Familia F', estado: 'mora' },
        { id: 7, numero: '107', propietario: 'Familia G', estado: 'al-dia' },
        { id: 8, numero: '108', propietario: 'Familia H', estado: 'al-dia' },
        { id: 9, numero: '109', propietario: 'Familia I', estado: 'al-dia' },
        { id: 10, numero: '110', propietario: 'Familia J', estado: 'mora' },
        { id: 11, numero: '111', propietario: 'Familia K', estado: 'al-dia' },
        { id: 12, numero: '112', propietario: 'Familia L', estado: 'al-dia' },
        { id: 13, numero: '113', propietario: 'Familia M', estado: 'mora' },
        { id: 14, numero: '114', propietario: 'Familia N', estado: 'al-dia' },
        { id: 15, numero: '115', propietario: 'Familia Ñ', estado: 'al-dia' }
    ];

    // Generar elementos de lotes en el sidebar
    generarLotesEnSidebar(lotes);

    // Configurar búsqueda
    configurarBusqueda(lotes);
});

// Función para generar los lotes en el sidebar derecho
function generarLotesEnSidebar(lotes) {
    const lotesContainer = document.getElementById('lotes-container');
    
    // Limpiar el contenedor
    lotesContainer.innerHTML = '';
    
    // Generar un elemento por cada lote
    lotes.forEach(lote => {
        const loteItem = document.createElement('div');
        loteItem.className = 'lote-item';
        loteItem.dataset.id = lote.id;
        
        // Determinar el icono según el estado
        let iconName;
        let statusClass;
        
        switch(lote.estado) {
            default:
                iconName = 'hogar.png';
                statusClass = '';
        }
        
        // Estructura del elemento
        loteItem.innerHTML = `
            <img src="./assets/icons/${iconName}" alt="${lote.estado}">
            <div class="lote-info">
                <div class="lote-numero ${statusClass}">Lote ${lote.numero}</div>
                <div class="lote-propietario">${lote.propietario}</div>
            </div>
        `;
        
        // Agregar evento click
        loteItem.addEventListener('click', function() {
            // Remover clase activa de todos los lotes
            document.querySelectorAll('.lote-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Agregar clase activa al lote seleccionado
            this.classList.add('active');
            
            // Mostrar información del lote seleccionado
            mostrarInformacionLote(lote.id);
        });
        
        // Agregar al contenedor
        lotesContainer.appendChild(loteItem);
    });
}

// Función para configurar la búsqueda
function configurarBusqueda(lotes) {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', function() {
        const searchText = this.value.toLowerCase();
        
        // Filtrar lotes según el texto de búsqueda
        const lotesFiltrados = lotes.filter(lote => {
            return lote.numero.toLowerCase().includes(searchText) || 
                   lote.propietario.toLowerCase().includes(searchText);
        });
        
        // Actualizar la lista con los resultados filtrados
        generarLotesEnSidebar(lotesFiltrados);
    });
}

// Función para mostrar la información detallada del lote
function mostrarInformacionLote(loteId) {
    // En una aplicación real, aquí harías una petición al servidor para obtener
    // los datos actualizados del lote seleccionado
    
    // Por ahora, simulamos datos de ejemplo basados en el ID
    const loteInfo = obtenerInformacionLote(loteId);
    
    // Limpiar el contenido principal
    const mainContainer = document.getElementById('main');
    
    // Verificar si ya existe un contenedor de detalles del lote
    let loteDetailContainer = document.getElementById('lote-detail-container');
    
    if (!loteDetailContainer) {
        // Si no existe, crear uno nuevo
        loteDetailContainer = document.createElement('div');
        loteDetailContainer.id = 'lote-detail-container';
        mainContainer.appendChild(loteDetailContainer);
    }
    
    // Actualizar el contenido con la información del lote
    loteDetailContainer.innerHTML = `
        <div class="lote-detail-header">
            <div class="back-button" onclick="mostrarContenidoPrincipal()">
                <img src="./assets/icons/volver.png" alt="Volver">
                <span>Volver al Dashboard</span>
            </div>
            <h1>Lote ${loteInfo.numero}</h1>
            <div class="lote-status ${loteInfo.estado.replace('í', 'i')}">${getEstadoTexto(loteInfo.estado)}</div>
        </div>
        
        <div class="lote-info-grid">
            <div class="lote-info-card">
                <h2>Información del Propietario</h2>
                <div class="info-group">
                    <div class="info-label">Propietario:</div>
                    <div class="info-value">${loteInfo.propietario}</div>
                </div>
                <div class="info-group">
                    <div class="info-label">Email:</div>
                    <div class="info-value">${loteInfo.email}</div>
                </div>
                <div class="info-group">
                    <div class="info-label">Teléfono:</div>
                    <div class="info-value">${loteInfo.telefono}</div>
                </div>
                <div class="info-group">
                    <div class="info-label">Residentes:</div>
                    <div class="info-value">${loteInfo.cantidadResidentes}</div>
                </div>
            </div>
            
            <div class="lote-info-card">
                <h2>Estado Financiero</h2>
                <div class="info-group">
                    <div class="info-label">Saldo Actual:</div>
                    <div class="info-value ${loteInfo.saldo < 0 ? 'negative' : 'positive'}">
                        ${formatCurrency(loteInfo.saldo)}
                    </div>
                </div>
                <div class="info-group">
                    <div class="info-label">Último Pago:</div>
                    <div class="info-value">${loteInfo.ultimoPago.fecha} - ${formatCurrency(loteInfo.ultimoPago.monto)}</div>
                </div>
                <div class="info-group">
                    <div class="info-label">Expensas Mensuales:</div>
                    <div class="info-value">${formatCurrency(loteInfo.expensasMensuales)}</div>
                </div>
            </div>
            
            <div class="lote-info-card">
                <h2>Historial de Pagos</h2>
                <div class="payment-history">
                    ${generarHistorialPagos(loteInfo.historialPagos)}
                </div>
            </div>
            
            <div class="lote-info-card">
                <h2>Acciones Rápidas</h2>
                <div class="quick-actions">
                    <button class="action-button registrar-pago">Registrar Pago</button>
                    <button class="action-button generar-expensa">Generar Expensa</button>
                    <button class="action-button enviar-notificacion">Enviar Notificación</button>
                    <button class="action-button ver-documentos">Ver Documentos</button>
                </div>
            </div>
        </div>
    `;
    
    // Ocultar el contenido del dashboard
    document.querySelector('.dashboard-container').style.display = 'none';
    
    // Mostrar el contenedor de detalles
    loteDetailContainer.style.display = 'block';
    
    // Configurar eventos para los botones de acciones rápidas
    configurarBotonesAccion();
}

// Función para mostrar nuevamente el contenido principal del dashboard
function mostrarContenidoPrincipal() {
    // Ocultar el contenedor de detalles del lote
    const loteDetailContainer = document.getElementById('lote-detail-container');
    if (loteDetailContainer) {
        loteDetailContainer.style.display = 'none';
    }
    
    // Mostrar el contenido del dashboard
    document.querySelector('.dashboard-container').style.display = 'block';
}

// Función para obtener información detallada de un lote (simulada)
function obtenerInformacionLote(loteId) {
    // En una aplicación real, aquí harías una petición al servidor
    // Por ahora, retornamos datos de ejemplo basados en el ID
    
    // Datos base
    const loteBase = {
        id: loteId,
        numero: loteId + 100,
        propietario: `Familia ${['González', 'Rodríguez', 'Martínez', 'López', 'Pérez'][loteId % 5]}`,
        email: `familia${loteId + 100}@ejemplo.com`,
        telefono: `+54 11 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`,
        cantidadResidentes: Math.floor(2 + Math.random() * 4),
    };
    
    // Determinar estado basado en el ID
    if (loteId % 5 === 0) {
        loteBase.estado = 'vacío';
        loteBase.saldo = 0;
    } else if (loteId % 3 === 0) {
        loteBase.estado = 'mora';
        loteBase.saldo = -Math.floor(15000 + Math.random() * 50000);
    } else {
        loteBase.estado = 'al-dia';
        loteBase.saldo = Math.floor(Math.random() * 10000) - 2000;
    }
    
    // Generar datos financieros
    loteBase.expensasMensuales = 15000 + (loteId % 3) * 5000;
    
    // Generar último pago
    const hoy = new Date();
    const ultimoPagoFecha = new Date(hoy);
    ultimoPagoFecha.setDate(hoy.getDate() - (loteId % 30));
    
    loteBase.ultimoPago = {
        fecha: ultimoPagoFecha.toLocaleDateString('es-AR'),
        monto: loteBase.expensasMensuales
    };
    
    // Generar historial de pagos
    loteBase.historialPagos = [];
    
    // Generar 6 pagos históricos
    for (let i = 0; i < 6; i++) {
        const fechaPago = new Date(hoy);
        fechaPago.setMonth(hoy.getMonth() - i);
        
        const pago = {
            fecha: fechaPago.toLocaleDateString('es-AR'),
            monto: loteBase.expensasMensuales,
            estado: i === 0 && loteBase.estado === 'mora' ? 'Pendiente' : 'Pagado'
        };
        
        loteBase.historialPagos.push(pago);
    }
    
    return loteBase;
}

// Función para generar el HTML del historial de pagos
function generarHistorialPagos(pagos) {
    if (!pagos || pagos.length === 0) {
        return '<div class="no-data">No hay pagos registrados</div>';
    }
    
    let html = '<table class="payments-table">';
    html += '<thead><tr><th>Fecha</th><th>Monto</th><th>Estado</th></tr></thead>';
    html += '<tbody>';
    
    pagos.forEach(pago => {
        const estadoClass = pago.estado === 'Pagado' ? 'estado-pagado' : 'estado-pendiente';
        
        html += `
            <tr>
                <td>${pago.fecha}</td>
                <td>${formatCurrency(pago.monto)}</td>
                <td><span class="${estadoClass}">${pago.estado}</span></td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    
    return html;
}

// Función para configurar los botones de acción
function configurarBotonesAccion() {
    // Aquí agregarías la lógica para cada botón
    // Por ejemplo:
    
    const registrarPagoBtn = document.querySelector('.registrar-pago');
    if (registrarPagoBtn) {
        registrarPagoBtn.addEventListener('click', function() {
            alert('Funcionalidad para registrar pago en desarrollo');
            // Aquí irías a la página de registrar pago o abrirías un modal
        });
    }
    
    // Y así para los demás botones...
}

// Utilitarios

// Función para formatear moneda
function formatCurrency(amount) {
    return '$ ' + amount.toLocaleString('es-AR', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    });
}

// Función para obtener texto del estado
function getEstadoTexto(estado) {
    switch (estado) {
        case 'al-dia':
            return 'Al día';
        case 'mora':
            return 'En mora';
        case 'vacío':
            return 'Lote vacío';
        default:
            return estado;
    }
}

// Exponer la función mostrarContenidoPrincipal globalmente para poder usarla en el onclick
window.mostrarContenidoPrincipal = mostrarContenidoPrincipal;